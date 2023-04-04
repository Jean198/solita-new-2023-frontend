import React, { useRef, useState } from 'react';
import { selectStationInfo } from '../../../redux/features/station/stationSlice';
import { useSelector } from 'react-redux';
import { fireEvent } from '@testing-library/react';

const EditTripForm = ({
  trip,
  handleInputChange,
  saveTrip,
  handleDepartureIdChange,
  handleReturnIdChange,
}) => {
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
          name='departure_date'
          id='departureDate'
          value={
            trip
              ? new Date(trip.departure_date).toISOString().substr(0, 10)
              : null
          }
          onChange={handleInputChange}
        />
        <label htmlFor='departureStationName'>Departure station name:</label>
        <select
          onChange={(event) => {
            handleDepartureStation(event);
            handleInputChange(event);
          }}
          id='departureStationName'
          name='departure_station_name'
        >
          <option value={trip?.departure_station_name}>
            {trip?.departure_station_name}
          </option>
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
          placeholder={trip?.departure_station_id}
          name='departure_station_id'
          id='departureId'
          value={departureId}
          ref={inputRef1}
          onChange={handleDepartureIdChange}
          disabled
        />
        <label htmlFor='returnDate'>Return date:</label>
        <input
          type='date'
          placeholder='Return date'
          name='return_date'
          id='returnDate'
          value={
            trip ? new Date(trip.return_date).toISOString().substr(0, 10) : null
          }
          onChange={handleInputChange}
        />
        <label htmlFor='returnStationName'>Return station name:</label> <br />
        <select
          onChange={(event) => {
            handleReturnStation(event);
            handleInputChange(event);
          }}
          id='returnStationName'
          name='return_station_name'
        >
          <option value={trip?.return_station_name}>
            {trip?.return_station_name}
          </option>
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
          placeholder={trip?.return_station_id}
          name='return_station_id'
          id='returnId'
          value={returnId}
          ref={inputRef2}
          onChange={handleReturnIdChange}
          disabled
        />
        <label htmlFor='distance'>Distance:</label>
        <input
          type='text'
          placeholder='Distance'
          name='covered_distance_m'
          value={trip?.covered_distance_m}
          onChange={handleInputChange}
        />
        <label htmlFor='duration'>Duration:</label>
        <input
          type='text'
          placeholder='Duration'
          name='duration_sec'
          value={trip?.duration_sec}
          onChange={handleInputChange}
        />
        <button>Add</button>
      </form>
    </div>
  );
};

export default EditTripForm;
