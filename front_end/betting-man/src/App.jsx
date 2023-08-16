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

  const whoAmI = async () => {
    let token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      try {
        let response = await api.get("bettors/info/");
          setUser(response.data);
          navigate("home");
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

  useEffect(() => {
    whoAmI();
  }, []);


  return (
    <>
      <Navbar user={user} logOut={logOut}/>
        <Outlet context={{ user, setUser }} />
    </>
  )
}

