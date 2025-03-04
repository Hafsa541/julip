import axios from 'axios';
// config
import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

export const postFetcher = async (args) => {
  const [url, payload, config] = Array.isArray(args) ? args : [args];
  const res = await axiosInstance.post(url, payload, {
    ...config,
  });
  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    me: '/api/user/user-details',
    login: '/api/auth/sign-in',
    register: '/api/auth/sign-up',
    verify: '/api/auth/verify-email',
    resendCode: '/api/auth/get-code',
    forgotPassword: '/api/auth/forgot-password-link',
    resetPassword: '/api/auth/reset-password',
    signOut: '/api/auth/sign-out',
    createSlug: '/api/auth/create-slug',
  },
  profile: {
    create: '/api/profile/profile-create',
    get: '/api/profile/get-profile',
    update: '/api/profile/profile-update',
  },
  template: {
    details: `/api/template`,
    predefined: '/api/template/predifined-list',
    update: '/api/template/update-template',
    list: '/api/template/list',
    select: (id) => `/api/template/select/${id}`,
  },
  pricing: {
    select: `/api/pricing/select`,
  },
  shop: {
    scrapeAmazon: `/api/scrape/amazon`,
    scrapeWalmart: `/api/scrape/walmart`,
    scrapeShopify: `/api/scrape/shopify`,
    getShop: `/api/shop/get-shop`,
    getCollections: `/api/shop/get-collection`,
    createCollection: `/api/shop/create-collection`,
    updateSingleProductCollection: `/api/shop/update-single-product-collection`,
    updateCollection: `/api/shop/update-collection`,
  },
  product: {
    createProduct: `/api/product/create-product`,
  },
  live: {
    preview: '/api/live/get-detailed-template',
  },
};
