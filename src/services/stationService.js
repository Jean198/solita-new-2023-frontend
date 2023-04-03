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
};

export default stationService;
