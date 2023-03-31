import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
        toast.error('You must be loggedin to perform the action!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
          toastId: 'notAllowedError',
        });
        navigate(path);
        return;
      }
    };
    protectRoutes();
  }, [navigate, path, dispatch, name]);
};

export default useProtectRoutes;
