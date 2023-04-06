import React, { useEffect, useState } from 'react';
import {
  getStation,
  getStations,
  selectStationInfo,
  updateStation,
} from '../../redux/features/station/stationSlice';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import EditStationForm from '../../components/station/editStationForm/EditStationForm';
import Spinner from '../../components/spinner/Spinner';

const EditStation = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { station, isLoading } = useSelector(selectStationInfo);
  const [stationEdit, setStationEdit] = useState(station);

  useEffect(() => {
    dispatch(getStation(id));
  }, [dispatch, id]);

  useEffect(() => {
    setStationEdit(station);
  }, [station]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStationEdit({ ...stationEdit, [name]: value });
  };

  const saveStation = async (e) => {
    e.preventDefault();

    const formData = {
      stationName: stationEdit.name,
      stationAddress: stationEdit.address,
      city: stationEdit.city,
      operator: stationEdit.operator,
      longitude: stationEdit.x,
      latitude: stationEdit.y,
    };

    if (id) {
      await dispatch(updateStation({ id, formData }));
      await dispatch(getStations());
      navigate('/dashboard/stations');
      window.location.reload(true);
    }
  };

  return (
    <div>
      {isLoading && <Spinner />} <h3>Edit Station</h3>
      <EditStationForm
        stationEdit={stationEdit}
        saveStation={saveStation}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default EditStation;
