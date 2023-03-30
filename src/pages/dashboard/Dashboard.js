import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../components/sidebar/Sidebar';
import useRedirectUsers from '../../customHook/useRedirectUsers';
import {
  getStations,
  selectStationInfo,
} from '../../redux/features/station/stationSlice';
import './dashboard.css';

const Dashboard = ({ children }) => {
  const { pageNumber, searchString } = useSelector(selectStationInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(pageNumber, searchString);
    dispatch(getStations(pageNumber, searchString));
  }, [dispatch, pageNumber]);

  useRedirectUsers('/login');
  return (
    <div className='dashboard'>
      <Sidebar />
      {children}
    </div>
  );
};

export default Dashboard;
