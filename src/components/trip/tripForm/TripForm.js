import React, { useRef, useState } from 'react';
import './tripForm.css';
import { selectStationInfo } from '../../../redux/features/station/stationSlice';
import { useSelector } from 'react-redux';
import { fireEvent } from '@testing-library/react';

const TripForm = ({ handleInputChange, saveTrip, trip }) => {
  const [departureId, setdepartureId] = useState('');
  const [returnId, setReturnId] = useState('');
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);

  const { allStations } = useSelector(selectStationInfo);

  const handleDepartureStation = (event) => {
    const selectedStation = event.target.value;
    const selectedStationId = allStations.find(
      (station) => station.name === selectedStation
    );
    if (selectedStationId) {
      setdepartureId(selectedStationId.id);
      fireEvent.change(inputRef1.current, {
        target: { value: selectedStationId.id },
      });
    }
  };

  const handleReturnStation = (event) => {
    const selectedStation = event.target.value;
    const selectedStationId = allStations.find(
      (station) => station.name === selectedStation
    );
    if (selectedStationId) {
      setReturnId(selectedStationId.id);
      fireEvent.change(inputRef2.current, {
        target: { value: selectedStationId.id },
      });
    }
  };

  return (
    <div className='trip-form'>
      <form onSubmit={saveTrip}>
        <label htmlFor='departureDate'>Departure date:</label>
        <input
          type='date'
          placeholder='Departure date'
          name='departureDate'
          id='departureDate'
          value={trip.departureDate}
          onChange={handleInputChange}
        />
        <label htmlFor='departureStationName'>Departure station name:</label>
        <select
          onChange={(event) => {
            handleDepartureStation(event);
            handleInputChange(event);
          }}
          id='departureStationName'
          name='departureStationName'
        >
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
          placeholder={departureId}
          name='departureStationId'
          id='departureId'
          value={departureId}
          ref={inputRef1}
          onChange={handleInputChange}
        />
        <label htmlFor='returnDate'>Return date:</label>
        <input
          type='date'
          placeholder='Return date'
          name='returnDate'
          id='returnDate'
          value={trip.returnDate}
          onChange={handleInputChange}
        />
        <label htmlFor='returnStationName'>Return station name:</label> <br />
        <select
          onChange={(event) => {
            handleReturnStation(event);
            handleInputChange(event);
          }}
          id='returnStationName'
          name='returnStationName'
        >
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
          placeholder={returnId}
          name='returnStationId'
          id='returnId'
          value={returnId}
          ref={inputRef2}
          onChange={handleInputChange}
        />
        <label htmlFor='distance'>Distance:</label>
        <input
          type='text'
          placeholder='Distance'
          name='distance'
          value={trip.distance}
          onChange={handleInputChange}
        />
        <label htmlFor='duration'>Duration:</label>
        <input
          type='text'
          placeholder='Duration'
          name='duration'
          value={trip.duration}
          onChange={handleInputChange}
        />
        <button>Add</button>
      </form>
    </div>
  );
};

export default TripForm;
