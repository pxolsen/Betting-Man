import { useState, useContext } from "react";
// import { userContext } from "../App";
import { api } from "../utilities";
import { useNavigate, useOutletContext } from "react-router-dom";


export default function LoginPage() {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useOutletContext();
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    let response = await api.post("bettors/login/", {
      "username" : username,
      "password": password,
    })
    .catch((err) =>{
      alert("Invalid Credentials")
    })
    console.log(response)
    let token = response.data.token ;
    let user = response.data.username;
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    setUser(user);
    navigate("/home")
  }

    return (
      <>
      <form className="flex-row" onSubmit={(e) => login(e)}>


      <h5 className="btn">Log In</h5>

      <input
        className="input"
        type="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" />


    </form>
      </>
    )
  }