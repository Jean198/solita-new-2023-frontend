import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/trips`;

const createtrip = async (formData) => {
  const response = await axios.post(`${API_URL}/createtrip`, formData);
  return response.data;
};

// Get all trips

const gettrips = async (pageNumber, searchString, searchType) => {
  const response = await axios.get(
    `${API_URL}/gettrips/?page=${pageNumber}&search=${searchString}&searchType=${searchType}`
  );
  return response.data;
};

const tripService = {
  createtrip,
  gettrips,
};

export default tripService;
