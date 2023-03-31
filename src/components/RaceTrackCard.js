import { React, useState } from 'react';

function RaceTrackCard({ track }) {
const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  return (
    <div
      className={`race-track-card ${flipped ? "flipped" : ""}`}
      onClick={handleClick} >
      <div className="card-front">
        <h1 className="track-title">{track.name}</h1>
        <h2 className='card-location'>{track.location}</h2>
        <img className="track-img" src={track.image} alt="track-img" />
        <br/>
        <div>Track Length: {track.length}</div>
        <div>Vertical Gain: {track.vertical_gain}</div>
      </div>
      <div className="card-back">
        <h1 className="track-title">{track.name}</h1>
        <br></br>
        <div className='track-description'>{track.description}</div>
      </div>
    </div>
  );
}

export default RaceTrackCard;