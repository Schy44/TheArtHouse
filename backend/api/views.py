from django.contrib.auth.models import User
from rest_framework import generics, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import AllowAny
from .models import Artwork
from .serializers import UserSerializer, ArtworkSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

class LoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})

class ArtworkList(generics.ListCreateAPIView):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer

class ArtworkDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer

class ArtworkViewSet(viewsets.ModelViewSet):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer
