import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../components/sidebar/Sidebar';
import useRedirectUsers from '../../customHook/useRedirectUsers';
import {
  getStations,
  selectStationInfo,
} from '../../redux/features/station/stationSlice';
import { getTrips, selectTripInfo } from '../../redux/features/trip/tripSlice';
import './dashboard.css';

const Dashboard = ({ children }) => {
  const { pageNumber, searchString } = useSelector(selectStationInfo);
  const { tripPageNumber, tripSearchString, tripSearchType } =
    useSelector(selectTripInfo);

  const dispatch = useDispatch();

  //Fetching stations
  useEffect(() => {
    dispatch(getStations(pageNumber, searchString));
  }, [dispatch, pageNumber, searchString]);

  //Fetching trips
  useEffect(() => {
    console.log('My searchString:', tripSearchString);
    dispatch(getTrips({ tripPageNumber, tripSearchString, tripSearchType }));
  }, [dispatch, tripPageNumber, tripSearchString]);

  useRedirectUsers('/login');
  return (
    <div className='dashboard'>
      <Sidebar />
      {children}
    </div>
  );
};

export default Dashboard;
