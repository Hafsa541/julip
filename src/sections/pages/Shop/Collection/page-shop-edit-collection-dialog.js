'use client';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Stack,
  Typography,
} from '@mui/material';

import { GridAddIcon } from '@mui/x-data-grid';
import { useForm } from 'react-hook-form';
import React, { useEffect, useMemo, useState } from 'react';
import { useBoolean } from 'src/hooks/use-boolean';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { dispatch, useSelector } from 'src/app/redux/store';
import { setCollectionsData } from 'src/app/redux/slices/shopSlice';
import Iconify from 'src/components/iconify';
import ProductAddNewProduct from './product-add-workflow-steps/page-add-new-product';
import PageProductEditDialog from './page-product-edit-dialog';

const PageEditCollectionDialog = ({ selectedCollection, dialog }) => {
  const collectionsList = useSelector((state) => state.shop.collections);
  const [editableCollection, setEditableCollection] = useState(
    collectionsList.find((collection) => collection._id === selectedCollection._id)
  );
  useEffect(() => {
    setEditableCollection(
      collectionsList.find((collection) => collection._id === selectedCollection._id)
    );
  }, [collectionsList, selectedCollection]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const addNewProductDialog = useBoolean(false);
  const editProductDialog = useBoolean(false);

  const [selectedCollectionProducts, setSelectedCollectionProducts] = useState(
    selectedCollection?.products
  );

  // -------------YUP-------------------
  const CollctionSchema = Yup.object().shape({
    name: Yup.string().required('Collection name is required'),
    products: Yup.array(),
    visibility: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      name: selectedCollection?.name || '',
      products: selectedCollection?.products || [],
      visibility: selectedCollection?.visibility || true,
    }),
    [selectedCollection]
  );
  const methods = useForm({
    resolver: yupResolver(CollctionSchema),
    defaultValues,
  });
  const { handleSubmit, getValues, setValue, reset } = methods;
  const values = getValues();

  useEffect(() => {
    reset({
      name: editableCollection?.name || '',
      products: editableCollection?.products || [],
      visibility: editableCollection?.visibility || true,
    });
  }, [editableCollection, reset]);

  const onSubmit = handleSubmit((data) => {
    try {
      console.log('data:', data);

      // Update the collection in the state
      const updatedCollections = collectionsList.map((col) => {
        if (col._id === selectedCollection._id) {
          return { ...col, name: data.name, products: data.products }; // Update the name or other fields
        }
        return col;
      });

      // Dispatch the updated collections to Redux
      dispatch(setCollectionsData(updatedCollections));

      // Close the dialog after saving
      dialog.onFalse();
    } catch (error) {
      console.error(error);
    }
  });

  // ---------------------------------------------------

  const handleDeleteProduct = (productId) => {
    // Filter out the product with the matching _id
    const updatedArray = values.products.filter((product) => product._id !== productId);

    // Update the 'products' field in the form with the filtered list
    setValue('products', updatedArray);
    setSelectedCollectionProducts(updatedArray); // to re-render
  };

  const handleEditProduct = (editedProduct) => {
    // Map over the products list and update the product with the matching _id
    const updatedArray = values.products.map((product) => {
      if (product._id === editedProduct._id) {
        // Update the product with the new data (assuming editedProduct contains the updated product details)
        return { ...product, ...editedProduct };
      }
      return product; // Keep other products unchanged
    });

    // Update the 'products' field in the form with the updated list
    setValue('products', updatedArray);
    setSelectedCollectionProducts(updatedArray); // to re-render
  };

  return (
    <Stack>
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
          <DialogTitle align="left" sx={{ mx: 2 }}>
            <Typography fontWeight={700} fontSize={24} color="black">
              Edit Collection
            </Typography>
          </DialogTitle>
          <DialogContent sx={{ minWidth: 800, mt: -2, mx: 2 }}>
            <Box>
              <Typography color="black" fontSize={15} fontWeight={500} mb={0.75}>
                Collection name
              </Typography>
              <RHFTextField
                name="name"
                defaultValue={selectedCollection?.name || ''} // Default value from editableCollection
                placeholder="Collection name"
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    fontSize: 15,
                    fontWeight: 500,
                    color: 'black',
                  },
                }}
              />
            </Box>

            <Box mt={2}>
              <Typography color="black" fontSize={15} fontWeight={500}>
                Products ({values?.products?.length})
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {values?.products?.map((product, index) => {
                  const isFile = product?.image instanceof File;
                  const imageSrc = isFile ? URL.createObjectURL(product.image) : product?.image;

                  return (
                    <Box
                      key={index}
                      sx={{
                        width: 'calc(25% - 16px)', // 4 items per row with space between them
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        border: '1px solid #ccc',
                        borderRadius: 2,
                        p: 3,
                        position: 'relative', // Allow positioning of the icons
                        '&:hover': {
                          '& .product-actions': {
                            opacity: 1, // Make the icons visible on hover
                          },
                        },
                      }}
                    >
                      <img
                        src={imageSrc}
                        alt="product"
                        style={{ width: 150, height: 150, objectFit: 'cover' }}
                      />

                      {/* Icons for Edit, Delete, and Pin */}
                      <Box
                        className="product-actions"
                        sx={{
                          position: 'absolute',
                          top: '45%',
                          display: 'flex',
                          gap: 1,
                          opacity: 0, // Initially hidden
                          transition: 'opacity 0.3s', // Smooth transition for opacity
                        }}
                      >
                        <Box
                          sx={{
                            backgroundColor: 'white',
                            border: '1px solid #ccc',
                            borderRadius: 1000,
                            width: 42,
                            height: 42,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            '&:hover': {
                              backgroundColor: '#e3e3e3',
                            },
                          }}
                          onClick={() => {
                            setSelectedProduct(product);
                            editProductDialog.onTrue();
                          }}
                        >
                          <img src="/assets/pages/edit.svg" alt="edit" />
                        </Box>

                        <Box
                          sx={{
                            backgroundColor: 'white',
                            border: '1px solid #ccc',
                            borderRadius: 1000,
                            width: 42,
                            height: 42,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            '&:hover': {
                              backgroundColor: '#e3e3e3',
                            },
                          }}
                          onClick={() => {
                            handleDeleteProduct(product._id);
                          }}
                        >
                          {/* <Delete sx={{ color: 'black' }} /> */}
                          <Iconify icon="famicons:trash-outline" />
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box my={3}>
                <Button
                  size="large"
                  mt={2}
                  onClick={() => {
                    addNewProductDialog.onTrue();
                  }}
                >
                  <Fab
                    aria-label="add"
                    size="medium"
                    sx={{
                      boxShadow: 0,
                      backgroundColor: '#DCFFBA',
                      color: 'black',
                      border: '1px solid black',
                      '&:hover': { backgroundColor: '#DCFFBA' },
                    }}
                  >
                    <GridAddIcon />
                  </Fab>

                  <Typography fontSize={18} fontWeight={700} color="black" mx={1}>
                    Add new product
                  </Typography>
                </Button>
              </Box>
            </Box>
          </DialogContent>

          <DialogActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Button
              onClick={dialog.onFalse}
              sx={{ py: 2, px: 6, border: '1px solid black', backgroundColor: 'white' }}
            >
              <Typography fontWeight={700} fontSize={18} color="black">
                Cancel
              </Typography>
            </Button>
            <Button
              type="submit"
              sx={{
                py: 2,
                px: 8,
                border: '1px solid black',
                backgroundColor: '#DCFFBA',
                '&:hover': {
                  backgroundColor: '#DCFFBA',
                },
              }}
            >
              <Typography fontWeight={700} fontSize={18} color="black">
                Save
              </Typography>
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>

      {addNewProductDialog.value && <ProductAddNewProduct dialog={addNewProductDialog} />}
      {editProductDialog.value && (
        <PageProductEditDialog
          dialog={editProductDialog}
          product={selectedProduct}
          selectedCollection={selectedCollection}
          handleEditProduct={handleEditProduct}
        />
      )}
    </Stack>
  );
};

export default PageEditCollectionDialog;
PageEditCollectionDialog.propTypes = {
  selectedCollection: PropTypes.object,
  dialog: PropTypes.object,
};
