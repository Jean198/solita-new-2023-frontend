import React from 'react';
import Humburger from '../humburger/Humburger';
import { ImUser } from 'react-icons/im';
import './header.css';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../redux/features/auth/authSlice';

const Header = () => {
  const { name } = useSelector(selectUserInfo);
  return (
    <div className='header'>
      <div className='title'>
        <ImUser size='25' />
        <div className='user-container'>{name}</div>
      </div>
      <Humburger />
    </div>
  );
};

export default Header;
