import { React } from 'react';
import RaceTrackCard from './RaceTrackCard';

function RaceTracks({raceTracks}) {

  return (
    <div className='tracks-page'>
    <h2 className="tracks-title">Race Tracks</h2>
    <div className='tracks-sub'>Explore the best tracks in the world. Click on card to learn more about the track!</div>
      <div className="race-tracks-container">
      {raceTracks.map((track) => (
        <RaceTrackCard key={track.id} track={track} />
      ))}
      </div>
    </div>
  )

}

export default RaceTracks;

