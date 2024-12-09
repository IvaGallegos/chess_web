from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from .models import Partida

# Create your views here.

def home(request):
    return render(request, 'chessapp/home.html')

def login(request): 
    return render(request, 'chessapp/login.html')

def logout_view(request):
    logout(request)  
    return redirect('home') 

def signin(request):
    return render(request, 'chessapp/signin.html')

def menu(request):
    return render(request, 'chessapp/menu.html')

def tablero(request):
    return render(request, 'chessapp/tablero.html')

def ayuda(request):
    return render(request, 'chessapp/ayuda.html')  

def home(request):
    return render(request, 'chessapp/home.html')  

def partidas_en_vivo(request):
    return render(request, 'chessapp/partidas_en_vivo.html') 

def tutoriales(request):
    return render(request, 'chessapp/tutoriales.html')
    
def contacto(request):
    return render(request, 'chessapp/contacto.html')

def configuracion(request):
    return render(request, 'chessapp/configuracion.html')

def perfil(request):
    return render(request, 'chessapp/perfil.html')
 
