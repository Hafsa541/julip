'use client';

import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

const initialState = {
  data: {},
  loading: false,
  error: null,
};
export const previewSlice = createSlice({
  name: 'preview',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle getUserDetails API states
    builder
      .addMatcher(apiSlice.endpoints.getUserDetails.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(apiSlice.endpoints.getUserDetails.matchFulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addMatcher(apiSlice.endpoints.getUserDetails.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to update template';
      });
  },
});

export const { setLoading, setError } = previewSlice.actions;

export default previewSlice.reducer;
