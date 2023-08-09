from rest_framework.serializers import ModelSerializer
from .models import Bettor

class BettorSerializer(ModelSerializer):
    class Meta:
        model = Bettor
        fields = ['id', 'username']