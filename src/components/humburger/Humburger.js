import React from 'react';
import './humburger.css';

const Humburger = () => {
  const handleMenu = () => {
    const menu_toggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    menu_toggle.classList.toggle('is-active');
    sidebar.classList.toggle('is-active');
  };
  return (
    <div className='menu-toggle' onClick={handleMenu}>
      <div className='hamburger'>
        <span></span>
      </div>
    </div>
  );
};

export default Humburger;
