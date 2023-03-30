import React from 'react';
import './stationForm.css';

const stationForm = () => {
  const cities = ['Helsinki', 'Espoo', 'Vantaa'];
  return (
    <div className='station-form'>
      <form>
        <label htmlFor='stattionName'>Station name:</label>
        <input
          type='text'
          placeholder='Station name'
          name='stationName'
          id='stationName'
        />
        <label htmlFor='stationAddress'>Station address:</label>
        <input
          type='text'
          placeholder='Station address'
          name='stationAddress'
          id='stationAddress'
        />
        <label htmlFor='city'>City:</label>
        <select id='city'>
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
        />
        <br />
        <label htmlFor='longitude'>Longitude:</label>
        <input
          type='text'
          placeholder='Longitude'
          name='longitude'
          id='longitude'
        />
        <label htmlFor='latitude'>Latitude:</label>
        <input
          type='text'
          placeholder='Latitude'
          name='latitude'
          id='latitude'
        />
        <button>Add</button>
      </form>
    </div>
  );
};

export default stationForm;
