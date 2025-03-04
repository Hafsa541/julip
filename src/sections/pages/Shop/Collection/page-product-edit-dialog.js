import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Dialog,
  Container,
  MenuItem,
  Stack,
} from '@mui/material';

import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';

import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';

const PageProductEditDialog = ({ dialog, product, handleEditProduct }) => {
  // ----------------------------- YUP Start--------------------------------------------------

  const ProductSchema = Yup.object().shape({
    _id: Yup.string(),
    url: Yup.string().url('Must be a valid URL').required('URL is required'),
    brandName: Yup.string().required('Brand Name is required'),
    title: Yup.string().required('Title is required'),
    price: Yup.number().required('Price is required'),
    currency: Yup.string()
      .oneOf(['USD', 'EUR', 'GBP', 'JPY'], 'Invalid currency')
      .required('Currency is required'),
    image: Yup.mixed()
      .test('isValidImage', 'Product image must be a valid URL or a valid file', (value) => {
        if (!value) return false;
        if (typeof value === 'string') {
          return /^(https?:\/\/[\w\d./%-]+\.(?:jpg|jpeg|png|gif))$/i.test(value);
        }
        if (value instanceof File) {
          return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
        }
        return false;
      })
      .required('Product image is required'),
    buttonUrl: Yup.string().optional(),
    buttonTitle: Yup.string().optional(),
    description: Yup.string().required('Description is required'),
  });

  const defaultValues = useMemo(
    () => ({
      _id: product?._id || '',
      url: product?.url || '',
      brandName: product?.brandName || '',
      title: product?.title || '',
      price: product?.price || 0,
      currency: product?.currency || 'USD', // Added currency default value
      image: product?.image || '',
      buttonTitle: product?.buttonTitle || '',
      buttonUrl: product?.buttonUrl || '',
      description: product?.description || '',
    }),
    [product]
  );

  const methods = useForm({
    resolver: yupResolver(ProductSchema),
    defaultValues,
  });
  const { handleSubmit, watch, setValue } = methods;
  const onSubmit = handleSubmit((data) => {
    console.log('Form submission data:', data);
    try {
      handleEditProduct(data);
      dialog.onFalse();
    } catch (err) {
      console.error(err);
    }
  });

  // -------------------------------- YUP - END ---------------------------------------

  const { buttonTitle } = watch();

  // ------------------- Image Handling Work -----------------
  const [imagePreview, setImagePreview] = useState(
    product?.image instanceof File ? URL.createObjectURL(product.image) : product?.image || null
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue('image', file);
    }
  };
  // ---------------------------------------------------------

  return (
    <Dialog open={dialog.value} onClose={dialog.onFalse}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Box minWidth={550}>
          <DialogTitle sx={{ ml: 1 }}>
            <Typography fontSize={24} fontWeight={700} color="black" align="left">
              Edit your product
            </Typography>
          </DialogTitle>
          <DialogContent sx={{ color: 'text.secondary', width: 560 }}>
            <Container disableGutters sx={{ px: 1 }}>
              <Typography fontSize={15} fontWeight={500} color="black">
                URL
              </Typography>
              <RHFTextField
                disabled
                name="url"
                sx={{
                  backgroundColor: 'white',
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    fontSize: 17,
                    fontWeight: 500,
                    color: 'black',
                  },
                }}
                placeholder="Paste product URL here"
              />

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mt: 2,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Stack
                    direction="column"
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Typography color="black" fontSize={15} fontWeight={500}>
                      Link Image
                    </Typography>
                    <Box>
                      <Box
                        component="img"
                        sx={{
                          height: 160,
                          width: 160,
                          border: '1px solid #ccc',
                          borderRadius: 1,
                        }}
                        alt="Uploaded Image"
                        name="linkImage"
                        src={imagePreview}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <img src="/assets/icons/Replace.svg" alt="replace" />
                      <Button component="label" sx={{ color: 'black' }}>
                        Replace an Image
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={handleImageChange}
                          // key={imageState ? imageState.name : 'reset'}
                        />
                      </Button>
                    </Box>
                  </Stack>
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    position: 'relative',
                    bottom: 5,
                    gap: 1.25,
                  }}
                >
                  <Box width="100%">
                    <Typography color="black" fontSize={15} fontWeight={500}>
                      Brand
                    </Typography>
                    <RHFTextField
                      name="brandName"
                      sx={{
                        backgroundColor: 'white',
                        '& .MuiInputBase-input.MuiOutlinedInput-input': {
                          fontSize: 15,
                          fontWeight: 500,
                          color: 'black',
                        },
                      }}
                      placeholder="Brand name here"
                    />
                  </Box>

                  <Box width="100%">
                    <Typography color="black" fontSize={15} fontWeight={500}>
                      Price
                    </Typography>
                    <Box
                      width="100%"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid #CFCFCF',
                        borderRadius: 1,
                        backgroundColor: 'white',
                      }}
                    >
                      <RHFTextField
                        name="price"
                        type="number"
                        placeholder="Enter Price"
                        sx={{
                          flex: 1,
                          border: 'none',

                          '& fieldset': {
                            border: 'none',
                          },
                          '& .MuiInputBase-input.MuiOutlinedInput-input': {
                            fontSize: 15,
                            fontWeight: 500,
                            color: 'black',
                          },
                        }}
                      />

                      <RHFSelect
                        name="currency"
                        sx={{
                          width: '30%',
                          border: 'none',
                          '& fieldset': {
                            border: 'none',
                          },
                        }}
                      >
                        <MenuItem value="USD">
                          <Typography color="black" fontSize={15} fontWeight={500}>
                            USD
                          </Typography>
                        </MenuItem>
                        <MenuItem value="EUR">
                          <Typography color="black" fontSize={15} fontWeight={500}>
                            EUR
                          </Typography>
                        </MenuItem>
                        <MenuItem value="GBP">
                          <Typography color="black" fontSize={15} fontWeight={500}>
                            GBP
                          </Typography>
                        </MenuItem>
                        <MenuItem value="JPY">
                          <Typography color="black" fontSize={15} fontWeight={500}>
                            JPY
                          </Typography>
                        </MenuItem>
                      </RHFSelect>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ position: 'relative', mt: 2 }}>
                <Typography color="black" fontSize={15} fontWeight={500}>
                  Title
                </Typography>
                <RHFTextField
                  name="title"
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '1rem',
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                      fontSize: 15,
                      fontWeight: 500,
                      color: 'black',
                    },
                  }}
                  placeholder="Enter Title"
                />
              </Box>

              <Box sx={{ position: 'relative', mt: 2 }}>
                <Typography color="black" fontSize={15} fontWeight={500}>
                  Description
                </Typography>
                <RHFTextField
                  name="description"
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '1rem',
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                      fontSize: 15,
                      fontWeight: 500,
                      color: 'black',
                    },
                  }}
                  placeholder="Enter Description"
                  multiline
                  fullWidth
                  rows={4}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography color="black" fontSize={15} fontWeight={500}>
                  Button Url(optional)
                </Typography>
                <RHFTextField
                  name="buttonUrl"
                  sx={{
                    backgroundColor: 'white',
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                      fontSize: 15,
                      fontWeight: 500,
                      color: 'black',
                    },
                  }}
                  placeholder="Add Button URL here"
                />
              </Box>

              <Box sx={{ position: 'relative', mt: 2 }}>
                <Typography color="black" fontSize={15} fontWeight={500}>
                  Button Title(optional)
                </Typography>
                <RHFTextField
                  name="buttonTitle"
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '1rem',
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                      fontSize: 15,
                      fontWeight: 500,
                      color: 'black',
                    },
                  }}
                  placeholder="Add Button Title here"
                  inputProps={{ maxLength: 20 }}
                />
                <Typography
                  variant="body2"
                  fontSize={12}
                  sx={{ position: 'absolute', right: 10, bottom: 5 }}
                >
                  {buttonTitle?.length || 0}/20
                </Typography>
              </Box>
            </Container>
          </DialogContent>
          <DialogActions>
            <Button variant="text" onClick={dialog.onFalse}>
              <Typography fontSize={18} fontWeight={700} color="black">
                Cancel
              </Typography>
            </Button>
            <Button
              type="submit"
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
                Edit
              </Typography>
            </Button>
          </DialogActions>
        </Box>
      </FormProvider>
    </Dialog>
  );
};

export default PageProductEditDialog;
PageProductEditDialog.propTypes = {
  dialog: PropTypes.object,
  product: PropTypes.object,
  handleEditProduct: PropTypes.func,
};
