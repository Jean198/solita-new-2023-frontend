import React from 'react';
import './stationForm.css';

const stationForm = ({ handleInputChange, saveStation, station }) => {
  const cities = ['Helsinki', 'Espoo', 'Vantaa'];
  return (
    <div className='station-form'>
      <form onSubmit={saveStation}>
        <label htmlFor='stattionName'>Station name:</label>
        <input
          type='text'
          placeholder='Station name'
          name='stationName'
          id='stationName'
          onChange={handleInputChange}
        />
        <label htmlFor='stationAddress'>Station address:</label>
        <input
          type='text'
          placeholder='Station address'
          name='stationAddress'
          id='stationAddress'
          onChange={handleInputChange}
        />
        <label htmlFor='city'>City:</label>
        <select id='city' name='city' onChange={handleInputChange}>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>{' '}
        <br />
        <label htmlFor='operator'>Operator:</label>
        <input
          type='text'
          placeholder='Operator'
          name='operator'
          id='operator'
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor='longitude'>Longitude:</label>
        <input
          type='text'
          placeholder='Longitude'
          name='longitude'
          id='longitude'
          onChange={handleInputChange}
        />
        <label htmlFor='latitude'>Latitude:</label>
        <input
          type='text'
          placeholder='Latitude'
          name='latitude'
          id='latitude'
          onChange={handleInputChange}
        />
        <button>Add</button>
      </form>
    </div>
  );
};

export default stationForm;
