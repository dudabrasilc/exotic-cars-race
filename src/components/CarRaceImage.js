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

}

export default CarRaceImage;