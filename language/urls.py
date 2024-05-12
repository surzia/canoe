from django.urls import path

from language import views

urlpatterns = [
    path('list', views.word_list, name='words'),
]
