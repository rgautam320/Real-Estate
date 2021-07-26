from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from .models import Order
from .serializers import OrderSerializer
from datetime import datetime, timezone, timedelta


class OrderView(ListAPIView):
    queryset = Order.objects.order_by('-order_date')
    serializer_class = OrderSerializer


class CreateOrderView(APIView):
    def post(self, request, format=None):
        data = self.request.data

        try:
            order = Order(buyer=data['buyer'],
                          realtor=data['realtor'],
                          slug=data['cart_slug'],
                          title=data['title'],
                          total_price=data['total_price'])

            order.save()
            return Response({'success': 'Order placed successfully'})

        except:
            return Response({'error': 'Order failed to place'})