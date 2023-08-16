import { useState, useContext, useEffect } from "react"
// import { userContext } from "../App"
import { api } from "../utilities"
import { useNavigate } from "react-router-dom"
import { useOutletContext } from "react-router-dom";

export default function SignupPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("username:  ", username);
    console.log("password:  ", password);
  }, [username, password]);
  
  const signUp = async(e) => {
    e.preventDefault();
    try {
      let response = await api.post("bettors/signup/", {
        username: username,
        password: password,
      });
      let user = response.data.user;
      let token = response.data.token;
      setUser(user);
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      navigate("/home")
      // console.log(response)
    } catch (err) {
        alert("Try a different username!")
        console.log("request failed")
        console.log(err)
    }
  }


  return (
    <form onSubmit={(e) => signUp(e)}>
      <h5 className="btn">Sign Up</h5>
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
  )
}