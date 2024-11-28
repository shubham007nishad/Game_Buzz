from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import News, Match, Tournament
from .serializers import NewsSerializer, MatchSerializer, TournamentSerializer
from rest_framework import parsers, renderers, serializers, status

class NewsListCreate(APIView):
    parser_classes = (parsers.MultiPartParser,)

    @swagger_auto_schema(
        responses={200: NewsSerializer(many=True)},
    )
    def get(self, request):
        news = News.objects.all()
        serializer = NewsSerializer(news, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                name="title",
                in_=openapi.IN_FORM,
                type=openapi.TYPE_STRING,
                description="Title of the news",
                required=True,
            ),
            openapi.Parameter(
                name="category",
                in_=openapi.IN_FORM,
                type=openapi.TYPE_STRING,
                description="Category of the news",
                required=True,
            ),
            openapi.Parameter(
                name="description",
                in_=openapi.IN_FORM,
                type=openapi.TYPE_STRING,
                description="Description of the news",
                required=True,
            ),
            openapi.Parameter(
                name="image",
                in_=openapi.IN_FORM,
                type=openapi.TYPE_FILE,
                description="Image file for the news",
                required=True,
            ),
        ],
        responses={201: NewsSerializer},
        consumes=["multipart/form-data"],
    )
    def post(self, request):
        serializer = NewsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NewsDelete(APIView):
    # Define DELETE method to delete a specific news item by ID
    @swagger_auto_schema(
        responses={
            204: "News item deleted successfully",
            404: "News item not found",
        }
    )
    def delete(self, request, id):
        try:
            # Fetch and delete the specific news item
            news_item = News.objects.get(id=id)
            news_item.delete()
            return Response(
                {"message": f"News item with ID {id} has been deleted."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except News.DoesNotExist:
            return Response(
                {"error": f"News item with ID {id} does not exist."},
                status=status.HTTP_404_NOT_FOUND,
            )


class TournamentListCreate(APIView):
    # Define GET method to fetch all tournaments
    @swagger_auto_schema(
        responses={200: TournamentSerializer(many=True)},
    )
    def get(self, request):
        tournaments = Tournament.objects.all()
        serializer = TournamentSerializer(tournaments, many=True)
        return Response(serializer.data)

    # Define POST method to create a new tournament
    @swagger_auto_schema(
        request_body=TournamentSerializer,
        responses={201: TournamentSerializer},
    )
    def post(self, request):
        serializer = TournamentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MatchListCreate(APIView):
    # Define GET method to fetch all matches
    @swagger_auto_schema(
        responses={200: MatchSerializer(many=True)},
    )
    def get(self, request):
        matches = Match.objects.all()
        serializer = MatchSerializer(matches, many=True)
        return Response(serializer.data)

    # Define POST method to create a new match
    @swagger_auto_schema(
        request_body=MatchSerializer,
        responses={201: MatchSerializer},
    )
    def post(self, request):
        serializer = MatchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
