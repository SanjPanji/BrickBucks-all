from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers
from .models import Category, SubCategory, Product, Order, OrderItem, CustomUser

# user 
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser  # Используем кастомную модель
        fields = ["id", "username", "phone","email", "password"]

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)  # Создаём пользователя без email
        return user

class LoginSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True)
    phone = serializers.CharField(max_length=12, required=True)

    def validate(self, data):
        user = authenticate(username=data["username"], phone=data["phone"], password=data["password"])
        if not user:
            raise serializers.ValidationError("Неверное имя пользователя, телефон, или пароль")
        return user
 
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