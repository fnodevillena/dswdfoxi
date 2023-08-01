from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import HttpResponse

@login_required
def home(request):
    context = {'active_page': 'home'}
    response = render(request, "home/home.html", context)
    response['Content-Type'] = 'text/html; charset=utf-8'
    return response