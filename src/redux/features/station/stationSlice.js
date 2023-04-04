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

// get all stations
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

//----------------------------------------------------------------------------------------------

// get a single a trip
export const getStation = createAsyncThunk(
  'stations/getStation',
  async (id, thunkAPI) => {
    // I am not sending any data
    try {
      return await stationService.getStation(id);
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

// Create New station
export const createStation = createAsyncThunk(
  'stations/create',
  async (formData, thunkAPI) => {
    try {
      return await stationService.createStation(formData);
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

//-----------------------------------------------------------------------------------------------------------

// Delete a station
export const deleteStation = createAsyncThunk(
  'stations/delete',
  async (id, thunkAPI) => {
    // I am not sending any data
    try {
      return await stationService.deleteStation(id);
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

//---------------------------------------------------------------------------------------------------------------

// Update station
export const updateStation = createAsyncThunk(
  'stations/updateStation',
  async ({ id, formData }, thunkAPI) => {
    try {
      return await stationService.updateStation(id, formData);
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
      .addCase(createStation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.stations.push(action.payload);
        toast.success('station added successfuly!', {
          position: toast.POSITION.TOP_CENTER,
          toastId: 'stationSuccessAdded1',
        });
      })
      .addCase(createStation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload, {
          position: toast.POSITION.TOP_CENTER,
          toastId: 'stationReject1',
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
      })
      .addCase(deleteStation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success('Station deleted successfully !', {
          position: toast.POSITION.TOP_CENTER,
          toastId: 'stationSuccessDelete1',
        });
      })
      .addCase(deleteStation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload, {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .addCase(getStation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.station = action.payload;
      })
      .addCase(getStation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload, {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .addCase(updateStation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success('Station updated successfully', {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .addCase(updateStation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});
export const { setPageNumber } = stationSlice.actions;

export const selectStationInfo = (store) => store.station;

export default stationSlice.reducer;
