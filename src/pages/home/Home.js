import React from 'react';
import './home.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../services/authService';
import { setLogin, setName } from '../../redux/features/auth/authSlice';

//The Home page
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const visitorLogin = async () => {
    try {
      const data = await loginUser({
        username: 'visitor',
        password: 'visitor',
      });
      dispatch(setLogin(true));
      dispatch(setName(data.name));
      navigate('/dashboard/trips');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='home-page'>
      <main>
        <div className='homepage-title'>
          <h1>Helsinki city bikes</h1>
          <h4 className='mt-3'>
            All rent bike's trips information in one place!
          </h4>
        </div>
        <div className='row buttons-div'>
          <Link to=''>
            <div className='btn btn-lg btn-dark button' onClick={visitorLogin}>
              Visitor
            </div>
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
