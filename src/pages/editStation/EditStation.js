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

const EditStation = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector(selectStationInfo);
  const { station } = useSelector(selectStationInfo);
  const [stationEdit, setStationEdit] = useState(station);

  useEffect(() => {
    dispatch(getStation(id));
  }, [getStation, id]);

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
    }
  };

  return (
    <div>
      {' '}
      <h3>Edit product</h3>
      <EditStationForm
        stationEdit={stationEdit}
        saveStation={saveStation}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default EditStation;
