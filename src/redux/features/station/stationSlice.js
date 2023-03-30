import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import stationService from '../../../services/stationService';

const initialState = {
  station: null,
  stations: [],
  allStations: [],
  paging: [],
  pageNumber: 0,
  numberOfPages: 0,
  searchString: '',
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// get all products
export const getStations = createAsyncThunk(
  'stations/getAll',
  async (pageNumber, searchString, thunkAPI) => {
    // I am not sending any data
    try {
      return await stationService.getStations(pageNumber, searchString);
    } catch (error) {
      /*
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
      */
    }
  }
);

// Create New station
export const createstation = createAsyncThunk(
  'stations/create',
  async (formData, thunkAPI) => {
    try {
      return await stationService.createstation(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//------------------------------------------------------------------------------------------------------------------------

const stationSlice = createSlice({
  name: 'station',
  initialState,
  reducers: {
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createstation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createstation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.stations.push(action.payload);
        toast.success('station added successfuly!', {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .addCase(createstation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload, {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .addCase(getStations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStations.fulfilled, (state, action) => {
        const { data, allStations, paging } = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.stations = data;
        state.paging = paging;
        state.pageNumber = paging.page;
        state.numberOfPages = paging.numberOfPages;
        state.allStations = allStations;
      })
      .addCase(getStations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  },
});
export const { setPageNumber } = stationSlice.actions;

export const selectStationInfo = (store) => store.station;

export default stationSlice.reducer;
