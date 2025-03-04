'use client';

import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

const initialState = {
  details: {},
  list: [
    {
      _id: '11',
      url: 'https://www.amazon.com/Self-Locking-Automatic-Gravity-Wooden-Resistance/dp/B08MYBQ9Q3/?_encoding=UTF8&pd_rd_w=8xm7D&content-id=amzn1.sym.d6aaa73e-4455-44fa-88a3-6e1ae26769ee&pf_rd_p=d6aaa73e-4455-44fa-88a3-6e1ae26769ee&pf_rd_r=GVWEWYC8A1Q3NT8SB2DT&pd_rd_wg=ixrH4&pd_rd_r=3aedbcbe-09a2-4994-8855-76403b8ab2c4&ref_=pd_hp_d_btf_exports_top_sellers_unrec',
      brandName: 'A.',
      price: 123,
      currency: 'USD',
      image: 'https://m.media-amazon.com/images/I/61JbzM+aWzL._AC_SY300_SX300_.jpg',
      title: 'Product 1',
      description: 'A warm and stylish jacket for winter',
      buttonTitle: 'Get it Yourself!',
      buttonUrl: '',
    },
    {
      _id: '12',
      url: 'https://www.amazon.com/Self-Locking-Automatic-Gravity-Wooden-Resistance/dp/B08MYBQ9Q3/?_encoding=UTF8&pd_rd_w=8xm7D&content-id=amzn1.sym.d6aaa73e-4455-44fa-88a3-6e1ae26769ee&pf_rd_p=d6aaa73e-4455-44fa-88a3-6e1ae26769ee&pf_rd_r=GVWEWYC8A1Q3NT8SB2DT&pd_rd_wg=ixrH4&pd_rd_r=3aedbcbe-09a2-4994-8855-76403b8ab2c4&ref_=pd_hp_d_btf_exports_top_sellers_unrec',
      brandName: 'B.',
      price: 123,
      currency: 'USD',
      image: 'https://m.media-amazon.com/images/I/61JbzM+aWzL._AC_SY300_SX300_.jpg',
      title: 'Product 2',
      description: 'A warm and stylish jacket for winter',
      buttonTitle: 'Get it Yourself!',
      buttonUrl: '',
    },
    {
      _id: '13',
      url: 'https://www.amazon.com/Self-Locking-Automatic-Gravity-Wooden-Resistance/dp/B08MYBQ9Q3/?_encoding=UTF8&pd_rd_w=8xm7D&content-id=amzn1.sym.d6aaa73e-4455-44fa-88a3-6e1ae26769ee&pf_rd_p=d6aaa73e-4455-44fa-88a3-6e1ae26769ee&pf_rd_r=GVWEWYC8A1Q3NT8SB2DT&pd_rd_wg=ixrH4&pd_rd_r=3aedbcbe-09a2-4994-8855-76403b8ab2c4&ref_=pd_hp_d_btf_exports_top_sellers_unrec',
      brandName: 'C.',
      price: 123,
      currency: 'USD',
      image: 'https://m.media-amazon.com/images/I/61JbzM+aWzL._AC_SY300_SX300_.jpg',
      title: 'Product 3',
      description: 'A warm and stylish jacket for winter',
      buttonTitle: 'Get it Yourself!',
      buttonUrl: '',
    },
    {
      _id: '14',
      url: 'https://www.amazon.com/Self-Locking-Automatic-Gravity-Wooden-Resistance/dp/B08MYBQ9Q3/?_encoding=UTF8&pd_rd_w=8xm7D&content-id=amzn1.sym.d6aaa73e-4455-44fa-88a3-6e1ae26769ee&pf_rd_p=d6aaa73e-4455-44fa-88a3-6e1ae26769ee&pf_rd_r=GVWEWYC8A1Q3NT8SB2DT&pd_rd_wg=ixrH4&pd_rd_r=3aedbcbe-09a2-4994-8855-76403b8ab2c4&ref_=pd_hp_d_btf_exports_top_sellers_unrec',
      brandName: 'D.',
      price: 123,
      currency: 'USD',
      image: 'https://m.media-amazon.com/images/I/61JbzM+aWzL._AC_SY300_SX300_.jpg',
      title: 'Product 4',
      description: 'A warm and stylish jacket for winter',
      buttonTitle: 'Get it Yourself!',
      buttonUrl: '',
    },
    //
    {
      _id: '15',
      url: 'https://www.amazon.com/Self-Locking-Automatic-Gravity-Wooden-Resistance/dp/B08MYBQ9Q3/?_encoding=UTF8&pd_rd_w=8xm7D&content-id=amzn1.sym.d6aaa73e-4455-44fa-88a3-6e1ae26769ee&pf_rd_p=d6aaa73e-4455-44fa-88a3-6e1ae26769ee&pf_rd_r=GVWEWYC8A1Q3NT8SB2DT&pd_rd_wg=ixrH4&pd_rd_r=3aedbcbe-09a2-4994-8855-76403b8ab2c4&ref_=pd_hp_d_btf_exports_top_sellers_unrec',
      brandName: 'E.',
      price: 123,
      currency: 'USD',
      image: 'https://m.media-amazon.com/images/I/61JbzM+aWzL._AC_SY300_SX300_.jpg',
      title: 'Product 5',
      description: 'A warm and stylish jacket for winter',
      buttonTitle: 'Get it Yourself!',
      buttonUrl: '',
    },
    {
      _id: '16',
      url: 'https://www.amazon.com/Self-Locking-Automatic-Gravity-Wooden-Resistance/dp/B08MYBQ9Q3/?_encoding=UTF8&pd_rd_w=8xm7D&content-id=amzn1.sym.d6aaa73e-4455-44fa-88a3-6e1ae26769ee&pf_rd_p=d6aaa73e-4455-44fa-88a3-6e1ae26769ee&pf_rd_r=GVWEWYC8A1Q3NT8SB2DT&pd_rd_wg=ixrH4&pd_rd_r=3aedbcbe-09a2-4994-8855-76403b8ab2c4&ref_=pd_hp_d_btf_exports_top_sellers_unrec',
      brandName: 'F.',
      price: 123,
      currency: 'USD',
      image: 'https://m.media-amazon.com/images/I/61JbzM+aWzL._AC_SY300_SX300_.jpg',
      title: 'Product 6',
      description: 'A warm and stylish jacket for winter',
      buttonTitle: 'Get it Yourself!',
      buttonUrl: '',
    },
    {
      _id: '17',
      url: 'https://www.amazon.com/Self-Locking-Automatic-Gravity-Wooden-Resistance/dp/B08MYBQ9Q3/?_encoding=UTF8&pd_rd_w=8xm7D&content-id=amzn1.sym.d6aaa73e-4455-44fa-88a3-6e1ae26769ee&pf_rd_p=d6aaa73e-4455-44fa-88a3-6e1ae26769ee&pf_rd_r=GVWEWYC8A1Q3NT8SB2DT&pd_rd_wg=ixrH4&pd_rd_r=3aedbcbe-09a2-4994-8855-76403b8ab2c4&ref_=pd_hp_d_btf_exports_top_sellers_unrec',
      brandName: 'g.',
      price: 123,
      currency: 'USD',
      image: 'https://m.media-amazon.com/images/I/61JbzM+aWzL._AC_SY300_SX300_.jpg',
      title: 'Product 7',
      description: 'A warm and stylish jacket for winter',
      buttonTitle: 'Get it Yourself!',
      buttonUrl: '',
    },
    {
      _id: '18',
      url: 'https://www.amazon.com/Self-Locking-Automatic-Gravity-Wooden-Resistance/dp/B08MYBQ9Q3/?_encoding=UTF8&pd_rd_w=8xm7D&content-id=amzn1.sym.d6aaa73e-4455-44fa-88a3-6e1ae26769ee&pf_rd_p=d6aaa73e-4455-44fa-88a3-6e1ae26769ee&pf_rd_r=GVWEWYC8A1Q3NT8SB2DT&pd_rd_wg=ixrH4&pd_rd_r=3aedbcbe-09a2-4994-8855-76403b8ab2c4&ref_=pd_hp_d_btf_exports_top_sellers_unrec',
      brandName: 'H.',
      price: 123,
      currency: 'USD',
      image: 'https://m.media-amazon.com/images/I/61JbzM+aWzL._AC_SY300_SX300_.jpg',
      title: 'Product 8',
      description: 'A warm and stylish jacket for winter',
      buttonTitle: 'Get it Yourself!',
      buttonUrl: '',
    },
    {
      _id: '123',
      url: 'https://www.amazon.com/Self-Locking-Automatic-Gravity-Wooden-Resistance/dp/B08MYBQ9Q3/?_encoding=UTF8&pd_rd_w=8xm7D&content-id=amzn1.sym.d6aaa73e-4455-44fa-88a3-6e1ae26769ee&pf_rd_p=d6aaa73e-4455-44fa-88a3-6e1ae26769ee&pf_rd_r=GVWEWYC8A1Q3NT8SB2DT&pd_rd_wg=ixrH4&pd_rd_r=3aedbcbe-09a2-4994-8855-76403b8ab2c4&ref_=pd_hp_d_btf_exports_top_sellers_unrec',
      brandName: 'I.',
      price: 123,
      currency: 'USD',
      image: 'https://m.media-amazon.com/images/I/61JbzM+aWzL._AC_SY300_SX300_.jpg',
      title: 'Product 9',
      description: 'A warm and stylish jacket for winter',
      buttonTitle: 'Get it Yourself!',
      buttonUrl: '',
    },
    {
      _id: '19',
      url: 'https://www.amazon.com/Self-Locking-Automatic-Gravity-Wooden-Resistance/dp/B08MYBQ9Q3/?_encoding=UTF8&pd_rd_w=8xm7D&content-id=amzn1.sym.d6aaa73e-4455-44fa-88a3-6e1ae26769ee&pf_rd_p=d6aaa73e-4455-44fa-88a3-6e1ae26769ee&pf_rd_r=GVWEWYC8A1Q3NT8SB2DT&pd_rd_wg=ixrH4&pd_rd_r=3aedbcbe-09a2-4994-8855-76403b8ab2c4&ref_=pd_hp_d_btf_exports_top_sellers_unrec',
      brandName: 'J.',
      price: 123,
      currency: 'USD',
      image: 'https://m.media-amazon.com/images/I/61JbzM+aWzL._AC_SY300_SX300_.jpg',
      title: 'Product 10',
      description: 'A warm and stylish jacket for winter',
      buttonTitle: 'Get it Yourself!',
      buttonUrl: '',
    },
  ],

  loading: false,
  error: null,
  message: '',
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setProductDetails: (state, action) => {
      state.details = action.payload;
    },
    setProductList: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    // ? Handle createProduct API states
    builder
      .addMatcher(apiSlice.endpoints.createProduct.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(apiSlice.endpoints.createProduct.matchFulfilled, (state, action) => {
        state.loading = false;
        console.log('action.payload?.data', action.payload?.data);
        state.details = action.payload?.data || {};
      })
      .addMatcher(apiSlice.endpoints.createProduct.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to fetch profile';
      });
  },
});

export const { setLoading, setError, setProductDetails, setProductList } = productSlice.actions;

export default productSlice.reducer;
