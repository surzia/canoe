from django.urls import path

from argumentation import views

urlpatterns = [
    path('list', views.display_all_exams, name='argumentation'),
    path('exam/<int:exam_id>', views.display_exam, name='exam'),
    path('answer/<int:exam_id>/<int:read_id>', views.answer, name='answer'),
    path('answer/submit', views.submit_exam, name='submit'),
]
