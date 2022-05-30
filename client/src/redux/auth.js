import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as usersApi from '../api/users';

export const registerUser = createAsyncThunk('auth/register', usersApi.registerUser);
export const loginUser = createAsyncThunk('auth/login', usersApi.loginUser);

const authPending = state => {
  state.isLoading = true;
}

const authFulfilled = (state, action) => {
  localStorage.setItem('user', JSON.stringify(action.payload))
  state.user = action.payload;
  state.errorMessage = state.isLoading = false;
}

const authRejected = (state, action) => {
  state.errorMessage = action.error.message;
  state.isLoading = false;
}

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
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    }
  },
  extraReducers: {
    [registerUser.pending]: authPending,
    [registerUser.fulfilled]: authFulfilled,
    [registerUser.rejected]: authRejected,
    [loginUser.pending]: authPending,
    [loginUser.fulfilled]: authFulfilled,
    [loginUser.rejected]: authRejected
  }
});

export const { logoutUser, resetErrorMessage, setErrorMessage } = authSlice.actions;

export default authSlice.reducer;