import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import { AiFillLock, AiOutlineLoading3Quarters } from 'react-icons/ai';

const Login = () => {
  return (
    <>
      <div className='form-container'>
        <div className='auth-form'>
          <AiFillLock size='30' className='mb-4 ' />

          <form>
            <input
              type='text'
              placeholder='Username'
              name='username'
              value=''
            />
            <input type='password' placeholder='Password' name='password' />
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
