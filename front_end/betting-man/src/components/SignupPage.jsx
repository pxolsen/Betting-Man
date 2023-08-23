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

  // useEffect(() => {
  //   console.log("username:  ", username);
  //   console.log("password:  ", password);
  // }, [username, password]);
  
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
      navigate("/")
      // console.log(response)
    } catch (err) {
        alert("Try a different username!")
        console.log("request failed")
        console.log(err)
    }
  }


  return (
    <form className="flex flex-col pt-10 justify-center items-center" onSubmit={(e) => signUp(e)}>
      <div className="flex flex-col w-[15vw]">
      <input
        className="input"
        placeholder="username"
        type="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="input"
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      </div>
      <button type="submit" className= "bg-white w-[45vw] h-[10vh] rounded-lg hover:scale-105 duration-300 mt-2 font-bold text-l" >Signup</button>
    </form>
  )
}