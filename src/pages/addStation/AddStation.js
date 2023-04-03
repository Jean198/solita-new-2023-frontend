import React, { useState } from 'react';
import StationForm from '../../components/station/stationForm/StationForm';
import useProtectRoutes from '../../customHook/useProtectRoutes';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../../components/spinner/Spinner';
import {
  createStation,
  selectStationInfo,
} from '../../redux/features/station/stationSlice';

const AddStation = () => {
  useProtectRoutes('/login');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector(selectStationInfo);

  const [station, setStation] = useState({
    stationName: '',
    stationAddress: '',
    city: '',
    operator: '',
    longitude: '',
    latitude: '',
  });

  const handleInputChange = (event) => {
    //Caching form inputs
    const { name, value } = event.target;
    setStation((prevStation) => {
      return { ...prevStation, [name]: value };
    });
  };

  const saveStation = async (event) => {
    // handling the form submition
    console.log(station);
    event.preventDefault();
    if (
      station.stationName === '' ||
      station.stationAddress === '' ||
      station.city === '' ||
      station.operator === '' ||
      station.longitude === '' ||
      station.latitude === ''
    ) {
      return toast.error('One or more information is missing', {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    await dispatch(createStation(station));
    toast.success('station added successfully!', {
      position: toast.POSITION.TOP_CENTER,
      toastId: 'stationSuccessAdded',
    });
    setStation({
      //Emptying the form fields after submition
      stationName: '',
      stationAddress: '',
      city: '',
      operator: '',
      longitude: '',
      latitude: '',
    });

    setTimeout(() => {
      //Redirecting to stations page after form submition
      navigate('/dashboard/stations');
    }, 2000);
  };

  return (
    <div>
      <h3>Add new station</h3>
      {isLoading && <Spinner />}
      <StationForm
        handleInputChange={handleInputChange}
        station={station}
        saveStation={saveStation}
      />
    </div>
  );
};

export default AddStation;
