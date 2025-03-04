'use client';

// app/store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
import { postSlice } from './slices/postSlice';
import { authSlice } from './slices/authSlice';
import { profileSlice } from './slices/profileSlice';
import { templateSlice } from './slices/templateSlice';
import { previewSlice } from './slices/previewSlice';
import { shopSlice } from './slices/shopSlice';
import { productSlice } from './slices/productSlice';

import { apiSlice } from './slices/apiSlice';

const appReducers = combineReducers({
  post: postSlice.reducer,
  auth: authSlice.reducer,
  profile: profileSlice.reducer,
  template: templateSlice.reducer,
  preview: previewSlice.reducer,
  shop: shopSlice.reducer,
  product: productSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

// Enhance the root reducer to handle a RESET action
const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined; // Reset the state to undefined to trigger initial states of all reducers
  }
  return appReducers(state, action);
};

// Configure the store with both slices
const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware().concat(apiSlice.middleware);
    console.log('middlewares', middlewares);
    return middlewares;
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

const { dispatch } = store;

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export { dispatch, useSelector, useDispatch };
