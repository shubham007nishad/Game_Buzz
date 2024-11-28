from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings
from django.conf.urls.static import static

# Setup Swagger schema view
schema_view = get_schema_view(
    openapi.Info(
        title="Game_Buzz API",
        default_version='v1',
        description="Test description",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@yourapi.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),  # Allows anyone to view the API docs
)

# URL patterns
urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include('gamebuzz_api.urls')),  # Include your app URLs
    # Swagger documentation routes
    path('', schema_view.with_ui('swagger', cache_timeout=0), name='swagger'),  # Interactive UI
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)  # This will serve media files in development
