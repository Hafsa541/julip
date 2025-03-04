'use client';

import React, { useEffect, useMemo } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import { Box, Stack, Typography } from '@mui/material';

import { useGetShopQuery } from 'src/app/redux/slices/apiSlice';
import { useSelector } from 'src/app/redux/store';
import FormProvider from 'src/components/hook-form';
import PinnedLinks from './PinnedLinks/page-featured-pinned-links';
import PageCollection from './Collection/page-featured-collection';

export default function ShopView() {
  const { data: shopData } = useGetShopQuery('draft');
  const collectionsList = useSelector((state) => state.shop.collections);
  console.log('shopData', shopData);
  // -------------- YUP Starts ---------------------------------------------
  const ShopSchema = Yup.object().shape({
    collections: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Collection name is required'), // Ensure collection name is required
        products: Yup.array(),
        visibility: Yup.boolean(),
      })
    ),
    pinnedProducts: Yup.object().shape({
      name: Yup.string(),
      productsList: Yup.array(),
      visibility: Yup.boolean(),
    }),
    visibility: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      collections: [],
      pinnedProducts: {
        name: '',
        productsList: [],
      },
      visibility: true,
    }),
    []
  );
  const methods = useForm({
    resolver: yupResolver(ShopSchema),
    defaultValues,
  });
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset({
      collections: collectionsList,
      pinnedProducts: {
        name: '',
        productsList: [],
      },
      visibility: true,
    });
  }, [collectionsList, reset]);

  const onSubmit = handleSubmit((data) => {
    try {
      console.log('data:', data);
    } catch (error) {
      console.error(error);
    }
  });

  // -------------- YUP Ends ---------------------------------------------

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={1.5} sx={{ backgroundColor: '#E7E7E74D', p: 3, borderRadius: 2 }}>
        <PageCollection />
        <PinnedLinks />
      </Stack>

      <Box
        sx={{
          mx: 5,
          display: 'flex',
          justifyContent: 'right',
        }}
      >
        <LoadingButton
          type="submit"
          // onClick={() => onSubmit('published')}
          variant="contained"
          color="secondary"
          // isLoading={isSubmitting}
          sx={{
            color: 'black',
            border: '1px solid black',
            my: 2,
            p: 1.25,
            px: 5,
          }}
        >
          <Typography fontWeight={700} fontSize={16}>
            Publish
          </Typography>
        </LoadingButton>
      </Box>
    </FormProvider>
  );
}
