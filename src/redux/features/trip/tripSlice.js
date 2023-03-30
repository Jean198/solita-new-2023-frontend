import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import tripService from '../../../services/tripService';

const initialState = {
  trip: null,
  trips: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
};

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
  reducers: {},

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
      });
  },
});

export const selecttripInfo = (store) => store.trip;
export default tripSlice.reducer;
