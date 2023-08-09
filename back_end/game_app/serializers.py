from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Game

class GameSerializer(ModelSerializer):
    winner = SerializerMethodField()
    class Meta:
        model = Game
        fields = ['id', 'api_id' 'commence_time', 'completed', 'team_1', 'team_2', 'spread_1', 'spread_2', 'score_1', 'score_2', 'winner']

        def get_winner(self, instance):
            if instance.completed:
                # Math out who is the winner based on scores/spreads
                pass