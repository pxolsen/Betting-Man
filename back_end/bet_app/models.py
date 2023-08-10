from django.db import models
from bettor_app.models import Bettor

# Create your models here.
class Bet(models.Model):
    bettor = models.ForeignKey(Bettor, on_delete=models.CASCADE, related_name="bets")
    game_id = models.CharField()
    commence_time = models.DateTimeField()
    completed = models.BooleanField(default=False)
    home_team = models.CharField()
    away_team = models.CharField()
    home_team_spread = models.DecimalField(max_digits=5, decimal_places=1, default=0)
    away_team_spread = models.DecimalField(max_digits=5, decimal_places=1, default=0)
    home_team_score = models.IntegerField(null=True)
    away_team_score = models.IntegerField(null=True)
    bettor_pick = models.CharField(null=True)
    winner = models.CharField(null=True)
    bet_status = models.CharField(default="No Bet")