import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/features/auth/authSlice';
import tripReducer from './features/trip/tripSlice';
import stationReducer from './features/station/stationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trip: tripReducer,
    station: stationReducer,
  },
});
