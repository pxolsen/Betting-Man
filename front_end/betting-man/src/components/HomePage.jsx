import BetCard from "./BetCard"
import { useEffect, useState } from "react"
import { api } from "../utilities"
// import { useContext } from "react"
import { useOutletContext } from "react-router-dom"
import { Link } from "react-router-dom"


export default function HomePage() {

    const [betData, setBetData] = useState(null)
    const { user } = useOutletContext()
    const [betMade, setBetMade] = useState(0)


    useEffect(() => {
        get_a_bet()
    }, [user, betMade])

    const get_a_bet = async() => {
        try {
            let response = await api.get("/bets",)
            console.log(response.data)
            setBetData(response.data)
        } catch {
            return <div>No more bets available!</div>
        }
    }
    
    return (
        <div>
        {
            user ? 
        <div>
           {betData && <BetCard user={user} betData={betData} setBetMade={setBetMade} betMade={betMade}/>}
        </div> :
        <div>
        <div className="flex">
        <Link className="btn" to="/login"><button>Login</button></Link>
        <Link className="btn" to="/signup"><button>Sign Up</button></Link>
        </div>
    </div>
        }
        </div>
    )
}