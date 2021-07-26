from django.contrib import admin
from .models import Order


class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'buyer', 'realtor', 'title', 'total_price')
    list_display_links = ('id', 'buyer', 'realtor')
    list_filter = ('buyer', 'realtor')
    search_fields = ('id', 'buyer', 'realtor', 'title', 'total_price',
                     'order_date')
    list_per_page = 25


admin.site.register(Order, OrderAdmin)
