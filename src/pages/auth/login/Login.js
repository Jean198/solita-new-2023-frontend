import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import { AiFillLock } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../../../services/authService';

import { setLogin, setName } from '../../../redux/features/auth/authSlice';
import Spinner from '../../../components/spinner/Spinner';
const initialState = {
  username: '',
  password: '',
};

const toastPosition = {
  position: toast.POSITION.TOP_CENTER,
  autoClose: 2000,
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { username, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      return toast.error('All fields are required', toastPosition);
    }

    const userData = {
      username,
      password,
    };

    setIsLoading(true);

    try {
      const data = await loginUser(userData);
      dispatch(setLogin(true));
      dispatch(setName(data.name));
      navigate('/dashboard');
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className='form-container'>
        {isLoading && <Spinner />}
        <div className='auth-form'>
          <AiFillLock size='30' className='mb-4 ' />

          <form onSubmit={login}>
            <input
              type='text'
              placeholder='Username'
              name='username'
              value={username}
              onChange={handleInputChange}
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={handleInputChange}
            />
            <button>Login</button>
            <p className='message'>
              Back to <Link to='/'>Homepage</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
