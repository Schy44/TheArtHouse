# api/models.py

from django.db import models

class Artwork(models.Model):
    title = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    publishing_date = models.DateField()
    picture = models.ImageField(upload_to='artworks/', default='default.jpg')  # Ensure default.jpg exists or use '' for an empty string

    def __str__(self):
        return self.title
