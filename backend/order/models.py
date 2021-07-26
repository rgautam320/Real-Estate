from django.db import models
from django.utils.timezone import now
from datetime import datetime


class Order(models.Model):
    buyer = models.CharField(max_length=200)
    realtor = models.CharField(max_length=200)
    slug = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    total_price = models.IntegerField()
    order_date = models.DateTimeField(default=datetime.now, blank=True)

    def __str__(self):
        return self.title