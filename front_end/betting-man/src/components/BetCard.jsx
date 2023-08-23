import { api } from "../utilities";
import { useState, useEffect } from "react";

export default function BetCard(props) {

  const { betData, setBetMade, user, setUserBets, betMade, userBets } = props;
  const [gameStarted, setGameStarted] = useState(false);

  // console.log(betData);
  const away_team = betData.away_team;
  const home_team = betData.home_team;
  const away_team_spread = betData.away_team_spread;
  const home_team_spread = betData.home_team_spread;
  const away_team_score = betData.away_team_score;
  const home_team_score = betData.home_team_score;
  const bet_status = betData.bet_status;
  const bettor_pick = betData.bettor_pick;
  const completed = betData.completed;
  const winner = betData.winner;

  useEffect(() => {
    const currentTime = new Date(getCurrentTimeInUTC());
    const gameTime = new Date(betData.commence_time);
    setGameStarted(gameTime < currentTime);
    // console.log(
    //   `current: ${currentTime}    start: ${gameTime}    has the game started? ${gameStarted}`
    // );
  }, [user, userBets, betMade]);

  function convertToEasternTime(utcDateTimeString) {
    const utcDate = new Date(utcDateTimeString);
    const easternDate = new Date(
      utcDate.toLocaleString("en-US", { timeZone: "America/New_York" })
    );

    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const options = {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    };

    if (isSameDate(easternDate, now)) {
      return `Today, ${easternDate.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })} EDT`;
    } else if (isSameDate(easternDate, tomorrow)) {
      return `Tomorrow, ${easternDate.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })} EDT`;
    } else {
      return easternDate.toLocaleString("en-US", options);
    }
  }

  function isSameDate(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  const commence_time = convertToEasternTime(betData.commence_time);

  const pickTeam = async (team) => {
    if (!bettor_pick || bettor_pick !== team) {
      try {
        await api.put("bets/", {
          bet_id: betData.id,
          bettor_pick: team,
        });
        console.log("Bet updated successfully");
        if (setUserBets) {
            setUserBets((prev) =>
              prev.map((bet) => {
                if (bet.id === betData.id) {
                  bet.bettor_pick = team;
                  return bet
                } else {
                    return bet
                }
              })
            );
        }
        if (setBetMade) {
            setBetMade((prev) => (prev += 1));
        }
      } catch (error) {
        console.error("Error updating bet:", error);
      }
    } else if (bettor_pick === team) {
      try {
        await api.put("bets/", {
          bet_id: betData.id,
          bettor_pick: null,
        });
        console.log("Bet updated successfully");
        setUserBets((prev) => prev.filter((bet) => bet.id !== betData.id));
      } catch (error) {
        console.error("Error updating bet:", error);
      }
    }
  };

  function getCurrentTimeInUTC() {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, "0");
    const day = String(now.getUTCDate()).padStart(2, "0");
    const hours = String(now.getUTCHours()).padStart(2, "0");
    const minutes = String(now.getUTCMinutes()).padStart(2, "0");
    const seconds = String(now.getUTCSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
  }

  return (
    <div className="bg-black h-full">


      <div className="w-full py-5 px-4 bg-black">


      <div className="py-5 shadow-xl font-black bg-gray-400">
        <h2 className="text-center text-xl font-bold">
          {home_team} vs. {away_team}
        </h2>
        {bet_status !== "No Bet" && (
          <div
            className={`${
              bet_status === "Won"
                ? "text-green-500 text-lg text-center font-bold"
                : bet_status === "Lost"
                ? "text-red-600 text-lg text-center font-bold"
                : "text-yellow-400 text-lg text-center font-bold"
            }`}
          >
            {bet_status}
          </div>
        )}
        <div className="text-center text-lg">{commence_time}</div>
      </div>


        <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8">

          <button 
          onClick={() => pickTeam(home_team)}
          className={`${
            bet_status === "Pending" && bettor_pick === home_team ? "btn bg-yellow-300" : 
            bet_status === "Won" && bettor_pick === home_team ? "btn bg-green-500" :
            bet_status === "Lost" && bettor_pick === home_team ? "btn bg-red-600" :
            !gameStarted && bet_status === "Pending" || bet_status === "No Bet" ? "btn bg-white hover:bg-yellow-300" :
            "btn bg-white"
          }`}
          disabled={gameStarted}
          >
            <h2 className="text-2xl font-bold text-center py-8">{home_team} @ {home_team_spread}</h2>
            {home_team_score !== null && (
              <div className="text-4xl font-bold">{home_team_score}</div>
            )}
          </button>

          <button 
          onClick={() => pickTeam(away_team)}
          className={`${
            bet_status === "Pending" && bettor_pick === away_team ? "btn bg-yellow-300" : 
            bet_status === "Won" && bettor_pick === away_team ? "btn bg-green-500" :
            bet_status === "Lost" && bettor_pick === away_team ? "btn bg-red-600" :
            !gameStarted && bet_status === "Pending" || bet_status === "No Bet" ? "btn bg-white hover:bg-yellow-300" :
            "btn bg-white"
          }`}
          disabled={gameStarted}
          >
            <h2 className="text-2xl font-bold text-center py-8">{away_team} @ {away_team_spread}</h2>
            {away_team_score !== null && (
              <div className="text-4xl font-bold">{away_team_score}</div>
            )}
          </button>

        </div>
      </div>




      {/* <div className="flex">
        <button
          onClick={() => pickTeam(home_team)}
          className={`${
            bettor_pick === home_team ? "btn border-yellow-300" : "btn"
          }`}
          disabled={gameStarted}
        >
          <div>
            {home_team} @ {home_team_spread}
          </div>
          <div className="text-4xl">{home_team_score}</div>
        </button>



        <button
          onClick={() => pickTeam(away_team)}
          className={`${
            bettor_pick === away_team ? "btn border-yellow-300" : "btn"
          }`}
          disabled={gameStarted}
        >
          <div>
            {away_team} @ {away_team_spread}
          </div>
          <div className="text-4xl">{away_team_score}</div>
        </button>
      </div> */}


    </div>
  );
}
