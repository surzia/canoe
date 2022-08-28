from django.urls import path
from api.views import CreatePostView, ListPostView, CreatePost, ViewPost, UpdatePostView

urlpatterns = [
    path('create', CreatePostView.as_view()),
    path('list', ListPostView.as_view()),
    path('post', CreatePost.as_view()),
    path('update', UpdatePostView.as_view()),
    path('view/<int:pk>', ViewPost.as_view()),
]
