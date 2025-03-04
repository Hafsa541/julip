/* eslint-disable no-nested-ternary */
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Dialog,
  Container,
} from '@mui/material';

import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import React, { useEffect, useMemo, useState } from 'react';
import { dispatch, useSelector } from 'src/app/redux/store';
import { setProductDetails } from 'src/app/redux/slices/productSlice';

import uuidv4 from 'src/utils/uuidv4';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import {
  useScrapeAmazonMutation,
  useScrapeWalmartMutation,
  useScrapeShopifyMutation,
  useCreateProductMutation,
  useGetCollectionsQuery,
  useCreateCollectionMutation,
  useUpdateCollectionMutation,
  useUpdateSingleProductCollectionMutation,
} from 'src/app/redux/slices/apiSlice';

import { useBoolean } from 'src/hooks/use-boolean';
import { editCollectionProducts } from 'src/app/redux/slices/shopSlice';
import ProductAddNewProductCollection from './page-add-new-product-select-collection';
import ProductAddNewProductDetails from './page-add-new-product-details';

const ProductAddNewProduct = ({ dialog }) => {
  const newProductDetails = useSelector((state) => state.product.details);
  const collectionsList = useSelector((state) => state.shop.collections);
  const [step, setStep] = useState(0);
  const loaderState = useBoolean(false);
  const { enqueueSnackbar } = useSnackbar();

  const [selectedCollectionName, setSelectedCollectionName] = useState(
    collectionsList?.[collectionsList.length - 1]?.name || null
  );
  const [createProduct] = useCreateProductMutation();
  const [updateSingleProductCollection] = useUpdateSingleProductCollectionMutation();
  const { data: collectionData } = useGetCollectionsQuery('draft');
  // console.log('collectionData', collectionData);

  const [scrapeAmazon] = useScrapeAmazonMutation();
  const [scrapeWalmart] = useScrapeWalmartMutation();
  const [scrapeShopify] = useScrapeShopifyMutation();

  // ----------------------------- YUP Start--------------------------------------------------

  const ProductSchema = Yup.object().shape({
    url: Yup.string().url('Must be a valid URL').required('URL is required'),
    brandName: Yup.string().required('Brand Name is required'),
    title: Yup.string().required('Title is required'),
    price: Yup.number().required('Price is required').min(0.01, 'Price must be greater than zero'),
    currency: Yup.string()
      .oneOf(['USD', 'EUR', 'GBP', 'JPY'], 'Invalid currency')
      .required('Currency is required'),
    image: Yup.mixed()
      .nullable()
      .test('isValidImage', 'Product image must be a valid URL or file', (value) => {
        if (!value) return false; // Ensure a value is present
        // Allow if the value is a valid URL
        if (typeof value === 'string') {
          const urlPattern = /^(https?:\/\/[^\s]+)$/; // Simple URL validation
          return urlPattern.test(value);
        }
        // Allow if the value is a file object with an acceptable MIME type
        if (value instanceof File) {
          return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
        }
        return false;
      }),
    buttonUrl: Yup.string().optional(),
    buttonTitle: Yup.string().optional(),
    description: Yup.string().required('Description is required'),
  });

  const productDetails = useSelector((state) => state.product.details);

  const defaultValues = useMemo(
    () => ({
      url: productDetails?.url || '',
      brandName: productDetails?.brandName || '',
      title: productDetails?.title || '',
      price: productDetails?.price
        ? typeof productDetails?.price === 'string'
          ? parseFloat(productDetails?.price.replace('$', '')) // Only run replace if it's a string
          : productDetails?.price // If it's already a number, use it as is
        : 0,

      currency: productDetails?.currency || 'USD', // Added currency default value
      image: productDetails?.image || '',
      buttonTitle: productDetails?.buttonTitle || '',
      buttonUrl: productDetails?.buttonUrl || '',
      description: productDetails?.description || '',
    }),
    [productDetails]
  );

  const methods = useForm({
    resolver: yupResolver(ProductSchema),
    defaultValues,
  });
  const { handleSubmit, reset } = methods;
  useEffect(() => {
    reset({
      url: methods.getValues('url'),
      brandName: productDetails?.brand || '',
      title: productDetails?.title || '',
      price: productDetails?.price
        ? typeof productDetails?.price === 'string'
          ? parseFloat(productDetails?.price.replace('$', '')) // Only run replace if it's a string
          : productDetails?.price // If it's already a number, use it as is
        : 0,
      currency: productDetails?.currency || 'USD', // Added currency default value

      image: productDetails?.image || '',
      buttonTitle: productDetails?.buttonTitle || '',
      description: productDetails?.description || '',
    });
  }, [methods, productDetails, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log('data', data);

      const formData = new FormData();
      const finalData = { ...data };
      if (data?.image instanceof File) {
        formData.append('image', data.image);
        delete finalData.image;
        formData.append('body', JSON.stringify(finalData));
      } else {
        formData.append('body', JSON.stringify(finalData));
      }
      const apiData = await createProduct(formData);
      console.log('apiData', apiData);
      // if(apiData?.data?.data){

      // }
      // data = { ...data, _id: uuidv4() };
      // dispatch(setProductDetails(data));
      setStep(2);
      reset({
        url: '',
        brandName: '',
        title: '',
        price: 0,
        currency: 'USD', // Added currency default value
        image: '',
        buttonTitle: '',
        description: '',
      });
    } catch (err) {
      console.error(err);
    }
  });
  // -------------------------------- YUP - END ---------------------------------------

  // ------------------- Product API Scrapping Work -----------------

  const productScrap = async () => {
    loaderState.onTrue();
    const url = methods.getValues('url'); // Getting the value of 'url' from the form
    let productdetails = null;
    if (url.includes('amazon')) {
      productdetails = await scrapeAmazon({ data: { url } });
    } else if (url.includes('walmart')) {
      productdetails = await scrapeWalmart({ data: { url } });
    } else {
      productdetails = await scrapeShopify({ data: { url } });
    }

    if (productdetails) {
      dispatch(setProductDetails(productdetails?.data?.data));
    }
    loaderState.onFalse();

    setStep(1);
  };
  // ---------------------------------------------------------

  const handleBack = () => {
    if (step - 1 >= 0) {
      setStep(step - 1);
    }
  };

  const handleSelectedCollection = (name) => {
    setSelectedCollectionName(name);
  };
  const addProductToCollection = async () => {
    // Runs on step 2
    if (!selectedCollectionName) {
      enqueueSnackbar('Please choose a collection from the menu or create one', {
        variant: 'info',
      });
      return;
    }
    try {
      loaderState.onTrue();
      console.log('prdouctDetails', newProductDetails);
      console.log('collectionName', selectedCollectionName);
      const finalData = {
        data: {
          newCollectionName: selectedCollectionName,
          products: newProductDetails?._id,
        },
        query: 'draft',
        collectionName: selectedCollectionName,
      };
      console.log('finalData', finalData);

      const res = await updateSingleProductCollection(finalData);
      console.log('res', res);
      if (res?.error) {
        enqueueSnackbar(res?.error?.data?.message || 'Error updating collection', {
          variant: 'error',
        });
        return;
      }
      loaderState.onFalse();
      // TODO:
      // if (selectedCollectionName) {
      //   dispatch(
      //     editCollectionProducts({
      //       collectionName: selectedCollectionName,
      //       updatedProduct: newProductDetails,
      //     })
      //   );
      // }
      setStep(3);
    } catch (error) {
      console.error(error);
      console.log('error', error);
      enqueueSnackbar(error.message || 'Error creating new collection 122', { variant: 'error' });
    }
  };

  return (
    <Dialog open={dialog.value} onClose={dialog.onFalse}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Box minWidth={550}>
          <DialogTitle sx={{ ml: 1 }}>
            <Typography
              fontSize={step === 3 ? 18 : 24}
              fontWeight={step === 3 ? 500 : 700}
              color="black"
              align={step === 3 ? 'center' : 'left'}
            >
              {step === 0 ? 'Add product from link' : step === 3 ? 'Congrats!' : 'Add new product'}
            </Typography>
          </DialogTitle>
          <DialogContent sx={{ color: 'text.secondary', width: 560 }}>
            {(step === 0 || step === 1) && (
              <Container disableGutters sx={{ px: 1 }}>
                <Typography fontSize={15} fontWeight={500} color="black">
                  URL
                </Typography>
                <RHFTextField
                  name="url"
                  placeholder="Paste product URL here"
                  sx={{
                    backgroundColor: 'white',
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                      fontSize: 17,
                      fontWeight: 'medium',
                      color: 'black',
                    },
                  }}
                />
              </Container>
            )}

            {step === 1 && <ProductAddNewProductDetails />}
            {step === 2 && (
              <ProductAddNewProductCollection handleSelectedCollection={handleSelectedCollection} />
            )}
            {step === 3 && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 3,
                  gap: 3,
                }}
              >
                <img
                  src={
                    newProductDetails?.image instanceof File
                      ? URL.createObjectURL(newProductDetails.image)
                      : newProductDetails?.image
                  }
                  alt="product"
                  style={{ margin: 'auto', width: 150, height: 150 }}
                />

                <Typography
                  fontWeight={700}
                  fontSize={24}
                  color="black"
                  align="center"
                  width="100%"
                  sx={{ wordBreak: 'break-word' }}
                >
                  You saved this product to collection &apos;{selectedCollectionName}&apos;
                </Typography>
              </Box>
            )}
          </DialogContent>
          {step < 3 && (
            <DialogActions>
              <Button
                onClick={() => {
                  if (step === 0) dialog?.onFalse();
                  else handleBack();
                }}
                variant="text"
              >
                <Typography fontSize={18} fontWeight={700} color="black">
                  {step === 0 && 'Cancel'}
                  {step === 1 && 'Back'}
                  {step === 2 && 'Back'}
                </Typography>
              </Button>
              <LoadingButton
                type="button"
                loading={loaderState.value}
                onClick={() => {
                  if (step === 0) productScrap();
                  else if (step === 1) onSubmit();
                  else if (step === 2) addProductToCollection();
                }}
                variant="contained"
                color="secondary"
                sx={{
                  color: 'black',
                  px: 3,
                  py: 1,
                  border: '1px solid black',
                  ...(step === 0 && { px: 5 }),
                }}
              >
                <Typography fontSize={18} fontWeight={700}>
                  {step === 0 && 'Next'}
                  {step === 1 && 'Choose collection'}
                  {step === 2 && 'Next'}
                </Typography>
              </LoadingButton>
            </DialogActions>
          )}
        </Box>
      </FormProvider>
    </Dialog>
  );
};

export default ProductAddNewProduct;
ProductAddNewProduct.propTypes = {
  dialog: PropTypes.object,
};
