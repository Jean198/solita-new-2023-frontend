import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogin } from '../redux/features/auth/authSlice';
import { getLoginStatus } from '../services/authService';

const useRedirectUsers = (path) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const redirectUsers = async () => {
      const loginStatus = await getLoginStatus();
      dispatch(setLogin(loginStatus));

      if (!loginStatus) {
        setTimeout(() => {
          navigate(path);
        }, 3000);
        return;
      }
    };
    redirectUsers();
  }, [navigate, path, dispatch]);
};

export default useRedirectUsers;
