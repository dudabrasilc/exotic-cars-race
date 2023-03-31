import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import video from '../images/bg-video.mp4';


const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState([]);
  const [showPasswordMatchError, setShowPasswordMatchError] = useState(false);
  const navigate = useNavigate();

  const { username, password, password_confirmation } = formData;

  function onSubmit(e) {
    e.preventDefault();
    const user = {
      username,
      password,
      password_confirmation,
    };

    fetch(`/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          navigate(`/app-login`);
        });
      } else {
        res.json().then((json) => {
            setErrors(json.errors);
        })
      }
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClick = (event) => {
    console.log(event.target);
    alert("The car was added!");
  };

  const handlePasswordConfirmationBlur = () => {
    setShowPasswordMatchError(true);
  }

  const passwordMatch =
    password === password_confirmation ? null : errors;

  return (
    <div className="video-background">
    <video autoPlay muted loop>
      <source src={video} type="video/mp4" />
    </video>
      <div className="form-signup">
        <form className="signupbox" onSubmit={onSubmit}>
          <h1 className="signup-title">Sign-up</h1>
          <br></br>
          <label className="loginname">Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />
          <br></br>
          <br></br>
          <label className="passwordname">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <br></br>
          <br></br>
          <label className="confirm-name">Confirm<br/></label>
          <label className="password-name">Password:</label>
          <input
            type="password"
            name="password_confirmation"
            value={password_confirmation}
            onChange={handleChange}
            onBlur={handlePasswordConfirmationBlur}
            className="input-confirm"
          />
          <br></br>
          <br></br>
          {/* {showPasswordMatchError && passwordMatch && <small>{passwordMatch}</small>} */}
          <br></br>
          {errors.map(error => <><small>{error}</small><br></br></>)}
          {errors && errors.map((error) => <small>{error[0].slice(0,-1)}</small>)}
          <br></br>
          <input type="submit" value="SIGN-UP" />
        </form>
      </div>
</div>
  );
};

export default SignUp;
