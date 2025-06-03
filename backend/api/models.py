from django.db import models
from pytils.translit import translify
from django.contrib.auth.models import AbstractUser
from django.utils.text import slugify
# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length = 100)
    slug = models.SlugField(max_length=150, unique=True, blank=True)
    
    def save (self, *args, **kwargs):
        if not self.slug:
            self.slug = translify(self.name)
        super().save(*args, **kwargs)
    
    def __str__ (self):
        return self.name

class SubCategory(models.Model):
    name = models.CharField(max_length = 100)
    slug = models.SlugField(max_length=150, unique=True, blank=True)
    head_category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='subcategories')

    def save (self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def __str__ (self):
        return self.name
    
class Product(models.Model):
    name = models.CharField(max_length=150)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    sub_category = models.ForeignKey(SubCategory, on_delete=models.CASCADE, related_name='sub_products')
    description = models.TextField()
    price = models.FloatField()
    image = models.URLField(max_length=500)
    is_favourite = models.BooleanField(default=False)

    def save (self, *args, **kwargs):
        if not self.slug:
            self.slug = translify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Order(models.Model):
    PAYMENT_CHOICES = [
        ('kaspi', 'Kaspi Gold'),
        ('cash', 'Наличными курьеру'),
        ('crypto', 'Metamask'),
    ]
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=12)
    city = models.CharField(max_length=50)
    address = models.CharField(max_length=100)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Заказ №{self.id} от {self.name}'
    
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.IntegerField()

    def __str__(self):
        return f'Позиция заказа №{self.id}, от {self.order.id} товары {self.product.name}'
    
# user 

class CustomUser(AbstractUser):
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=12, default='', blank=True)
    favorites = models.ManyToManyField('Product', related_name='favorited_by', blank=True)
    cart = models.ManyToManyField('Product', related_name='in_cart_of', blank=True)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username
