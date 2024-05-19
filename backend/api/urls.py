from django.urls import path
from .views import ArtworkList, ArtworkDetail

urlpatterns = [
    path('artworks/', ArtworkList.as_view(), name='artwork-list'),
    path('artworks/<int:pk>/', ArtworkDetail.as_view(), name='artwork-detail'),
]
