import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Humburger from '../../components/humburger/Humburger';
import Main from '../../components/main/Main';
import Sidebar from '../../components/sidebar/Sidebar';
import useRedirectUsers from '../../customHook/useRedirectUsers';
import { getStations } from '../../redux/features/station/stationSlice';
import './dashboard.css';

const Dashboard = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStations());
  }, [dispatch]);

  useRedirectUsers('/login');
  return (
    <div className='dashboard'>
      <Sidebar />
      {children}
    </div>
  );
};

export default Dashboard;
