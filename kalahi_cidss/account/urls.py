from django.urls import path
from . import views

app_name = 'account'

urlpatterns = [
    path('login/', views.sign_in, name='login'),
]