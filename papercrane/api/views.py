from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from api.models import Post
from api.serializers import PostSerializer, CreatePostSerializer


class CreatePostView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class ListPostView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class CreatePost(APIView):
    serializer_class = CreatePostSerializer

    def post(self, request, format=None):
        # if not self.request.session.exists(self.request.session.session_key):
        #     self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            title = serializer.data['title']
            content = serializer.data['content']
            post = Post(title=title, content=content)
            post.save()

            return Response(PostSerializer(post).data, status=status.HTTP_200_OK)

        return Response(None, status=status.HTTP_400_BAD_REQUEST)
