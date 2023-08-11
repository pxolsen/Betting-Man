import { api } from "../utilities"

export default function BetCard(props) {

    const { betData, setBetMade } = props
    console.log(betData)


    const pickTeam = async (team) => {
        try {
            await api.put("bets/", {
                "bet_id": betData.id,
                "bettor_pick": team
            });
            console.log("Bet updated successfully");
            setBetMade((prev) => prev += 1)
        } catch (error) {
            console.error("Error updating bet:", error);
        }
    };

    return (
        <div className="bet-card-holder">
            <h2>{betData.home_team} vs. {betData.away_team}</h2>
            <div className="button-container">
            <button onClick={()=>pickTeam(betData.home_team)}>{betData.home_team} @ {betData.home_team_spread}</button>
            <button onClick={()=>pickTeam(betData.away_team)}>{betData.away_team} @ {betData.away_team_spread}</button>
            </div>
        </div>
    )
}

// response.data = {model: string, pk: number, fields: {home_team: string, away_team: string, etc…}}