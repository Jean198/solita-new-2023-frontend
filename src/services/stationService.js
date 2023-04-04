import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/stations`;

const createStation = async (formData) => {
  const response = await axios.post(`${API_URL}/createstation`, formData, {
    withCredentials: true,
  });

  return response.data;
};

// Get all stations
const getStations = async (pageNumber, searchString) => {
  const response = await axios.get(
    `${API_URL}/getstations/?page=${pageNumber}&search=${searchString}`
  );
  return response.data;
};

// Get a single Station
const getStation = async (id) => {
  const response = await axios.get(`${API_URL}/getstation/${id}`, {
    withCredentials: true,
  });
  return response.data.station[0];
};

// Update a single trip
const updateStation = async (id, formData) => {
  console.log(formData);
  const response = await axios.patch(
    `${API_URL}/updateStation/${id}`,
    formData,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

// Delete station
const deleteStation = async (id) => {
  const response = await axios.delete(`${API_URL}/deletestation/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

const stationService = {
  createStation,
  getStations,
  deleteStation,
  getStation,
  updateStation,
};

export default stationService;
