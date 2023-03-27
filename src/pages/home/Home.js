import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner';

//The Home page
const Home = () => {
  return (
    <div className='home-page'>
      <Spinner />
      <main>
        <div className='homepage-title'>
          <h1>Helsinki city bikes</h1>
          <h4 className='mt-3'>
            All rent bike's trips information in one place!
          </h4>
        </div>
        <div className='row buttons-div'>
          <Link to='/dashboard'>
            <div className='btn btn-lg btn-dark button'>Visitor</div>
          </Link>
          <Link to='/login'>
            <div className='btn btn-lg button btn-dark mt-3'>Admin</div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
