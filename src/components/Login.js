import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import video from '../images/bg-video.mp4';


function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([])

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
        navigate(`/`)

      }
      else {
        r.json().then(json => {
          setErrors(Object.entries(json.errors))
        })
      }
    });
  }

  const navigate = useNavigate()

  return (
    <div className="video-background">
      <video autoPlay muted loop>
        <source src={video} type="video/mp4" />
      </video>
      <div className="form">
        <form className="loginbox" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <br></br>
          <label className="loginname" htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br></br>
          <br></br>
          <label className="passwordname" htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>
          {errors ? errors.map(error => <div> <br></br>{<small>{error[1]}</small>} </div>) : null}
          <button type="submit">LOGIN</button>

        </form>

      </div>
    </div>
  );
}

export default Login;
