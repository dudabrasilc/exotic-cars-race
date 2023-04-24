import React from "react";
import exotic from '../images/exotic-cars.jpg';
import video from '../images/bg-video.mp4';


function Home({ user }) {

  if (user) {
    return (
      <div className="video-background">
        <video autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>
        <div className="content">
          <div className="logged-in-home">
            <img src={exotic} alt="exotic-cars-logo" className="exotic-cars-logo" />
            <br></br>
            <h2 className="home_title">Welcome Back, {user.username.charAt(0).toUpperCase() + user.username.slice(1)}!</h2>
          </div>
        </div>
      </div>
    );

  } else {
    return (

      <div className="video-background">
        <video autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>
        <div className="content">
          <div className="signup-home">
            <img className="exotic-cars-logo" alt="exotic-cars-logo" src={exotic} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
