from rest_framework import serializers
from .models import Listing


class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ('title', 'slug', 'description', 'address', 'city', 'state',
                  'zipcode', 'country', 'price', 'sale_type', 'home_type',
                  'home_type', 'bedrooms', 'bathrooms', 'sqft', 'photo_main')


class ListingDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = '__all__'
        lookup_field = 'slug'
