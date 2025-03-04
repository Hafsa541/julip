'use client';

import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

const initialState = {
  data: {},
  loading: false,
  error: null,
  message: '',
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setProfileData: (state, action) => {
      state.data = action.payload;
    },
    setProfileName: (state, action) => {
      state.data.profileName = action.payload;
    },
    setProfileBio: (state, action) => {
      state.data.bio = action.payload;
    },
    setProfileImage: (state, action) => {
      state.data.image = action.payload;
    },
    setProfileImageStyle: (state, action) => {
      state.data.imageStyle = action.payload;
    },
    setProfileSocialLinks: (state, action) => {
      state.data.socialLinks = action.payload;
    },
    setProfileWebLinks: (state, action) => {
      state.data.webLinks = action.payload;
    },

    resetProfileData: (state) => {
      state.data = {};
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle getProfile API states
    builder
      .addMatcher(apiSlice.endpoints.getProfile.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(apiSlice.endpoints.getProfile.matchFulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.data;
        state.message = action.payload?.message;
      })
      .addMatcher(apiSlice.endpoints.getProfile.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to fetch profile';
      });

    // Handle updateProfile API states
    builder
      .addMatcher(apiSlice.endpoints.updateProfile.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(apiSlice.endpoints.updateProfile.matchFulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addMatcher(apiSlice.endpoints.updateProfile.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to update profile';
      });
  },
});

export const {
  setLoading,
  setError,
  setProfileData,
  resetProfileData,
  setProfileName,
  setProfileBio,
  setProfileImage,
  setProfileImageStyle,
  setProfileSocialLinks,
  setProfileWebLinks,
} = profileSlice.actions;

export default profileSlice.reducer;
