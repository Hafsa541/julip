'use client';

import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

// const initialState = {
//   data: {
//     colors: {
//       dark: {
//         main: '#FFFEFF',
//         background: '#440C17',
//         buttons: '#F4EBD5',
//       },
//       light: {
//         main: '#FFF',
//         background: '#F4EBD5',
//         buttons: '#440C17',
//       },
//     },
//     fonts: {
//       header: 'CabinetGrotesk-Variable',
//       body: 'CabinetGrotesk-Variable',
//     },
//     _id: '677be1792598ba973ec645b6', // skip
//     name: 'Water',
//     mode: 'light',
//   },
//   predefinedTemplates: [],
//   loading: false,
//   error: null,
// };

const initialState = {
  data: {},
  predefinedTemplates: [],
  loading: false,
  error: null,
};
export const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setTemplateData: (state, action) => {
      state.data = action.payload;
    },
    setTemplateMode: (state, action) => {
      state.data.mode = action.payload;
    },
    resetTemplateData: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle getPredefinedTemplates API states
    builder
      .addMatcher(apiSlice.endpoints.getPredefinedTemplates.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(apiSlice.endpoints.getPredefinedTemplates.matchFulfilled, (state, action) => {
        state.loading = false;
        state.predefinedTemplates = action.payload.data;
      })
      .addMatcher(apiSlice.endpoints.getPredefinedTemplates.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to fetch predefined templates';
      });

    // Handle getTemplateDetails API states
    builder
      .addMatcher(apiSlice.endpoints.getTemplateDetails.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(apiSlice.endpoints.getTemplateDetails.matchFulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addMatcher(apiSlice.endpoints.getTemplateDetails.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to fetch template details';
      });

    // Handle updateTemplate API states
    builder
      .addMatcher(apiSlice.endpoints.updateTemplate.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(apiSlice.endpoints.updateTemplate.matchFulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addMatcher(apiSlice.endpoints.updateTemplate.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to update template';
      });
  },
});

export const { setLoading, setError, resetTemplateData, setTemplateData, setTemplateMode } =
  templateSlice.actions;

export default templateSlice.reducer;
