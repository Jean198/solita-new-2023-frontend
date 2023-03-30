import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUserInfo, setLogin } from '../redux/features/auth/authSlice';
import { getLoginStatus } from '../services/authService';

const useProtectRoutes = (path) => {
  const { name } = useSelector(selectUserInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const protectRoutes = async () => {
      const loginStatus = await getLoginStatus();
      dispatch(setLogin(loginStatus));

      if (!loginStatus || (loginStatus && name === 'visitor')) {
        navigate(path);
        return;
      }
    };
    protectRoutes();
  }, [navigate, path, dispatch]);
};

export default useProtectRoutes;
