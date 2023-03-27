import React from 'react';
import Header from '../header/Header';
import './main.css';

const Main = ({ children }) => {
  return (
    <div className='main-content'>
      <Header />
      <div className='content'>
        This is Content Lorem, ipsum dolor sit amet consectetur adipisicing
        elit. Veniam sequi dolore sed. {children}
      </div>
    </div>
  );
};

export default Main;
