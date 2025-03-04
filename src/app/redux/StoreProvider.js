'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import store from 'src/app/redux/store';
// import { apiSlice } from './slices/apiSlice';

const StoreProvider = ({ children }) => {
  console.log('store', store.getState());
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;

StoreProvider.propTypes = {
  children: PropTypes.node,
};
