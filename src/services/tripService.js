import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/trips`;

const createtrip = async (formData) => {
  const response = await axios.post(`${API_URL}/createtrip`, formData, {
    withCredentials: true,
  });
  return response.data;
};

// Get all trips

const getTrips = async (tripPageNumber, tripSearchString, tripSearchType) => {
  const response = await axios.get(
    `${API_URL}/gettrips/?page=${tripPageNumber}&search=${tripSearchString}&searchType=${tripSearchType}`
  );
  return response.data;
};

// Delete trip
const deleteTrip = async (id) => {
  const response = await axios.delete(`${API_URL}/deletetrip/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

// Get a single trip
const getTrip = async (id) => {
  const response = await axios.get(`${API_URL}/gettrip/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

// Update a single trip
const updateTrip = async (id, formData) => {
  console.log('frmdata', formData);
  const response = await axios.patch(`${API_URL}/updatetrip/${id}`, formData, {
    withCredentials: true,
  });
  return response.data;
};

const tripService = {
  createtrip,
  getTrips,
  deleteTrip,
  getTrip,
  updateTrip,
};

export default tripService;
