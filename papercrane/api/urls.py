from django.urls import path
from api.views import CreatePostView, ListPostView, CreatePost

urlpatterns = [
    path('create', CreatePostView.as_view()),
    path('list', ListPostView.as_view()),
    path('post', CreatePost.as_view()),
]
