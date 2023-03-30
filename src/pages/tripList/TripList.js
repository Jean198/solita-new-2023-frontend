import React from 'react';
import { Link } from 'react-router-dom';

const TripList = () => {
  return (
    <div>
      {' '}
      <Link to='/trips/addtrip'>
        <button className='btn btn-success'>Add new trip</button>
      </Link>
    </div>
  );
};

export default TripList;
