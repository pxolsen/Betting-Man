from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
import requests
from requests_oauthlib import OAuth1
from bettor_app.serializers import BettorSerializer
from .models import Bet
from .serializers import BetSerializer

from dotenv import load_dotenv
import os
load_dotenv()
API_KEY = os.environ.get("API_KEY")



# Create your views here.
class A_bet(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        
        games_endpoint = f"https://api.the-odds-api.com/v4/sports/baseball_mlb/odds?apiKey={API_KEY}&regions=us&markets=spreads&dateFormat=iso&oddsFormat=american&bookmakers=draftkings"

        games_response = requests.get(games_endpoint)
        games_data = games_response.json() 

        print(games_data[0]["bookmakers"])

        for game in games_data:
            try:
                bet = Bet.objects.get(bettor=request.user, game_id=game["id"])
                if not bet.bettor_pick:
                    return Response(BetSerializer(bet).data)
                continue
            except:

                # Trying to see if bookmakers exist for each game
                try: 
                    new_bet = Bet.objects.create(
                        bettor=request.user,
                        game_id=game["id"],
                        commence_time=game["commence_time"],
                        home_team=game["home_team"],
                        away_team=game["away_team"],
                        home_team_spread=game["bookmakers"][0]["markets"][0]["outcomes"][0]["point"]
                    )
                    return Response(BetSerializer(new_bet).data)
                except:
                    continue

    def put(self, request, bet_id):
        pass


# # Create your views here.
# class All_games(APIView):

#     def get(self, request):
#         auth = OAuth1("3f774a7c9286c50109d4562fd8eaa232")

#         scores_endpoint = f"https://api.the-odds-api.com/v4/sports/baseball_mlb/scores?apiKey={API_KEY}&daysFrom=1"
#         response = requests.get(scores_endpoint, auth=auth)
#         games_data = response.json()

#         game_objects = []
#         for game_data in games_data:

#             api_id = game_data["id"]
#             completed = game_data["completed"]
#             commence_time = game_data["commence_time"]
#             home_team = game_data["home_team"]
#             away_team = game_data["away_team"]

#             home_team_score = None
#             away_team_score = None
    
#             if game_data["scores"] and len(game_data["scores"]) >= 2:
#                 home_team_score = game_data["scores"][0]["score"]
#                 away_team_score = game_data["scores"][1]["score"]

#             spread_endpoint = f"https://api.the-odds-api.com/v4/sports/baseball_mlb/odds?apiKey={API_KEY}&regions=us&markets=spreads&dateFormat=iso&oddsFormat=american&eventIds={api_id}&bookmakers=draftkings"
#             spread_response = requests.get(spread_endpoint, auth=auth)
#             spread_data = spread_response.json()
#             # bookmaker_data = spread_data["bookmakers"]
#             home_team_spread = spread_data

#             game_object = {
#                 # "api_id": game_data["id"],
#                 "api_id": api_id,
#                 "completed": completed,
#                 "commence_time": commence_time,
#                 "home_team": home_team,
#                 "away_team": away_team,
#                 "home_team_score": home_team_score,
#                 "away_team_score": away_team_score
#         }
#             game_objects.append(game_object)
#         return Response(game_objects)
