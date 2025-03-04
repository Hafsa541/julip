'use client';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { dispatch, useSelector } from 'src/app/redux/store';
import Iconify from 'src/components/iconify';
import { setPinnedProductsList } from 'src/app/redux/slices/shopSlice';
import { setProductList } from 'src/app/redux/slices/productSlice';

const AddPinnedProductDialog = ({ dialog }) => {
  const collectionsList = useSelector((state) => state.shop.collections);
  const allProductList = useSelector((state) => state.product.list);

  // -------------YUP-------------------
  const AddPinnedProductsSchema = Yup.object().shape({
    productName: Yup.string().optional(),
    products: Yup.array().optional(),
    pinnedProductsList: Yup.array().optional(),
    category: Yup.string().optional(),
  });

  const defaultValues = useMemo(
    () => ({
      productName: '',
      pinnedProductsList: allProductList.map((item) => item.pinned),
      products: allProductList,
      category: '',
    }),
    [allProductList]
  );
  const methods = useForm({
    resolver: yupResolver(AddPinnedProductsSchema),
    defaultValues,
  });
  const { handleSubmit, watch, setValue } = methods;
  const searchQuery = watch('productName', '');

  // Filter products based on search input
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return allProductList;
    return allProductList.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, allProductList]);

  const onSubmit = handleSubmit((data) => {
    try {
      console.log('data:', data);
      dispatch(setPinnedProductsList(data.pinnedProductsList));
      dialog.onFalse();
    } catch (error) {
      console.error(error);
    }
  });

  // ---------------------------------------------------

  const handleTogglePin = (product) => {
    const updatedList = allProductList.map((item) => {
      if (item._id === product._id) {
        return { ...item, pinned: !item.pinned };
      }
      return item;
    });
    dispatch(setProductList(updatedList));
  };

  useEffect(() => {
    let updatedList = allProductList.filter((item) => item.pinned);
    updatedList = updatedList.map((item) => ({ ...item, visibility: true }));
    setValue('pinnedProductsList', updatedList);
  }, [allProductList, setValue]);

  return (
    <Dialog
      open={dialog.value}
      onClose={dialog.onFalse}
      sx={{
        '& .MuiPaper-root.MuiPaper-elevation ': {
          minWidth: 1000,
        },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Box minWidth={550}>
          <DialogTitle sx={{ ml: 1 }}>
            <Typography fontSize={24} fontWeight={700} color="black" align="left">
              Add Pinned product
            </Typography>
          </DialogTitle>

          {/* Content */}
          <DialogContent>
            {/* Top Bar */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {/* Searchbar */}
              <Box sx={{ flex: 4, position: 'relative' }}>
                <Iconify
                  icon="tabler:search"
                  sx={{ position: 'absolute', top: 20, left: 20, width: 16, height: 16 }}
                />
                <RHFTextField
                  name="productName"
                  placeholder="Search product by name"
                  sx={{
                    borderRadius: 100,
                    '& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth.MuiInputBase-formControl':
                      {
                        borderRadius: '100px',
                      },
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                      pl: '7%',
                      fontWeight: 500,
                      fontSize: 16,
                    },
                  }}
                />
              </Box>

              {/* Category selection */}
              <Box sx={{ flex: 1 }}>
                <RHFSelect
                  name="category"
                  placeholder="Category"
                  sx={{
                    width: '100%',
                    border: 'none',
                    '& fieldset': {
                      border: 'none',
                    },
                  }}
                >
                  {collectionsList.map((collection) => (
                    <MenuItem key={collection._id} value={collection.name}>
                      <Typography color="black" fontSize={15} fontWeight={500}>
                        {collection.name}
                      </Typography>
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Box>
            </Box>

            {/* Products Display */}
            <Grid container width="100%" m="auto">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Grid
                    item
                    xs={12}
                    sm={3}
                    md={3}
                    lg={3}
                    key={product._id}
                    sx={{
                      mt: 5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        border: '1px solid #ccc',
                        borderRadius: 1,
                        width: '85%',
                        height: 220,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        py: 2,
                        px: 3,
                        position: 'relative',
                      }}
                    >
                      {/* Pin Icon */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -10,
                          right: -7,
                          backgroundColor: 'white',
                          width: 36,
                          height: 36,
                          border: '1px solid #ccc',
                          borderRadius: 100,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleTogglePin(product)}
                      >
                        {product.pinned ? (
                          <Iconify icon="fluent-mdl2:unpin" />
                        ) : (
                          <img
                            src="/assets/pages/Pin.svg"
                            alt="pin"
                            style={{
                              transform: 'scaleX(-1)',
                              objectFit: 'contain',
                              width: 20,
                              height: 20,
                            }}
                          />
                        )}
                      </Box>

                      {/* Product Image */}
                      <Box minWidth="100%" sx={{ aspectRatio: '1:1' }}>
                        <img
                          src={product?.image}
                          alt={product?.title}
                          style={{ aspectRatio: '1:1' }}
                        />
                      </Box>

                      <Box sx={{ width: '100%', p: 0 }}>
                        <Typography fontSize={18} fontWeight={700} color="black" align="center">
                          {product?.title}
                        </Typography>
                        <Typography fontSize={16} fontWeight={500} color="black" align="center">
                          {product?.brandName}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))
              ) : (
                <Typography
                  fontSize={18}
                  fontWeight={700}
                  color="gray"
                  align="center"
                  width="100%"
                  mt={5}
                >
                  No products found
                </Typography>
              )}
            </Grid>
          </DialogContent>

          {/* Buttons */}
          <DialogActions>
            <Button onClick={dialog.onFalse} variant="text">
              <Typography fontSize={18} fontWeight={700} color="black">
                Cancel
              </Typography>
            </Button>
            <Button
              type="button"
              onClick={onSubmit}
              variant="contained"
              color="secondary"
              sx={{
                color: 'black',
                px: 3,
                py: 1,
                border: '1px solid black',
              }}
            >
              <Typography fontSize={18} fontWeight={700}>
                Save
              </Typography>
            </Button>
          </DialogActions>
        </Box>
      </FormProvider>
    </Dialog>
  );
};

export default AddPinnedProductDialog;
AddPinnedProductDialog.propTypes = {
  dialog: PropTypes.object,
};
