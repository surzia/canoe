from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from api.models import Post
from api.serializers import PostSerializer, CreatePostSerializer
from api.pagination import CustomPageNumberPagination


class CreatePostView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class ListPostView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    pagination_class = CustomPageNumberPagination


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


class ViewPost(APIView):
    serializer_class = PostSerializer

    def get_object(self, pk):
        try:
            return Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            raise status.HTTP_404_NOT_FOUND

    def get(self, request, pk, format=None):
        post = self.get_object(pk)
        serializer = self.serializer_class(post)
        return Response(serializer.data)
