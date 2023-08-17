import { useOutletContext } from "react-router-dom"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
// import { api } from "../utilities"

export default function ProfilePage() {

    const { user, logOut, userBets, get_user_bets, deleteAccount } = useOutletContext()
    const[userWins, setUserWins] = useState(0)
    const[userLosses, setUserLosses] = useState([])
    const[userPending, setUserPending] = useState([])
    // const capital_username = (user.username).charAt(0).toUpperCase() + (user.username).slice(1)

    // console.log(user)
    useEffect(() => {
        console.log(user)
        if (user) {
            get_user_bets()
        }
    },[])

    useEffect(() => {
        if (userBets) {
            get_wins();
            get_losses();
            get_pending();
        }
    }, [userBets])


    const get_wins = () => {
        const wins_count = userBets.reduce((acc, bet) => {
            if (bet.bet_status === "Won") {
                return acc + 1;
            }
            return acc;
        }, 0)
        setUserWins(wins_count)
    }
    const get_losses = () => {
        const loss_count = userBets.reduce((acc, bet) => {
            if (bet.bet_status === "Lost") {
                return acc + 1;
            }
            return acc;
        }, 0)
        setUserLosses(loss_count)
    }
    const get_pending = () => {
        const pending_count = userBets.reduce((acc, bet) => {
            if (bet.bet_status === "Pending") {
                return acc + 1;
            }
            return acc;
        }, 0)
        setUserPending(pending_count)
    }



    return (
        <>
        {user ?
            <div>{user}'s Statistics</div> :
            <div>Refresh the page</div>
        }
        <div>{userWins} Won</div>
        <div>{userLosses} Lost</div>
        <div>{userPending} Pending</div>
        <Link onClick={logOut}>Logout</Link>
        <Link onClick={deleteAccount}>Delete Account</Link>
        </>
    )
}