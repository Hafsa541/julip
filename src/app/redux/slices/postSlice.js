'use client';

// app/slices/postSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

// Define the state slice //
export const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [], // state for posts
    loading: false, // Local loading state ..
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle getPosts actions
    builder
      .addMatcher(apiSlice.endpoints.getPosts.matchPending, (state) => {
        state.loading = true;
      })
      .addMatcher(apiSlice.endpoints.getPosts.matchFulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addMatcher(apiSlice.endpoints.getPosts.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle createPost actions
      .addMatcher(apiSlice.endpoints.createPost.matchPending, (state) => {
        state.loading = true;
      })
      .addMatcher(apiSlice.endpoints.createPost.matchFulfilled, (state, action) => {
        state.loading = false;
        console.log('action.payload create', action.payload);
        state.posts = [...state.posts, action.payload];
      })
      .addMatcher(apiSlice.endpoints.createPost.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle updatePost actions (assuming updatePost API is implemented)
      .addMatcher(apiSlice.endpoints.updatePost.matchPending, (state) => {
        state.loading = true;
      })
      .addMatcher(apiSlice.endpoints.updatePost.matchFulfilled, (state, action) => {
        state.loading = false;
        const index = state.posts.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload; // Replace the updated post
        }
      })
      .addMatcher(apiSlice.endpoints.updatePost.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle deletePost actions (assuming deletePost API is implemented)
      .addMatcher(apiSlice.endpoints.deletePost.matchPending, (state) => {
        state.loading = true;
      })
      .addMatcher(apiSlice.endpoints.deletePost.matchFulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post.id !== action.payload.id); // Remove deleted post
      })
      .addMatcher(apiSlice.endpoints.deletePost.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setLoading, setError } = postSlice.actions;

export default postSlice.reducer;
