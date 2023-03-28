import axios from 'axios';
import { toast } from 'react-toastify';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

//Login User
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/users/login`,
      userData,
      {
        withCredentials: true,
      }
    );

    if (response.statusText === 'OK') {
      toast.success('Login successful!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    }

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  }
};

//logout user
export const logoutUser = async () => {
  try {
    await axios.get(`${BACKEND_URL}/api/users/logout`, {
      withCredentials: true,
    });
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Get Login Status
export const getLoginStatus = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/users/isloggedin`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
