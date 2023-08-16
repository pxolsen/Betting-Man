import BetCard from "./BetCard"
import { useState, useEffect } from "react"
import { api } from "../utilities"
import { useOutletContext } from "react-router-dom"
export default function BestPage() {

    const { user } = useOutletContext()
    const [userBets, setUserBets] = useState([])

    useEffect(() => {
        if (user) {
            get_user_bets()
        }
    },[user])

    const get_user_bets = async() => {
        
        try {
            let response = await api.get("/bets/bettor/")
            console.log(response.data)
            setUserBets(response.data)
        } catch {
            console.log("There was an issue retrieving your bets.")
        }
    }
    console.log(userBets)
    
    return (
        <div>
            {userBets.map((bet, index) => (
            <BetCard key={index} betData={bet} setUserBets={setUserBets} />
            ))}
        </div>
    )
}