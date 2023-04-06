import React, { useState, useEffect, useMemo, useCallback, createContext } from 'react';
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";
import Collection from "./components/Collection";
import Login from "./components/Login";
import Home from "./components/Home";
import CarsPage from "./components/CarsPage"
import RacesPage from "./components/RacesPage";
import Form from "./components/Form";
import RaceTracks from "./components/RaceTracks";

function App() {

  const [carsData, setCarsData] = useState([]);
  const [user, setUser] = useState(null);
  const [racesCars, setRacesCars] = useState([]);
  const [races, setRaces] = useState([]);
  const [raceTracks, setRaceTracks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchAttribute, setSearchAttribute] = useState('make');


  useEffect(() => {
    fetch("/cars")
      .then((res) => res.json())
      .then((data) => setCarsData(data));
  }, []);

  useEffect(() => {
    fetch("/races_cars")
      .then((res) => res.json())
      .then((data) => setRacesCars(data));
  }, []);

  useEffect(() => {
    fetch("/races")
      .then((res) => res.json())
      .then((data) => setRaces(data));
  }, []);


  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  useEffect(() => {
    fetch("/race_tracks").then((r) => {
      if (r.ok) {
        r.json().then((tracks) => setRaceTracks(tracks));
      }
    });
  }, []);


  // filter cars for search bar
  const filteredCars = useMemo(() =>
  carsData.filter((car) =>
    car[searchAttribute].toString().toLowerCase().includes(searchTerm.toLowerCase())
  ), [carsData, searchAttribute, searchTerm]);


  const handleSearchTermChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);
  
  const handleSearchAttributeChange = useCallback((event) => {
    setSearchAttribute(event.target.value);
  }, []);
  

  function createRace(raceToBeAdded) {
    const addNewRacetoRaces = [...races, raceToBeAdded]
    setRaces(addNewRacetoRaces)
  }

  function addCar(newCar) {
    setCarsData(prevCars => [...prevCars, newCar]);
  }  


  function addCarToRace(data) {
    setRacesCars(prevRacesCars => [...prevRacesCars, data]);
  }


  return (
    <>
      <div>
        <NavBar user={user} setUser={setUser} />
        <div>
          {user ? (
            <Routes>
              <Route
                path="/"
                element={<Home user={user}
                />} />
              <Route
                path="/car-list"
                element={<Collection carsData={filteredCars} handleSearchTermChange={handleSearchTermChange} handleSearchAttributeChange={handleSearchAttributeChange} searchAttribute={searchAttribute} searchTerm={searchTerm}
                />} />
              <Route
                path="/:id/details"
                element={
                  <CarsDataContext.Provider value={carsData}>
                    <CarsPage user={user} races={races} setRaces={setRaces} addCarToRace={addCarToRace} />
                  </CarsDataContext.Provider>}
              />
              <Route
                path="/add-car"
                element={<Form carsData={carsData} setCarsData={setCarsData} addCar={addCar} />}
              />
              <Route
                path="/my-races"
                element={<RacesPage cars={carsData} user={user} racesCars={racesCars} setRacesCars={setRacesCars} races={races} setRaces={setRaces} createRace={createRace} raceTracks={raceTracks} />}
              />
              <Route
                path="/race_tracks"
                element={<RaceTracks raceTracks={raceTracks} />}
              />
            </Routes>
          ) : (
            <Routes>
              <Route
                path="/app-signup"
                element={<SignUp setUser={setUser}
                />} />
              <Route
                path="/app-login"
                element={<Login setUser={setUser}
                />} />
              <Route
                path="/"
                element={<Home
                />} />
              {/* <Route
              path="/car-list"
              element={<Collection carsData={carsData}
              />} /> */}
              <Route
                path="/:id/details"
                element={<CarsPage user={user} cars={carsData} />}
              />
            </Routes>
          )}

        </div>
      </div>
    </>
  );
}

export default App;
export const CarsDataContext = createContext([]);
