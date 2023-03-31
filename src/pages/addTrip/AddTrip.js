import React from 'react';
import TripForm from '../../components/trip/tripForm/TripForm';
import useProtectRoutes from '../../customHook/useProtectRoutes';

const AddTrip = () => {
  useProtectRoutes('/login');
  return (
    <div>
      <h3>Add new trip</h3>
      <TripForm />
    </div>
  );
};

export default AddTrip;
