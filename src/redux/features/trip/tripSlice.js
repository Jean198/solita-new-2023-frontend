import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import tripService from '../../../services/tripService';

const initialState = {
  trip: null,
  trips: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  tripPageNumber: 0,
  tripSearchString: '',
  tripSearchType: '',
  tripNumberOfPages: 0,
  tripPaging: [],
  popularDepartureStations: [],
  popularReturnStations: [],
  message: '',
};

// get all stations
export const getTrips = createAsyncThunk(
  'trips/getAll',
  async (tripPageNumber, tripSearchString, tripSearchType, thunkAPI) => {
    // I am not sending any data
    try {
      return await tripService.getTrips(
        tripPageNumber,
        tripSearchString,
        tripSearchType
      );
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

//--------------------------------------------------------------

// Create New trip
export const createtrip = createAsyncThunk(
  'trips/create',
  async (formData, thunkAPI) => {
    try {
      return await tripService.createtrip(formData);
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

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    setPageNumber: (state, action) => {
      state.tripPageNumber = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createtrip.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createtrip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.trips.push(action.payload);
        toast.success('trip added successfuly!', {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .addCase(createtrip.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload, {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .addCase(getTrips.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrips.fulfilled, (state, action) => {
        const {
          data,
          paging,
          popularDepartureStations,
          popularReturnStations,
        } = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.trips = data;
        state.tripPaging = paging;
        state.tripPageNumber = paging.page;
        state.popularDepartureStations = popularDepartureStations;
        state.popularReturnStations = popularReturnStations;
        state.tripNumberOfPages = paging.numberOfPages;
      })
      .addCase(getTrips.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  },
});
export const { setPageNumber } = tripSlice.actions;
export const selectTripInfo = (store) => store.trip;
export default tripSlice.reducer;
