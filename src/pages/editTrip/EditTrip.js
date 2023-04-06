import React, { useEffect, useState } from 'react';
import EditTripForm from '../../components/trip/editTripForm/EditTripForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTrip,
  getTrips,
  selectTripInfo,
  updateTrip,
} from '../../redux/features/trip/tripSlice';
import Spinner from '../../components/spinner/Spinner';

const EditTrip = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector(selectTripInfo);
  const { trip } = useSelector(selectTripInfo);
  const [tripEdit, setTripEdit] = useState(trip);
  const [departureId, setDepartureId] = useState(null);
  const [returnId, setReturnId] = useState(null);

  useEffect(() => {
    dispatch(getTrip(id));
  }, [dispatch, id]);

  useEffect(() => {
    setTripEdit(trip);
  }, [trip]);

  const handleDepartureIdChange = (e) => {
    setDepartureId(e.target.value);
  };
  const handleReturnIdChange = (e) => {
    setReturnId(e.target.value);
  };

  const handleInputChange = (eevent) => {
    const { name, value } = eevent.target;
    setTripEdit({ ...tripEdit, [name]: value });
  };
  console.log('my departureId', departureId);
  console.log('my departureName', tripEdit?.departure_station_name);
  console.log('my returnId', returnId);
  console.log('my ReturnName', tripEdit?.return_station_name);
  const saveTrip = async (e) => {
    e.preventDefault();

    const formData = {
      departureDate: tripEdit.departure_date,
      departureStationName: tripEdit.departure_station_name,
      departureStationId:
        departureId === null ? tripEdit.departure_station_id : departureId,
      returnDate: tripEdit.return_date,
      returnStationName: tripEdit.return_station_name,
      returnStationId:
        returnId === null ? tripEdit.return_station_id : returnId,
      distance: tripEdit.covered_distance_m,
      duration: tripEdit.duration_sec,
    };

    if (id) {
      await dispatch(updateTrip({ id, formData }));
      await dispatch(getTrips());
      navigate('/dashboard/trips');
      window.location.reload(true);
    }
  };
  return (
    <div>
      {isLoading && <Spinner />}
      <h3>Edit Trip</h3>
      <EditTripForm
        trip={tripEdit}
        saveTrip={saveTrip}
        handleInputChange={handleInputChange}
        handleDepartureIdChange={handleDepartureIdChange}
        handleReturnIdChange={handleReturnIdChange}
      />
    </div>
  );
};

export default EditTrip;
