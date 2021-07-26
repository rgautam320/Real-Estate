from django.contrib import admin
from .models import Contact


# Register your models here.
class ContactAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'seller_email', 'subject')
    list_display_links = ('id', 'name')
    search_fields = ('name', 'email', 'seller_email', 'subject')
    list_per_page = 25


admin.site.register(Contact, ContactAdmin)