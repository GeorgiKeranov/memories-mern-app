import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as usersApi from '../api/users';

export const registerUser = createAsyncThunk('auth/register', usersApi.registerUser);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')),
    errorMessage: false,
    isLoading: false
  },
  reducers: {
    logoutUser: state => {
      state.user = null;

      localStorage.removeItem('user');
    },
    resetErrorMessage: state => {
      state.errorMessage = false;
    }
  },
  extraReducers: {
    [registerUser.pending]: state => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      const response = action.payload;
      
      if (response.error) {
        state.errorMessage = response.error;
        state.isLoading = false; 
        return;
      }

      const user = {...response.user, token: response.token};
      localStorage.setItem('user', JSON.stringify(user));
      state.user = response;
      state.errorMessage = state.isLoading = false;
    },
    [registerUser.rejected]: (state, action) => {
      state.errorMessage = action.payload;
      state.isLoading = false; 
    }
  }
});

export const { logoutUser, resetErrorMessage } = authSlice.actions;

export default authSlice.reducer;