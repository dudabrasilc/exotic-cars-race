import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CarRaceImage({ race, setRace, handleDeleteCar, show }) {
  const [racesCars, setRacesCars] = useState([]);

  useEffect(() => {
    fetch(`/race/${race.id}`)
      .then((resp) => resp.json())
      .then((data) => {
        setRace(data);
      });
  }, []);

  useEffect(() => {
    fetch(`/races_cars`)
      .then((resp) => resp.json())
      .then((data) => {
        setRacesCars(data);
      });
  }, [handleDeleteCar]);

  const carImages =
    race.cars &&
    racesCars
      .filter((racesCar) => racesCar.race_id === race.id)
      .map((racesCar) => {
        return (
          <div className="imgdiv" key={racesCar.id}>
           <i
              className={show ? "show fa-solid fa-xmark fa-xl" : "hide"}
              onClick={() => {
                handleDeleteCar(racesCar.car.id)
              }}
            ></i>
            <Link to={`/${racesCar.car.id}/details`}>
              <img
                className="car-race-img"
                src={racesCar.car.image}
                alt="car-image"
              />
            </Link>
          </div>
        );
      });

  return <>{carImages}</>;

}

export default CarRaceImage;