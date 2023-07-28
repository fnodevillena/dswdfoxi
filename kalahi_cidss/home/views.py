from django.shortcuts import render
from django.http import HttpResponse

def home(request):
    context = {'active_page': 'home'}
    return render(request, "home/home.html", context)
