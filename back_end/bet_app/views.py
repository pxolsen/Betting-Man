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
import datetime

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

        for game in games_data:
            if datetime.datetime.strptime(game["commence_time"], "%Y-%m-%dT%H:%M:%S%z").replace(tzinfo=None) > datetime.datetime.now().replace(tzinfo=None):
                try:
                    # If the bet has been created, but there is bettor has NOT made a pick, return that bet
                    # There should only ever be one of these that returns from an API ping
                    bet = Bet.objects.get(bettor=request.user, game_id=game["id"])
                    if not bet.bettor_pick:
                        return Response(BetSerializer(bet).data)
                    continue
                except:
                    # If there is not already a bet in the queue, we will move to the next available game
                    # The "try" block below is in reference to the spreads. See line 49
                    try: 
                        bettor=request.user
                        game_id=game["id"]
                        commence_time=game["commence_time"]
                        home_team=game["home_team"]
                        away_team=game["away_team"]
                        # The try block on line 42 is in case, there isn't "bookmakers" for this game
                        # If there is no bookmaker (aka no spreads), we will continue to the next available bet via the "except" on line 68
                        if home_team == game["bookmakers"][0]["markets"][0]["outcomes"][0]["name"]:
                            home_team_spread = game["bookmakers"][0]["markets"][0]["outcomes"][0]["point"]
                            away_team_spread = game["bookmakers"][0]["markets"][0]["outcomes"][1]["point"]
                        elif away_team == game["bookmakers"][0]["markets"][0]["outcomes"][0]["name"]:
                            home_team_spread = game["bookmakers"][0]["markets"][0]["outcomes"][1]["point"]
                            away_team_spread = game["bookmakers"][0]["markets"][0]["outcomes"][0]["point"]

                        # Creating a new bet to display to the bettor
                        new_bet = Bet.objects.create(
                            bettor=bettor,
                            game_id=game_id,
                            commence_time=commence_time,
                            home_team=home_team,
                            away_team=away_team,
                            home_team_spread = home_team_spread,
                            away_team_spread = away_team_spread
                        )
                        return Response(BetSerializer(new_bet).data)
                    except:
                        continue


    # This is where the bettor will alter (PUT) the bet that was created above.
    # Input data will include bettor_pick and bet_status will change from "No bet" to "Pending"
    def put(self, request):
        bet_id = request.data.get("bet_id")
        bet = Bet.objects.get(id=bet_id)
        bettor_pick = request.data.get("bettor_pick")
        bet.bettor_pick = bettor_pick
        if bet.bettor_pick:
            bet.bet_status = "Pending"
        else:
            bet.bet_status = "No Bet"
        bet.save()
        return Response(BetSerializer(bet).data)
    

class Bets_by_bettor(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        bettor = request.user
        bets_by_bettor = Bet.objects.filter(bettor=bettor).exclude(bet_status="No Bet").order_by("-id")

        # Trying to see if there are any bets made by the bettor
        # If no bets made yet, "except" will trigger on line 126
        try:
            for bet in bets_by_bettor:
                # We only want to ping the API for bets that were not complete the last time we checked
                if not bet.completed:
                    game_id = bet.game_id
                    score_endpoint = f"https://api.the-odds-api.com/v4/sports/baseball_mlb/scores?apiKey={API_KEY}&daysFrom=3&dateFormat=iso&eventIds={game_id}"

                    score_response = requests.get(score_endpoint)
                    score_data = score_response.json() 

                    try: 
                        game = score_data[0]
                            
                        # If there is a score, set the score
                        # if game["scores"] and len(game["scores"]) >= 2:
                        bet.home_team_score = int(game["scores"][0]["score"])
                        bet.away_team_score = int(game["scores"][1]["score"])
                        

                        if game["completed"] == True:
                            bet.completed = True
                            home_team_diff = float(bet.home_team_score) - float(bet.away_team_score)
                            if home_team_diff > (float(bet.home_team_spread) * -1):
                                bet.winner = bet.home_team
                            else:
                                bet.winner = bet.away_team

                            if bet.winner == bet.bettor_pick:
                                bet.bet_status = "Won"
                            else:
                                bet.bet_status = "Lost"
                        bet.save()

                    except:
                        continue
            return Response(BetSerializer(bets_by_bettor, many=True).data)
        except:
            return Response("No bet's placed yet!")








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
