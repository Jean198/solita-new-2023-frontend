import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../redux/features/auth/authSlice';

export const ShowOnLogin = ({ children }) => {
  const { isLoggedIn, name } = useSelector(selectUserInfo);

  if (isLoggedIn && name !== 'visitor') {
    return <>{children}</>;
  }
  return null;
};

export const ShowOnLogout = ({ children }) => {
  const { isLoggedIn, name } = useSelector(selectUserInfo);

  if (!isLoggedIn && name !== 'visitor') {
    return <>{children}</>;
  } else if (isLoggedIn && name === 'visitor') {
    return <>{children}</>;
  }
  return null;
};
