import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/trips`;

const createtrip = async (formData) => {
  const response = await axios.post(`${API_URL}/createtrip`, formData);
  return response.data;
};

// Get all trips

const getTrips = async (tripPageNumber, tripSearchString, tripSearchType) => {
  console.log('running');
  const response = await axios.get(
    `${API_URL}/gettrips/?page=${tripPageNumber}&search=${tripSearchString}&searchType=${tripSearchType}`
  );
  console.log(response.data);
  return response.data;
};

const tripService = {
  createtrip,
  getTrips,
};

export default tripService;
