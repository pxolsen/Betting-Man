from django.urls import path
from .views import A_bet, Bets_by_bettor

urlpatterns = [
    path("", A_bet.as_view()),
    # path("bettor/<int:bettor_id>/", Bets_by_bettor.as_view())
    path("bettor/", Bets_by_bettor.as_view())
]