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
  popularDepartureTrips: [],
  popularReturnTrips: [],
  message: '',
};

// get all Trips
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

// get a single a trip
export const getTrip = createAsyncThunk(
  'trips/getTrip',
  async (id, thunkAPI) => {
    // I am not sending any data
    try {
      return await tripService.getTrip(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//--------------------------------------

//--------------------------------------------------------------

// Create New trip
export const createTrip = createAsyncThunk(
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

//---------------------------------------------------------------------------------------------------------------------

// Delete a Trip
export const deleteTrip = createAsyncThunk(
  'trips/delete',
  async (id, thunkAPI) => {
    // I am not sending any data
    try {
      return await tripService.deleteTrip(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//------------------------------------------------------------------------------------

// Update trip
export const updateTrip = createAsyncThunk(
  'trips/updateTrip',
  async ({ id, formData }, thunkAPI) => {
    try {
      return await tripService.updateTrip(id, formData);
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
      .addCase(createTrip.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.trips.push(action.payload);
        toast.success('trip added successfuly!', {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .addCase(createTrip.rejected, (state, action) => {
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
        const { data, paging, popularDepartureTrips, popularReturnTrips } =
          action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.trips = data;
        state.tripPaging = paging;
        state.tripPageNumber = paging.page;
        state.popularDepartureTrips = popularDepartureTrips;
        state.popularReturnTrips = popularReturnTrips;
        state.tripNumberOfPages = paging.numberOfPages;
      })
      .addCase(getTrips.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload, {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .addCase(deleteTrip.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success('Trip deleted successfully !', {
          position: toast.POSITION.TOP_CENTER,
          toastId: 'TripSuccessDelete1',
        });
      })
      .addCase(deleteTrip.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload, {
          position: toast.POSITION.TOP_CENTER,
        });
      })

      .addCase(getTrip.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.trip = action.payload;
      })
      .addCase(getTrip.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload, {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .addCase(updateTrip.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success('Trip updated successfully', {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .addCase(updateTrip.rejected, (state, action) => {
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
