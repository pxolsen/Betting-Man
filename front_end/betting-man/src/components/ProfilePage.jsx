import { useOutletContext } from "react-router-dom"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
// import { api } from "../utilities"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';


export default function ProfilePage() {

    const { user, logOut, userBets, get_user_bets, deleteAccount } = useOutletContext()
    const[userWins, setUserWins] = useState(0)
    const[userLosses, setUserLosses] = useState(0)
    const[userPending, setUserPending] = useState(0)
    // const capital_username = (user).charAt(0).toUpperCase() + (user).slice(1)
    const userWinRate = (userWins / (userWins + userLosses) * 100).toFixed(2)

    console.log(user)
    useEffect(() => {
        console.log(user)
        if (user) {
            get_user_bets()
        }
    },[user])

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

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              initialSlide: 2
            }
          },
          {
            breakpoint: 550,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };



    return (
        <>


        <div className="carousel">
            <h2 className="text-center text-4xl pb-10 font-bold">{user}'s Statistics</h2>
            <Slider {...settings}>
                <div className="stat-box bg-blue-500 hover:scale-105 duration-300 rounded-lg">
                    <h3 className="pt-14">{userWins + userLosses}</h3>
                    <div className="text-center text-2xl">Total Bets</div>
                </div>
                <div className="stat-box bg-green-500 hover:scale-105 duration-300 rounded-lg">
                    <h3 className="pt-14">{userWins}</h3>
                    <div className="text-center text-2xl">Won</div>
                </div>
                <div className="stat-box bg-red-500 hover:scale-105 duration-300 rounded-lg">
                    <h3 className="pt-14">{userLosses}</h3>
                    <div className="text-center text-2xl">Lost</div>
                </div>
                <div className="stat-box bg-yellow-400 hover:scale-105 duration-300 rounded-lg">
                    <h3 className="pt-14">{userPending}</h3>
                    <div className="text-center text-2xl">Pending</div>
                </div>
                <div className="stat-box bg-slate-500 hover:scale-105 duration-300 rounded-lg">
                    <h3 className="pt-14">{userWinRate}%</h3>
                    <div className="text-center text-2xl">Winning Percentage</div>
                </div>
            </Slider>
            <div className="flex flex-col pt-10">
            <Link className="text-green-500 font-bold pb-3 text-center hover:scale-125 duration-300"onClick={logOut}>Logout</Link>
            <Link className="text-red-400 font-bold text-center hover:scale-125 duration-300" onClick={deleteAccount}>Delete Account</Link>
            </div>
        </div>


        </>
    )
}