import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
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
        <h1 className='sidebar-h1'>Dashboard </h1>

        <AiOutlineHome
          className='home-icon'
          size={35}
          onClick={() => backToHomepage()}
        />
      </div>
      <div className='navlinks-container'>
        <div className='navlink-container'>
          <MdDirectionsBike
            size='30'
            className='sidebar-link-icons material-icons animate'
          />
          <NavLink
            to='/dashboard/trips'
            className='navlink'
            activeClassName='active'
          >
            All trips
          </NavLink>
        </div>
        <div className='navlink-container'>
          <FaParking size='30' className='sidebar-link-icons' />
          <NavLink
            to='/dashboard/stations'
            className='navlink'
            activeClassName='active'
          >
            All stations
          </NavLink>
        </div>

        <ShowOnLogout>
          <div className='navlink-container'>
            <MdLogin size='30' className='sidebar-link-icons' />
            <NavLink to='/login' className='navlink'>
              Login
            </NavLink>
          </div>
        </ShowOnLogout>

        <ShowOnLogin>
          <div className='navlink-container'>
            <MdLogout size='30' className='sidebar-link-icons' />
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
