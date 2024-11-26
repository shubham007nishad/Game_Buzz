from django.urls import path
from .views import NewsListCreate, TournamentListCreate, MatchListCreate

urlpatterns = [
    path('news/', NewsListCreate.as_view(), name='news-list-create'),
    path('tournaments/', TournamentListCreate.as_view(), name='tournament-list-create'),
    path('matches/', MatchListCreate.as_view(), name='match-list-create'),
]
