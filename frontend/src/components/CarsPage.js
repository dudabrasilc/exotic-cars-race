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

  const { make, model, year, engine, power, torque, zero_to_sixty_mph, top_speed, image } = carData;

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/races_cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        race_id: selectedRace,
        car_id: id,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        addCarToRace(data);
        navigate("/my-races");
      })
      .then((ata) => {
        alert(`${make} ${model} was added to the list successfuly!`);
      });
  }

  return (
    <div className="bg-car">
      <div className="box-car">
        {user ?
          <div>
            <div>
              <img className="car-img" src={image} alt="car image" />
              <h4 className="bigtitle">
                {make}
              </h4>
              <br></br>
              <h4 className="model-details">{model}</h4>
              <div className="typebox1">
              </div>
            </div>
            <table className="table">
              <tr className="car-attributes">
                <td>Make:</td>
                <td>{make}</td>
              </tr>
              <tr className="car-attributes">
                <td>Model:</td>
                <td>{model}</td>
              </tr>
              <tr className="car-attributes">
                <td>Year:</td>
                <td>{year}</td>
              </tr>
              <tr className="car-attributes">
                <td>Engine:</td>
                <td>{engine}</td>
              </tr>
              <tr className="car-attributes">
                <td>Power:</td>
                <td>{power}</td>
              </tr>
              <tr className="car-attributes">
                <td>Torque:</td>
                <td>{torque}</td>
              </tr>
              <tr className="car-attributes">
                <td>0-60mph:</td>
                <td>{zero_to_sixty_mph}s</td>
              </tr>
              <tr className="car-attributes">
                <td>Top Speed:</td>
                <td>{top_speed}mph</td>
              </tr>
            </table>
            <br></br>
            <div className="teamselection">
              <select className="selections" name="selectList" id="selectList" value={selectedRace} onChange={(e) => setSelectedRace(e.target.value)} >
                {races.map(race => {
                  return <option className="options" name="selectedRace" value={race.id}> {race.name} </option>
                })}
              </select>
              <form className="add" onSubmit={handleSubmit}>
                <button>Add to Race</button>
              </form>
            </div>
          </div>
          :
          navigate("/app-login")
        }
      </div>
    </div>
  );
};

export default CarsPage;

