import { useState, useContext } from "react";
// import { userContext } from "../App";
import { api } from "../utilities";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";

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
    navigate("/")
  }

  // const login = async (e) => {
  //   e.preventDefault();
  //   let data = JSON.stringify({
  //     "username": username,
  //     "password": password
  //   });
    
  //   let config = {
  //     method: 'post',
  //     maxBodyLength: Infinity,
  //     url: 'http://127.0.0.1:8000/api/bettors/login/',
  //     headers: { 
  //       'Content-Type': 'application/json', 
  //     },
  //     data : data
  //   };
    
  //   axios.request(config)
  //   .then((response) => {
  //     console.log(JSON.stringify(response.data));
  //     let token = response.data.token ;
  //     let user = response.data.username;
  //     localStorage.setItem("token", token);
  //     api.defaults.headers.common["Authorization"] = `Token ${token}`;
  //     setUser(user);
  //     navigate("/home")
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // }

    return (
      <>
      <form className="flex flex-col pt-10 justify-center items-center" onSubmit={(e) => login(e)}>

      <div className="flex flex-col w-[15vw]">
        <input
          className="input"
          placeholder="username"
          type="text"
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

      <button type="submit" className= "bg-white w-[45vw] h-[10vh] rounded-lg hover:scale-105 duration-300 mt-2 font-bold text-l" >Login</button>


    </form>
      </>
    )
  }
