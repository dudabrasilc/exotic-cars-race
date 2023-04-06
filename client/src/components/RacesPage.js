import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import RaceCard from "./RaceCard";

export default function RacesPage({createRace, racesCars, setRacesCars, races, setRaces, cars }) {
    const [newRaceName, setNewRaceName] = useState('');
    const [errors, setErrors] = useState('');
    const [allTracks, setAllTracks] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [emptyName, setEmptyName] = useState(false);

    useEffect(() => {
        if (allTracks.length > 0) {
            setSelectedTrack(allTracks[0].id);
        }
    }, [allTracks]);

useEffect(() => {
    fetch(`/races_cars`)
      .then((res) => res.json())
      .then((data) => setRacesCars(data))
      .catch((error) => console.log(error));
  }, [races]);

  
  useEffect(() => {
      fetch("/race_tracks").then((r) => {
          if (r.ok) {
              r.json().then((tracks) => setAllTracks(tracks));
          }
      });
  }, []);

  useEffect(() => {
    fetch("/races")
      .then((response) => response.json())
      .then((data) => {
        setRaces(data);
      })
      .catch((error) => console.error("Error fetching races:", error));
  }, []);

    const handleSubmit = (event) => {
        event.persist();
        event.preventDefault();
        createNewRace(newRaceName);
    };

    const handleRaceChange = (event) => {
        setNewRaceName(event.target.value);
    }

    const createNewRace = (newRaceName) => {
        if (!selectedTrack) {
          return;
        }

        if (!newRaceName) {
            setEmptyName(true)
        } else {
        fetch(`/races`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: newRaceName,
            race_track_id: selectedTrack         
          })
        })
        .then(resp => resp.json())
        .then(data => {
          if (data.error) {
            setErrors(...data.error)
          } else {
            setNewRaceName("");
            createRace(data)
          }
        });
        }
      };

    function deleteRace(raceToBeDeleted) {
        const filteredRaces = races.filter(race => {
            return race.id !== raceToBeDeleted
        })
        setRaces(filteredRaces)
    }

    function deleteCar(carToBeDeleted) {
        const filteredCars = racesCars.filter(racesCar => {
            return racesCar.car_id !== carToBeDeleted
        })
        setRacesCars(filteredCars)
    }
    

    function updateFavorite(raceToBeUpdated) {
        const updatedRacesList = races.map(race => {
          if (race.id === raceToBeUpdated.id) {
            return raceToBeUpdated
          }
          return race; // add this line to handle undefined values
        })
        setRaces(updatedRacesList)
      }


    return (
        <div className='bg-races'>
            <h1 className='header-races'>Create your own race and get an estimated result!</h1>
            <br></br>
            <div className='steps'>
            <h2 className='subheader-races'>Steps:</h2>
            <ol className='list-races'>
                <li>Select a car from the Collection tab.</li>
                <li>Choose the race you want it to be added to.</li>
                <li>Once you have added the cars you want to a race, click "Let's Race" to get the results.</li>
            </ol>
            </div>
            <br></br>
            <br></br>
            <small className='note'>Note: The model estimates the winning percentage based on attributes of cars and a race track, considering the same driver, weather condition and acceleration for all cars .</small>
            <br></br>
            <br></br>
            <hr></hr>
            <br></br>
            <div className="teamform">
                <div className="d-flex flex-column justify-content-center">
                    <label className='new-race'>Race Name:</label>
                    <input className="teamname" onChange={handleRaceChange} value={newRaceName}
                        placeholder="New race name..."/>
                        <br></br>
            </div>
            <br></br>
            <label className='label-track'>Race Track:</label>

                            <select className="track-select" name="selectList" value={selectedTrack} onChange={(e) => setSelectedTrack(e.target.value)} >
                            {allTracks.map(track => {
                                return  <option className="options" name="selectedTrack" value={track.id} key={track.id}> {track.name} </option>
                            })}

                            </select>
                </div>
                <div className='race-name-error'>{emptyName ? "Error: Race name cannot be blank" : ""}</div> 
                        <form onSubmit={handleSubmit} className="form-bottom">
                            <button className='create-race'>Create Race 🏁</button>
                        </form>
        {races?.map(race => {
        return <RaceCard key={race.id} deleteRace={deleteRace} deleteCar={deleteCar} raceId={race.id} cars={cars} updateFavorite={updateFavorite} racesCarss={race.races_cars} />
      })}

        </div>
    )
    
}