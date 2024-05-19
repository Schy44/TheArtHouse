# api/serializers.py

from rest_framework import serializers
from .models import Artwork

class ArtworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artwork
        fields = '__all__'
        extra_kwargs = {
            'picture': {'required': False}
        }

    picture = serializers.SerializerMethodField()

    def get_picture(self, obj):
        request = self.context.get('request')
        picture_url = obj.picture.url
        return request.build_absolute_uri(picture_url)
