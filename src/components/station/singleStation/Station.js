import './station.css';
import React from 'react';

//The station component which is the row in the station's list table
const Station = ({ station, index }) => {
  return (
    <>
      <tr className='station-row' key={index}>
        <td></td>
        <td>{station.id}</td>
        <td>{station.name}</td>
      </tr>
    </>
  );
};

export default Station;
