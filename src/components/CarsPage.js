import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CarsDataContext } from "../App";

const CarsPage = ({ user, races, setRaces, addCarToRace }) => {
  const [selectedRace, setSelectedRace] = useState(user?.races[0]?.id);
  let navigate = useNavigate();
  const { id } = useParams();
  const [carData, setCarData] = useState(null);
  const { carsData, setCarsData } = useContext(CarsDataContext);

  useEffect(() => {
    fetch(`/cars/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCarData(data);
      });
  }, [id]);

  if (!carData) {
    return <div>Loading...</div>;
  }

};

export default CarsPage;
