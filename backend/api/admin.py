from django.contrib import admin
from .models import Artwork

class ArtworkAdmin(admin.ModelAdmin):
    list_display = ('title', 'artist', 'price', 'publishing_date')
    search_fields = ('title', 'artist')
    list_filter = ('publishing_date',)

admin.site.register(Artwork, ArtworkAdmin)
