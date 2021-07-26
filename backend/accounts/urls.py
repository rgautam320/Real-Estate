from django.urls import path
from .views import SignupView, AccountView

urlpatterns = [
    path('signup', SignupView.as_view()),
    path('<email>/', AccountView.as_view())
]