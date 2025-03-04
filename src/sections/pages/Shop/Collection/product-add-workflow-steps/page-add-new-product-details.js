import { Box, Container, Button, MenuItem, Typography, Stack } from '@mui/material';

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'src/app/redux/store';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';

const ProductAddNewProductDetails = () => {
  const productDetails = useSelector((state) => state.product.details);
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const { title, description, buttonTitle } = watch();

  // ------------------- Image Handling Work -----------------
  const [imageState, setImageState] = useState(null);
  const [imagePreview, setImagePreview] = useState(productDetails?.image || null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageState(file);
      setImagePreview(URL.createObjectURL(file));
      setValue('image', file);
    }
  };
  // ---------------------------------------------------------

  return (
    <Container disableGutters sx={{ px: 1 }}>
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
              {imagePreview ? (
                <Box
                  component="img"
                  sx={{
                    height: 160,
                    width: 160,
                    border: '1px solid #ccc',
                    borderRadius: 1,
                    objectFit: 'contain',
                    p: 2,
                  }}
                  alt="Uploaded Image"
                  name="linkImage"
                  src={imagePreview}
                />
              ) : (
                <Box
                  sx={{
                    height: 160,
                    width: 160,
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f0f0f0',
                  }}
                >
                  <Iconify icon="ep:picture" sx={{ color: '#bbb', width: 65, height: 65 }} />
                </Box>
              )}
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
                  fontSize: 17,
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
                    fontSize: 17,
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

        <Box sx={{ position: 'relative' }}>
          <RHFTextField
            name="title"
            placeholder="Enter Title"
            inputProps={{ maxLength: 30 }}
            sx={{
              backgroundColor: 'white',
              borderRadius: '1rem',
              '& .MuiInputBase-input.MuiOutlinedInput-input': {
                fontSize: 17,
                fontWeight: 500,
                color: 'black',
              },
            }}
          />
          <Typography
            fontSize={16}
            fontWeight="medium"
            color="black"
            my={-1.4}
            mr={2.5}
            sx={{ zIndex: 10, position: 'absolute', top: 25, right: 0 }}
          >
            {title?.length}/30
          </Typography>
        </Box>
      </Box>

      <Box sx={{ position: 'relative', mt: 2 }}>
        <Typography color="black" fontSize={15} fontWeight={500}>
          Description
        </Typography>

        <Box sx={{ position: 'relative' }}>
          <RHFTextField
            name="description"
            placeholder="Enter Description"
            inputProps={{ maxLength: 130 }}
            sx={{
              backgroundColor: 'white',
              borderRadius: '1rem',
              '& .MuiInputBase-input.MuiOutlinedInput-input': {
                fontSize: 17,
                fontWeight: 500,
                color: 'black',
              },
            }}
            multiline
            fullWidth
            rows={4}
          />
          <Typography
            fontSize={16}
            fontWeight="medium"
            color="black"
            my={-1.4}
            mr={2.5}
            sx={{
              zIndex: 10,
              position: 'absolute',
              bottom: 15,
              right: 0,
              ...(errors?.description?.message && { bottom: 40 }),
            }}
          >
            {description?.length}/130
          </Typography>
        </Box>
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
              fontSize: 17,
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
              fontSize: 17,
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
  );
};

export default ProductAddNewProductDetails;
