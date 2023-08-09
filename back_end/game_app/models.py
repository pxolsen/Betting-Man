from django.db import models

# Create your models here.
class Game(models.Model):
    api_id = models.CharField()
    commence_time = models.DateTimeField()
    completed = models.BooleanField(default=False)
    team_1 = models.CharField()
    team_2 = models.CharField()
    spread_1 = models.IntegerField()
    spread_2 = models.IntegerField()
    score_1 = models.IntegerField(default=0)
    score_2 = models.IntegerField(default=0)
    winner = models.CharField(default="TBD")