import React, { useState } from 'react';
import './tripForm.css';
import { selectStationInfo } from '../../../redux/features/station/stationSlice';
import { useSelector } from 'react-redux';

const TripForm = () => {
  const { allStations } = useSelector(selectStationInfo);
  const [departureStationId, setDepatureStationId] = useState('');
  const [returnStationId, setReturnStationId] = useState('');

  const handleDepartureStation = (event) => {
    const selectedStation = event.target.value;
    const selectedStationId = allStations.find(
      (station) => station.name === selectedStation
    );
    if (selectedStationId) {
      setDepatureStationId(selectedStationId.id);
    }
  };

  const handleReturnStation = (event) => {
    const selectedStation = event.target.value;
    const selectedStationId = allStations.find(
      (station) => station.name === selectedStation
    );
    if (selectedStationId) {
      setReturnStationId(selectedStationId.id);
    }
  };

  return (
    <div className='trip-form'>
      <form>
        <label htmlFor='departureStationName'>Departure station name:</label>
        <select onChange={handleDepartureStation} id='departureStationName'>
          {allStations.map((station) => (
            <option key={station.id} value={station.name}>
              {station.name}
            </option>
          ))}
        </select>{' '}
        <br />
        <label htmlFor='departureId'>Departure station Id:</label>
        <input
          type='text'
          placeholder={departureStationId}
          name='distance'
          id='departureId'
          value={departureStationId}
        />
        <label htmlFor='returnStationName'>Return station name:</label> <br />
        <select onChange={handleReturnStation} id='returnStationName'>
          {allStations.map((station) => (
            <option key={station.id} value={station.name}>
              {station.name}
            </option>
          ))}
        </select>{' '}
        <br />
        <label htmlFor='departureId'>Return station Id:</label>
        <input
          type='text'
          placeholder={returnStationId}
          name='distance'
          id='returnId'
          value={returnStationId}
        />
        <input type='text' placeholder='Distance' name='distance' />
        <input type='text' placeholder='Duration' name='duration' />
        <button>Add</button>
      </form>
    </div>
  );
};

export default TripForm;
