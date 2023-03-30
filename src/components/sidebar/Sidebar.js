import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './sidebar.css';
import { useDispatch } from 'react-redux';
import { MdDirectionsBike, MdLogin, MdLogout } from 'react-icons/md';
import { FaParking } from 'react-icons/fa';
import { AiOutlineHome } from 'react-icons/ai';
import { logoutUser } from '../../services/authService';
import { setLogin, setName } from '../../redux/features/auth/authSlice';
import { ShowOnLogin, ShowOnLogout } from '../protect/hiddenLinks';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const backToHomepage = () => {
    navigate('/');
  };

  const logout = async () => {
    await logoutUser();
    await dispatch(setLogin(false));
    await dispatch(setName(''));
    navigate('/login');
  };
  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <h1>Dashboard</h1>
        <div className='home-icon'>
          <AiOutlineHome size={35} onClick={() => backToHomepage()} />
        </div>
      </div>
      <div className='navlinks-container'>
        <div className='navlink-container'>
          <MdDirectionsBike size='30' />
          <Link to='/dashboard/trips' className='navlink'>
            All trips
          </Link>
        </div>
        <div className='navlink-container'>
          <FaParking size='30' />
          <Link to='/dashboard/stations' className='navlink'>
            All stations
          </Link>
        </div>

        <ShowOnLogout>
          <div className='navlink-container'>
            <MdLogin size='30' />
            <Link to='/login' className='navlink'>
              Login
            </Link>
          </div>
        </ShowOnLogout>

        <ShowOnLogin>
          <div className='navlink-container'>
            <MdLogout size='30' />
            <Link to='' className='navlink' onClick={logout}>
              Logout
            </Link>
          </div>
        </ShowOnLogin>
      </div>
    </div>
  );
};

export default Sidebar;
