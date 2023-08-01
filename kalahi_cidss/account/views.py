from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.http import HttpResponse

def sign_in(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            response = redirect('/')
            return response
        else:
            messages.error(request, 'Invalid credentials. Please try again.')
    
    return render(request, 'account/login.html', {'redirect_field_name': None})

def sign_out(request):
    logout(request)
    return redirect('account:login')