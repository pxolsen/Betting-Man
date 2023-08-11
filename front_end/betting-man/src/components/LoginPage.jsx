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
    let user = response.data.user;
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    setUser(user);
    navigate("/home")
  }

    return (
      <>
      <form onSubmit={(e) => login(e)}>
      <h5>Log In</h5>
      <input
        type="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" />
    </form>
      </>
    )
  }