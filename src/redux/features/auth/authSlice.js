import { createSlice } from '@reduxjs/toolkit';

const name = JSON.parse(localStorage.getItem('name'));

const initialState = {
  isLoggedIn: false,
  name: name ? name : '',
  user: {
    name: '',
    username: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setName: (state, action) => {
      localStorage.setItem('name', JSON.stringify(action.payload));
      state.name = action.payload;
    },

    setUser: (state, action) => {
      const profile = action.payload;
      state.user.name = profile.name;
      state.user.username = profile.username;
    },
  },
});

export const { setLogin, setName, setUser } = authSlice.actions;
export const selectUserInfo = (store) => store.auth;
export default authSlice.reducer;
