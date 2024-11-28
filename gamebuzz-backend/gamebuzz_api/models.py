from django.db import models

from django.db import models
from django.utils.timezone import now
from datetime import timedelta

class News(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True) 
    image = models.ImageField(upload_to='news_images/')
    
    def __str__(self):
        return self.title

    def time_ago(self):
        # Calculate the time difference based on created_at
        time_diff = now() - self.created_at
        if time_diff < timedelta(hours=1):
            return f'{int(time_diff.total_seconds() // 60)}m'  # Minutes
        elif time_diff < timedelta(days=1):
            return f'{int(time_diff.total_seconds() // 3600)}h'  # Hours
        elif time_diff < timedelta(weeks=1):
            return f'{int(time_diff.total_seconds() // 86400)}d'  # Days
        return f'{int(time_diff.total_seconds() // 604800)}w'  # Weeks


class Tournament(models.Model):
    name = models.CharField(max_length=200)
    location = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return self.name


class Match(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='matches')
    team1 = models.CharField(max_length=100)
    team2 = models.CharField(max_length=100)
    match_date = models.DateTimeField()
    venue = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.team1} vs {self.team2}"
