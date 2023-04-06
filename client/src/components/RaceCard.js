import React, { useState, useEffect } from "react";
import CarRaceImage from "./CarRaceImage";

function RaceCard({ deleteRace, deleteCar, raceId, updateFavorite }) {
  const [show, setShow] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [result, setResult] = useState(null);
  const [hasMinimumCars, setHasMinimumCars] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [race, setRace] = useState([]);

  useEffect(() => {
    fetch(`/races/${raceId}`)
      .then((resp) => resp.json())
      .then((data) => {
        setIsFavorite(data.is_favorited);
      });
  }, [raceId]);

  useEffect(() => {
    fetch(`/races/${raceId}`)
      .then((resp) => resp.json())
      .then((data) => {
        setRace(data);
      });
  }, []);

  if (!race) {
    return null; // or some other fallback UI
  }

  const racesCar =
    race.races_cars && race.races_cars.find((racesCar) => {
      return toString(racesCar.race_id) === toString(race.id);
    });

  // this component is responsible to render all functionality of a racecard: delete race button, favorite race


  const handleDeleteCar = (carId) => {
    if (race && race.races_cars && racesCar) {
      const racesCarToDelete = race.races_cars.find(
        (racesCar) => racesCar.car_id === carId
      );
  
      if (racesCarToDelete) {
        fetch(`/races_cars/${racesCarToDelete.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(resp => resp.json())
          .then(data => {
            deleteCar(carId);
          })
          .catch(err => {
            console.log("Error deleting race car:", err);
          });
      }
    }
  };
  

    const handleDeleteRace = () => {
      if (race) {
        fetch(`/races/${race.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(resp => resp.json())
          .then(data => {
            deleteRace(race.id);
          })
          .catch(err => {
            console.log("Error deleting race:", err);
          });
      }
    };

  
    function handleFavorite() {
      if (race) {
        fetch(`/races/${race.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            is_favorited: !isFavorite
          }),
        })
          .then(r => r.json())
          .then(data => {
            setIsFavorite(isFavorite => !isFavorite);
            updateFavorite(data);
          })
          .catch(err => {
            console.log("Error updating favorite:", err);
          });
      }
    }

  function handleClick() {



  if (race.cars.length >= 2) { // Check if there are at least 2 cars in the race
    setShowResult(true)
    const trackLength = parseFloat(race?.race_track?.length); // Get the length of the race track and convert it to a float
    const trackTurns = parseInt(race?.race_track?.turns); // Get the number of turns in the race track and convert it to an integer
    const trackVerticalGain = parseInt(race?.race_track?.vertical_gain); // Get the vertical gain of the race track and convert it to an integer
  
    const carPerformanceScores = race?.cars?.map(car => { // Loop through each car in the race and calculate its performance score
      
        const carPower = parseFloat(car.power.split(" ")[0]); // Get the power of the car and convert it to a float
        const carTorque = parseFloat(car.torque.split(" ")[0]); // Get the torque of the car and convert it to a float

        const speedScore = car.top_speed / (trackLength * trackTurns); // Calculate the speed score of the car
        const handlingScore = (carPower + carTorque) / car.weight; // Calculate the handling score of the car
        const hillClimbScore = (carPower + carTorque) / trackVerticalGain; // Calculate the hill climb score of the car
        const totalScore = speedScore + handlingScore + hillClimbScore; // Calculate the total score of the car

        return {car: car, score: totalScore}; // Return an object with the car and its performance score
    });
  
    const sortedScores = carPerformanceScores && carPerformanceScores.length > 0 ? carPerformanceScores.sort((a, b) => b.score - a.score) : []; // Sort the cars based on their performance score in descending order

    const highestScore = sortedScores[0]?.score; // Get the performance score of the car with the highest score
    const lowestScore = sortedScores[sortedScores.length - 1]?.score; // Get the performance score of the car with the lowest score
    const range = highestScore - lowestScore; // Calculate the range of performance scores
    
      const result = sortedScores.map(car => {
          const percentage = ((car.score - lowestScore) / range * 0.8 + 0.1) * 100;
          const explanation = `The ${car.car.make} ${car.car.model} has a score of ${car.score.toFixed(2)}, which gives it a winning chance between ${(percentage - 5).toFixed(2)}% and ${percentage.toFixed(2)}%. This car has a top speed of ${car.car.top_speed} mph, a zero-to-sixty time of ${car.car.zero_to_sixty_mph} seconds, and a weight of ${car.car.weight} pounds. Based on these attributes, this car is ${(percentage).toFixed(2)}% likely to win the race on this track.`;
          return (
              <>
              <div className="results">
                  <h1>{car.car.make} - {car.car.model}</h1>
                  <h2>Winning Chance: {`${(percentage - 5).toFixed(2)}% - ${percentage.toFixed(2)}%`}</h2>
                  <h3>{explanation}</h3>
              </div>
              </>
          
          );
      });
  
  
      setResult(result)
    

  } else {
      setHasMinimumCars(false)
  }
     
    }


  return(
      <div className="race-card">
          <h2 className="race-title">{race?.name} - {race?.race_track?.name}</h2>
          <i className="fa-solid fa-pen-to-square cursor-pointer fa-2xl" style={{ color: '#290465', textShadow: '1px 1px white'}} onClick={(e) => setShow(!show)}></i>
          {/* favorite star */}
           <i className={isFavorite ? "fa-solid fa-star fa-2xl" : "fa-regular fa-star fa-2xl" } onClick={handleFavorite} />
           {/* first function in the image div is show and hide the X. the link is the image of the races car */}
          <CarRaceImage race={race} setRace={setRace} handleDeleteCar={handleDeleteCar} show={show}/>
          <button className="deletebutton" onClick={handleDeleteRace}>DELETE RACE</button>
          <br></br>
          <br></br>
          <button className="racebutton" onClick={handleClick} >LET'S RACE!  🏁</button>
          {/* <hr></hr> */}
          {
            showResult ?
            <>
              <hr></hr>
              <h1 className="result-title">Race Results</h1>
            </>
              :
              null
          }
          {result}
          <div className="error-minimum">{hasMinimumCars ? null : "Error: A race must have at least 2 cars."}</div>   
      </div>
  )
}


export default RaceCard;