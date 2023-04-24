import React from "react";
import { Link } from "react-router-dom";
import exotic from '../images/exotic-cars.jpg';

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <section>
      <Link to="/"><img src={exotic} className="logo" alt="logo" /> </Link>
      <nav className='navbar'>
        <div>
          {user ? (
            <>
              <Link to="/car-list" className="collection">Collection</Link>
              <Link to="/my-races" className="races">My Races</Link>
              <Link to="/race_tracks" className="tracks">Tracks</Link>
              <Link to="/add-car" className="add-car">Upload Car</Link>
              <Link to="/" className="logout" onClick={handleLogoutClick}>Logout</Link>
            </>
          ) : (
            <>
              <Link to="/app-signup" className="sign-up">Sign-up</Link>
              <Link to="/app-login" className="login">Login</Link>
            </>
          )}
        </div>
      </nav>
    </section>
  );
}

export default NavBar;

