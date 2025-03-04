'use client';

// app/slices/authSlice.js

import { createSlice } from '@reduxjs/toolkit';
// import { apiSlice } from './apiSlice';

const initialState = {
  user: null,
  tokens: null,
  loading: false, // Local loading state ..
  error: null,
};

// Define the state slice //
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setAuth: (state, action) => {
      console.log('action.payload', action.payload);
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
    },
    resetAuth: (state) => {
      state.user = null;
      state.tokens = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setTokens: (state, action) => {
      state.tokens = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
    removeTokens: (state) => {
      state.tokens = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setUser,
  setTokens,
  removeUser,
  removeTokens,
  setAuth,
  resetAuth,
} = authSlice.actions;

export default authSlice.reducer;
