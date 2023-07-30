from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages

def sign_in(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('/') 
        else:
            messages.error(request, 'Invalid credentials. Please try again.')
    
    return render(request, 'account/login.html')