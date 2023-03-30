import React from 'react';
import Header from '../header/Header';
import './main.css';

const Main = ({ children }) => {
  return (
    <div className='main-content'>
      <Header />
      <div className='content'>{children}</div>
    </div>
  );
};

export default Main;
