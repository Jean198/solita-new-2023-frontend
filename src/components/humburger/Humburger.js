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
    <div class='menu-toggle' onClick={handleMenu}>
      <div class='hamburger'>
        <span></span>
      </div>
    </div>
  );
};

export default Humburger;
