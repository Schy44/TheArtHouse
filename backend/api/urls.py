from django.urls import path, include
from .views import ArtworkList, ArtworkDetail
from rest_framework.routers import DefaultRouter
from .views import ArtworkViewSet, RegisterView, LoginView

router = DefaultRouter()
router.register(r'artworks', ArtworkViewSet)

urlpatterns = [
    path('artworks/', ArtworkList.as_view(), name='artwork-list'),
    path('artworks/<int:pk>/', ArtworkDetail.as_view(), name='artwork-detail'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
]
