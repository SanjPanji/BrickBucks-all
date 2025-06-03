from django.urls import path
from . import views
from rest_framework_simplejwt.views import  TokenRefreshView


urlpatterns = [
    path("auth/register/", views.RegisterView.as_view(), name="register"),
    path("auth/login/", views.LoginView.as_view(), name="login"),
    path("auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("auth/logout/", views.LogoutView.as_view(), name="logout"),
    path("user/", views.UserView.as_view(), name="user"),

    path("products/", views.product_list_create, name="product_list_create"),
    path("products/<int:pk>", views.product_detail, name="product_detail"),
    path("order/create", views.create_order, name="create_order"),
    path("order/<int:pk>", views.order_detail, name="order_detail"),

    path("categories/", views.category_list_create, name="category_list_create"),
    path("categories/<slug:slug>/", views.category_detail, name="category_detail"),

    path("categories/<slug:category_slug>/subcategory/", views.sub_category_list_create, name="sub_category_list_create"),
    path("<slug:category_slug>/<slug:slug>", views.sub_category_detail, name="sub_category_detail"),

    path("<slug:category_slug>/<slug:subcategory_slug>/products/", views.product_list_create_by_subcategory, name="product_list_create_by_subcategory"),

    path('favorites/', views.get_favorites, name="get_favorites"),
    path('favorites/<int:product_id>/', views.toggle_favorite, name="toggle_favorite"),

    path('cart/',views.get_cart ,name="get_cart"),
    path('cart/<int:product_id>/', views.toggle_cart, name="toggle_cart"),
]