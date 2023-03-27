import React from 'react';
import Humburger from '../humburger/Humburger';
import { ImUser } from 'react-icons/im';
import './header.css';

const Header = () => {
  return (
    <div className='header'>
      <div className='title'>
        <ImUser size='25' />
        <div className='user-container'>Jean</div>
      </div>
      <Humburger />
    </div>
  );
};

export default Header;
