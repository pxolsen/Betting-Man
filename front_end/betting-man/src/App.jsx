import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import './App.css'
import { useEffect, useState } from "react";
import { api } from "./utilities";
import { useNavigate } from "react-router-dom";
// import { createContext } from "react";


export default function App() {

  const [user, setUser] = useState(null)
  const navigate = useNavigate();
  const [userBets, setUserBets] = useState([])

  const whoAmI = async () => {
    let token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      try {
        let response = await api.get("bettors/info/");
          setUser(response.data.username); // CHANGED THIS FROM response.data ********************************************************
          console.log(user)
      } catch {
        setUser(null);
        navigate("/")
      }
    } else {
      setUser(null);
      navigate("/")
    }
  }

  const logOut = async () => {
    let response = await api.post("bettors/logout/")
    if (response.status === 204) {
      localStorage.removeItem("token")
      setUser(null)
      delete api.defaults.headers.common["Authorization"];
      navigate("/")
    }
  }

  const deleteAccount = async () => {
    let response = await api.delete("bettors/delete/")
    if (response.status === 204) {
      localStorage.removeItem("token")
      setUser(null)
      delete api.defaults.headers.common["Authorization"];
      navigate("/")
    }
  }
  

  useEffect(() => {
    whoAmI();
  }, []);

//   useEffect(() => {
//     if (user) {
//         get_user_bets()
//     }
// },[user])

const get_user_bets = async() => {
    
    try {
        console.log(userBets)
        let response = await api.get("/bets/bettor/")
        console.log(response.data)
        setUserBets(response.data)
    } catch {
        console.log("There was an issue retrieving your bets.")
    }
}


  return (
    <>
      <Navbar user={user}/>
        <Outlet context={{ user, setUser, logOut, whoAmI, userBets, setUserBets, get_user_bets, deleteAccount }} />
    </>
  )
}

