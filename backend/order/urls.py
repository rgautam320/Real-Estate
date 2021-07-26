from django.urls import path
from .views import OrderView, CreateOrderView

urlpatterns = [
    path('', OrderView.as_view()),
    path('place_order/', CreateOrderView.as_view()),
]
