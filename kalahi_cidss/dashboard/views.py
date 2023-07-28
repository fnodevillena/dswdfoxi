from django.shortcuts import render
from django.http import HttpResponse

def dashboard(request):
    context = {'active_page': 'dashboard'}
    return render(request, "dashboard/dashboard.html", context)