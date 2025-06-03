from django.contrib.auth import get_user_model, login, logout
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

from rest_framework import status, generics, permissions
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Category, SubCategory, Product, Order
from .serializers import CategorySerializer, ProductSerializer, OrderSerializer, RegisterSerializer, LoginSerializer, UserSerializer, SubCategorySerializer
from django.db.models import Q


# user 
User = get_user_model()

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Пользователь успешно зарегистрирован"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data["user"] 
            refresh = RefreshToken.for_user(user)     
            return Response(
                {"refresh": str(refresh), "access": str(refresh.access_token)},
                status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)

class UserView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user



# rest
# categories
@api_view(['GET', 'POST'])
def category_list_create(request):
    if request.method == 'GET':
        categories = Category.objects.all() 
        serializer = CategorySerializer(categories, many = True)
        return Response(serializer.data)
    elif request.method == 'POST':
        if not request.user.is_staff:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def category_detail(request, slug):
    category = get_object_or_404(Category, slug=slug)
    if request.method == 'GET':
        serializer = CategorySerializer(category)
        return Response(serializer.data)
    elif request.method == 'PUT':
        if not request.user.is_staff:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        if not request.user.is_staff:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# subcategories
@api_view(['GET', 'POST'])
def sub_category_list_create(request, category_slug):
    category = get_object_or_404(Category, slug=category_slug)
    if request.method == 'GET':
        # Возвращаем все подкатегории для этой категории
        subcategories = SubCategory.objects.filter(head_category=category)
        serializer = SubCategorySerializer(subcategories, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        if not request.user.is_staff:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        # В request.data нет поля head_category, добавляем его вручную
        data = request.data.copy()
        data['head_category'] = category.id  # передаем id категории
        serializer = SubCategorySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def sub_category_detail(request, slug):
    subcategory = get_object_or_404(SubCategory, slug=slug)
    if request.method == 'GET':
        serializer = SubCategorySerializer(subcategory)
        return Response(serializer.data)
    elif request.method == 'PUT':
        if not request.user.is_staff:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        serializer = SubCategorySerializer(subcategory, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        if not request.user.is_staff:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        subcategory.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# products
@api_view(['GET', 'POST'])
def product_list_create(request):
    if request.method == 'GET':
        search_query = request.query_params.get('search', '').strip().lower()  # Убираем пробелы и приводим к нижнему регистру
        category_id = request.query_params.get('category_id')
        sub_category_id = request.query_params.get('sub_category_id')
        if category_id:
            products = Product.objects.filter(category_id=category_id)
        elif sub_category_id:
            products = Product.objects.filter(sub_category_id = sub_category_id)  
        else:
            products = Product.objects.all()  # <--- Добавил объявление переменной!
        if search_query:
            products = products.filter(Q(name__icontains=search_query) | Q(description__icontains=search_query))
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)  
    elif request.method == 'POST':
        if not request.user.is_staff:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def product_detail(request, pk):
    product = get_object_or_404(Product, pk=pk)
    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    elif request.method == 'PUT':
        if not request.user.is_staff:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        if not request.user.is_staff:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

@api_view(['GET'])
def product_list_create_by_subcategory(request, category_slug, subcategory_slug):
    products = Product.objects.filter(sub_category__slug=subcategory_slug, sub_category__head_category__slug=category_slug)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

# orders 
@api_view(['GET', 'POST'])
def create_order(request):
    if request.method == 'GET':
        orders = Order.objects.all() 
        serializer = OrderSerializer(orders, many = True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'DELETE'])
@permission_classes([IsAuthenticated])
def order_detail(request, pk):
    order = get_object_or_404(Order, pk=pk)
    if request.method == 'GET':
        serializer = OrderSerializer(order)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        if not request.user.is_staff:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# favourite
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_favorite(request, product_id):
    product = get_object_or_404(Product, pk=product_id)
    user = request.user
    if product in user.favorites.all():
        user.favorites.remove(product)
        return Response({"message": "Removed from favorites"}, status=200)
    else:
        user.favorites.add(product)
        return Response({"message": "Added to favorites"}, status=200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_favorites(request):
    products = request.user.favorites.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


# cart
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_cart(request, product_id):
    product = get_object_or_404(Product, pk=product_id)
    user = request.user
    if product in user.cart.all():
        user.cart.remove(product)
        return Response({"message": "Removed from cart"}, status=200)
    else:
        user.cart.add(product)
        return Response({"message": "Added to cart"}, status=200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    products = request.user.cart.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)
