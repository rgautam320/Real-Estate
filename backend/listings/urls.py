from django.urls import path
from .views import ListingView, SearchView, ListingsView

urlpatterns = [
    path('', ListingsView.as_view()),
    path('search', SearchView.as_view()),
    path('<slug>', ListingView.as_view()),
    path('<slug>/buy', ListingView.as_view()),
]
