from rest_framework import serializers
from .models import News, Match, Tournament

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'


class TournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = '__all__'


class MatchSerializer(serializers.ModelSerializer):
    tournament = TournamentSerializer(read_only=True)

    class Meta:
        model = Match
        fields = '__all__'
