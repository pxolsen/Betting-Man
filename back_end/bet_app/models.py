from django.db import models
from bettor_app.models import Bettor
from game_app.models import Game

# Create your models here.
class Bet(models.Model):
    bettor = models.ForeignKey(Bettor, on_delete=models.CASCADE, related_name="bets")
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name="bets")
    predicted_winner = models.CharField()
    status = models.CharField(default="Pending")