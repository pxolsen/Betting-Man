from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Bet
from bettor_app.serializers import BettorSerializer
from game_app.serializers import GameSerializer

class BetSerializer(ModelSerializer):
    bettor = BettorSerializer()
    game = GameSerializer()
    status = SerializerMethodField()
    class Meta:
        model = Bet
        fields = ['id', 'bettor', 'game', 'predicted_winner', 'status']

        def get_status(self, instance):
            if instance.game.winner == instance.predicted_winner:
                instance.status = "Won"
            elif instance.game.winner and instance.game.winner != instance.predicted_winner:
                instance.status = "Lost"
            else:
                instance.status = "Pending"