import React, { useEffect } from 'react';
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
  const { pageNumber, stationSearchString } = useSelector(selectStationInfo);
  const { tripPageNumber, tripSearchString, tripSearchType } =
    useSelector(selectTripInfo);

  const dispatch = useDispatch();

  //Fetching stations
  useEffect(() => {
    dispatch(getStations({ pageNumber, stationSearchString }));
  }, [dispatch, pageNumber, stationSearchString]);

  //Fetching trips
  useEffect(() => {
    dispatch(getTrips({ tripPageNumber, tripSearchString, tripSearchType }));
  }, [dispatch, tripPageNumber, tripSearchString, tripSearchType]);

  useRedirectUsers('/login');
  return (
    <div className='dashboard'>
      <Sidebar />
      {children}
    </div>
  );
};

export default Dashboard;
