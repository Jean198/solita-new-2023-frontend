import React, { useState } from 'react';
import TripForm from '../../components/trip/tripForm/TripForm';
import useProtectRoutes from '../../customHook/useProtectRoutes';
import { useSelector, useDispatch } from 'react-redux';
import {
  createTrip,
  selectTripInfo,
} from '../../redux/features/trip/tripSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../../components/spinner/Spinner';

const AddTrip = () => {
  useProtectRoutes('/login');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector(selectTripInfo);
  const [trip, setTrip] = useState({
    departureDate: '',
    departureStationName: '',
    departureStationId: '',
    returnDate: '',
    returnStationName: '',
    returnStationId: '',
    distance: '',
    duration: '',
  });

  const handleInputChange = (event) => {
    //Caching form inputs
    console.log(event.target.value);
    const { name, value } = event.target;
    setTrip((prevTrip) => {
      return { ...prevTrip, [name]: value };
    });
  };

  const saveTrip = async (event) => {
    // handling the form submition
    //console.log(trip);
    event.preventDefault();
    if (
      trip.departureDate === '' ||
      trip.returnDate === '' ||
      trip.departureStationId === '' ||
      trip.departureStationName === '' ||
      trip.returnStationId === '' ||
      trip.returnStationName === '' ||
      trip.distance === '' ||
      trip.duration === ''
    ) {
      return toast.error('One or more information is missing', {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    await dispatch(createTrip(trip));

    setTrip({
      //Emptying the form fields after submition
      returnDate: '',
      departureStationId: '',
      departureStationName: '',
      returnStationId: '',
      returnStationName: '',
      distance: '',
      duration: '',
    });

    setTimeout(() => {
      //Redirecting to stations page after form submition
      navigate('/dashboard/trips');
    }, 2000);
  };

  return (
    <div>
      <h3>Add new trip</h3>
      {isLoading && <Spinner />}
      <TripForm
        handleInputChange={handleInputChange}
        trip={trip}
        saveTrip={saveTrip}
      />
    </div>
  );
};

export default AddTrip;
