from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import News, Match, Tournament
from .serializers import NewsSerializer, MatchSerializer, TournamentSerializer


class NewsListCreate(APIView):
    @swagger_auto_schema(
        responses={200: NewsSerializer(many=True)},
    )
    def get(self, request):
        news = News.objects.all()
        serializer = NewsSerializer(news, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(
        request_body=NewsSerializer,
        responses={201: NewsSerializer},
    )
    def post(self, request):
        serializer = NewsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TournamentListCreate(APIView):
    @swagger_auto_schema(
        responses={200: TournamentSerializer(many=True)},
    )
    def get(self, request):
        tournaments = Tournament.objects.all()
        serializer = TournamentSerializer(tournaments, many=True)
        return Response(serializer.data)

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
    @swagger_auto_schema(
        responses={200: MatchSerializer(many=True)},
    )
    def get(self, request):
        matches = Match.objects.all()
        serializer = MatchSerializer(matches, many=True)
        return Response(serializer.data)

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
