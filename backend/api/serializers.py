from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers
from .models import Category, SubCategory, Product, Order, OrderItem, CustomUser

User = get_user_model()

# user 
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser  # Используем кастомную модель
        fields = ["id", "username", "phone","email", "password"]

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)  # Создаём пользователя без email
        return user

from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model

User = get_user_model()

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("Пользователь с таким email не найден")

        # Используем username для аутентификации, если authenticate() работает по username
        user = authenticate(username=user.username, password=password)

        if not user or not user.is_active:
            raise serializers.ValidationError("Неверный email или пароль")

        data["user"] = user
        return data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "username", "phone"]



# rest serializers
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

class SubCategorySerializer(serializers.ModelSerializer):
    head_category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    class Meta:
        model = SubCategory
        fields = ['id', 'name', 'slug', 'head_category']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'category', 'sub_category','description', 'price', 'image']

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    class Meta: 
        model = OrderItem
        fields = [
            'id', 'product', 'product_name', 'quantity', 'price',
        ]

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'name', 'phone_number', 'city', 'address', 'payment_method', 'created_at', 'items', 'total_price']

    def get_total_price(self, object):
        return sum(item.price * item.quantity for item in object.items.all())
    
    def create(self, validate_data):
        items_data = validate_data.pop('items')
        order = Order.objects.create(**validate_data)
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order