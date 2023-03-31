import React from 'react';
import StationForm from '../../components/station/stationForm/StationForm';
import useProtectRoutes from '../../customHook/useProtectRoutes';

const AddStation = () => {
  useProtectRoutes('/login');
  return (
    <div>
      <h3>Add new station</h3>
      <StationForm />
    </div>
  );
};

export default AddStation;
