'use client';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { endpoints } from 'src/utils/axios';
// comment
const getAuthToken = () => sessionStorage.getItem('accessToken');

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_HOST_API,
    prepareHeaders: (headers) => {
      const token = getAuthToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`); // Fix syntax
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // * POST(DEMO) - ROUTES
    createPost: builder.mutation({
      query: (newPost) => ({
        url: '/posts',
        method: 'POST',
        body: newPost,
      }),
    }),
    getPosts: builder.query({
      query: () => '/posts',
    }),
    updatePost: builder.mutation({
      query: ({ id, updatedPost }) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body: updatedPost,
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
    }),
    // * POST(DEMO) - ROUTES

    // ? Work starts here
    // * PROFILE - ROUTES
    getProfile: builder.query({
      query: () => `${endpoints.profile.get}`, // Replace with your actual profile endpoint
    }),
    updateProfile: builder.mutation({
      query: ({ query, data }) => ({
        url: `${endpoints.profile.update}?version=${query}`, // Replace with your actual profile endpoint
        method: 'PUT',
        body: data,
      }),
    }),
    // * PROFILE - ROUTES END

    // * TEMPLATES - ROUTES
    getPredefinedTemplates: builder.query({
      query: () => endpoints.template.predefined,
    }),
    getTemplateDetails: builder.query({
      query: () => endpoints.template.details,
    }),
    updateTemplate: builder.mutation({
      query: ({ query, data }) => ({
        url: `${endpoints.template.update}?version=${query}`,
        method: 'PUT',
        body: data,
      }),
    }),
    // * TEMPLATES - ROUTES END

    // * SHOP - ROUTES
    scrapeAmazon: builder.mutation({
      query: ({ query, data }) => ({
        url: `${endpoints.shop.scrapeAmazon}`,
        method: 'POST',
        body: data,
      }),
    }),
    scrapeWalmart: builder.mutation({
      query: ({ query, data }) => ({
        url: `${endpoints.shop.scrapeWalmart}`,
        method: 'POST',
        body: data,
      }),
    }),
    scrapeShopify: builder.mutation({
      query: ({ query, data }) => ({
        url: `${endpoints.shop.scrapeShopify}`,
        method: 'POST',
        body: data,
      }),
    }),

    getShop: builder.query({
      query: (type) => `${endpoints.shop.getShop}?version=${type}`, // Replace with your actual profile endpoint
    }),
    getCollections: builder.query({
      query: (type) => `${endpoints.shop.getCollections}?version=${type}`, // Replace with your actual profile endpoint
    }),
    createCollection: builder.mutation({
      query: ({ query, data }) => ({
        url: `${endpoints.shop.createCollection}?version=${query}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateSingleProductCollection: builder.mutation({
      query: ({ query, collectionName, data }) => ({
        url: `${endpoints.shop.updateSingleProductCollection}?version=${query}&collectionName=${collectionName}`,
        method: 'PUT',
        body: data,
      }),
    }),
    updateCollection: builder.mutation({
      query: ({ query, collectionName, data }) => ({
        url: `${endpoints.shop.updateCollection}?version=${query}&collectionName=${collectionName}`,
        method: 'POST',
        body: data,
      }),
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: `${endpoints.product.createProduct}`,
        method: 'POST',
        body: data,
      }),
    }),

    // * SHOP - ROUTES END

    // * GET USER DETAILS LIVE - ROUTES
    getUserDetails: builder.mutation({
      query: (data) => ({
        url: `${endpoints.live.preview}`,
        method: 'POST',
        body: data,
      }),
    }),
    // * GET USER DETAILS LIVE - ROUTES END
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  // * PROFILE - ROUTES
  useGetProfileQuery,
  useUpdateProfileMutation,
  // * PROFILE - ROUTES END

  // * TEMPLATES - ROUTES
  useGetPredefinedTemplatesQuery,
  useGetTemplateDetailsQuery,
  useUpdateTemplateMutation,
  // * TEMPLATES - ROUTES END

  // * GET USER DETAILS LIVE - ROUTES
  useGetUserDetailsMutation,
  // * GET USER DETAILS LIVE - ROUTES

  // * SHOP - ROUTES
  useScrapeAmazonMutation,
  useScrapeWalmartMutation,
  useScrapeShopifyMutation,

  useGetShopQuery,
  useCreateProductMutation,
  useGetCollectionsQuery,
  useCreateCollectionMutation,
  useUpdateSingleProductCollectionMutation,
  useUpdateCollectionMutation,

  // * SHOP - ROUTES
} = apiSlice;
