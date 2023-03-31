import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectUserInfo, setLogin } from '../redux/features/auth/authSlice';
import { getLoginStatus } from '../services/authService';

const useStayOnTheSamePage = (path) => {
  const { name } = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const [url, setUrl] = useState('');

  useEffect(() => {
    const protectRoutes = async () => {
      const loginStatus = await getLoginStatus();
      dispatch(setLogin(loginStatus));
      if (!loginStatus || (loginStatus && name === 'visitor')) {
        setUrl('');
      } else {
        setUrl(path);
      }
    };
    protectRoutes();
  }, [dispatch, name, path]);

  return url;
};

export default useStayOnTheSamePage;
