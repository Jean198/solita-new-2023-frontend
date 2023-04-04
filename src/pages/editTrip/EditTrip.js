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

const EditTrip = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector(selectTripInfo);
  const { trip } = useSelector(selectTripInfo);
  const [tripEdit, setTripEdit] = useState(trip);

  useEffect(() => {
    dispatch(getTrip(id));
  }, [dispatch, id]);

  useEffect(() => {
    setTripEdit(trip);
  }, [trip]);

  console.log(trip?.departure_date);

  const handleInputChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setTripEdit({ ...tripEdit, [name]: value });
  };

  const saveTrip = async (e) => {
    e.preventDefault();

    const formData = {
      departureDate: tripEdit.departure_date,
      departureStationName: tripEdit.departure_station_name,
      departureStationId: tripEdit.departure_station_id,
      returnDate: tripEdit.return_date,
      returnStationName: tripEdit.return_station_name,
      returnStationId: tripEdit.return_station_id,
      distance: tripEdit.covered_distance_m,
      duration: tripEdit.duration_sec,
    };

    if (id) {
      await dispatch(updateTrip({ id, formData }));
      await dispatch(getTrips());
      navigate('/dashboard/trips');
    }
  };
  return (
    <div>
      <h3>Edit Trip</h3>
      <EditTripForm
        trip={tripEdit}
        saveTrip={saveTrip}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default EditTrip;
