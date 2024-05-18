from django.urls import path

from cs import views

urlpatterns = [
    path('list', views.question_list, name='cs'),
    path('detail/<int:question_id>', views.question_detail, name='detail'),
]
