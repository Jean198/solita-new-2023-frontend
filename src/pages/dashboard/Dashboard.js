import React from 'react';
import Humburger from '../../components/humburger/Humburger';
import Main from '../../components/main/Main';
import Sidebar from '../../components/sidebar/Sidebar';
import useRedirectUsers from '../../customHook/useRedirectUsers';
import './dashboard.css';

const Dashboard = () => {
  useRedirectUsers('/login');
  return (
    <div className='dashboard'>
      <Sidebar />
      <Main />
    </div>
  );
};

export default Dashboard;
