from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Bet
from bettor_app.serializers import BettorSerializer

class BetSerializer(ModelSerializer):
    bettor = BettorSerializer()
    # bet_status = SerializerMethodField()
    # winner = SerializerMethodField()
    class Meta:
        model = Bet
        fields = ['id', 'bettor', 'game_id', 'commence_time', 'completed', 'home_team', 'away_team', 'home_team_spread', 'away_team_spread', 'home_team_score', 'away_team_score', 'bettor_pick', 'winner', 'bet_status' ]

        # def get_bet_status(self, instance):
        #     if instance.winner and instance.winner == instance.bettor_pick:
        #         instance.bet_status = "Won"
        #     elif instance.winner and instance.winner != instance.bettor_pick:
        #         instance.bet_status = "Lost"
        #     else:
        #         instance.status = "Pending"

        # def get_winner(self, instance):
        #     # Math out who won based on scores/spreads
        #     pass