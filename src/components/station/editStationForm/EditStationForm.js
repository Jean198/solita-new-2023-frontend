import React from 'react';

const EditStationForm = ({ saveStation, handleInputChange, stationEdit }) => {
  const cities = ['Helsinki', 'Espoo', 'Vantaa'];

  return (
    <>
      <div className='popup'>
        <div className='popup-inner'>
          <div className='station-form'>
            <form onSubmit={saveStation}>
              <label htmlFor='stattionName'>Station name:</label>
              <input
                type='text'
                placeholder='Station name'
                name='name'
                id='stationName'
                value={stationEdit?.name}
                onChange={handleInputChange}
              />
              <label htmlFor='stationAddress'>Station address:</label>
              <input
                type='text'
                placeholder='Station address'
                name='address'
                id='stationAddress'
                value={stationEdit?.address}
                onChange={handleInputChange}
              />
              <label htmlFor='city'>City:</label>
              <select id='city' name='city' onChange={handleInputChange}>
                <option value={stationEdit?.city}>{stationEdit?.city}</option>
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
                value={stationEdit?.operator}
                onChange={handleInputChange}
              />
              <br />
              <label htmlFor='longitude'>Longitude:</label>
              <input
                type='text'
                placeholder='Longitude'
                name='longitude'
                id='longitude'
                value={stationEdit?.x}
                onChange={handleInputChange}
              />
              <label htmlFor='latitude'>Latitude:</label>
              <input
                type='text'
                placeholder='Latitude'
                name='latitude'
                id='latitude'
                value={stationEdit?.y}
                onChange={handleInputChange}
              />
              <button>Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditStationForm;
