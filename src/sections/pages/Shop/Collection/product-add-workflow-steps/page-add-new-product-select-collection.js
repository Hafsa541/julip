import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  MenuItem,
  Typography,
} from '@mui/material';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box } from '@mui/system';
import { GridAddIcon } from '@mui/x-data-grid';
import React, { useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { dispatch, useSelector } from 'src/app/redux/store';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { useBoolean } from 'src/hooks/use-boolean';
import { setNewCollection } from 'src/app/redux/slices/shopSlice';
import { useCreateCollectionMutation } from 'src/app/redux/slices/apiSlice';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const ProductAddNewProductCollection = ({ handleSelectedCollection }) => {
  const collectionsList = useSelector((state) => state.shop.collections);
  const addNewCollectionDialog = useBoolean(false);
  const [createCollection] = useCreateCollectionMutation();

  const { enqueueSnackbar } = useSnackbar();
  // ------------------------- YUP --------------------------------------
  const CollectionSchema = Yup.object().shape({
    name: Yup.string().required('Collection name is required'), // Ensure collection name is required
  });

  const defaultValues = useMemo(
    () => ({
      name: collectionsList?.[collectionsList.length - 1]?.name || '',
    }),
    [collectionsList]
  );

  const methods = useForm({
    resolver: yupResolver(CollectionSchema),
    defaultValues,
  });
  const { handleSubmit, watch, setValue, reset } = methods;
  const { name } = watch();

  useEffect(() => {
    reset({
      name: collectionsList?.[collectionsList.length - 1]?.name || '',
    });
  }, [collectionsList, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log('data:', data);
      const collectionData = {
        data: {
          collectionName: data.name,
          productIds: [],
        },
        query: 'draft',
      };

      const res = await createCollection(collectionData);
      console.log('res', res);
      if (res?.error) {
        enqueueSnackbar(res?.error?.data?.message || 'Error creating new collection', {
          variant: 'error',
        });
        return;
      }

      // dispatch(setNewCollection(data.name));
      handleSelectedCollection(data.name);
      addNewCollectionDialog.onFalse();
    } catch (error) {
      console.error(error);
      console.log('error', error);
      enqueueSnackbar(error.message || 'Error creating new collection 122', { variant: 'error' });
    }
  });

  // -------------------------------------- YUP END ---------------------------------------------------------

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Box px={1}>
        <Typography color="black" fontSize={15} fontWeight={500}>
          Collection
        </Typography>
        <Box sx={{ pt: 1 }}>
          <RHFSelect
            name="name"
            placeholder="Choose Collection"
            MenuProps={MenuProps}
            sx={{
              '& .MuiSelect-select.MuiSelect-outlined ': {
                display: 'flex',
                justifyContent: 'flex-start',
                gap: 1,
              },
            }}
          >
            {collectionsList?.map((collection, index) => (
              <MenuItem
                value={collection.name}
                key={index}
                sx={{
                  borderBottom: '1px solid #ccc',
                  display: 'flex',
                  gap: 1,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: 0,
                }}
                onClick={() => handleSelectedCollection(collection.name)}
              >
                <Typography fontWeight={700} fontSize={18}>
                  {collection.name}
                </Typography>
              </MenuItem>
            ))}
            <MenuItem
              value=""
              onClick={() => {
                addNewCollectionDialog.onTrue();
              }}
            >
              <Button
                size="small"
                onClick={() => {
                  addNewCollectionDialog.onTrue();
                }}
                sx={{ my: 1 }}
              >
                <Fab
                  aria-label="add"
                  size="small"
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

                <Typography sx={{ mx: 1 }}>Add new collection</Typography>
              </Button>
            </MenuItem>
          </RHFSelect>
        </Box>

        {/* add collection dialog */}
        {addNewCollectionDialog.value && (
          <Dialog open={addNewCollectionDialog.value} onClose={addNewCollectionDialog.onFalse}>
            <DialogTitle sx={{ p: 1, mx: 3, py: 2 }}>Create new Collection</DialogTitle>
            <DialogContent sx={{ color: 'text.secondary', width: 500, py: 1, px: 4 }}>
              <Typography color="black" fontSize={15} fontWeight={500}>
                Collection name
              </Typography>

              <Box sx={{ position: 'relative' }}>
                <RHFTextField
                  name="name"
                  sx={{
                    backgroundColor: 'white',
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                      fontSize: 17,
                      fontWeight: 500,
                    },
                  }}
                  placeholder="Collection name"
                  inputProps={{ maxLength: 20 }}
                />
                <Typography
                  fontWeight={500}
                  fontSize={15}
                  sx={{ position: 'absolute', right: 10, bottom: 5 }}
                >
                  {name?.length || 0}/20
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions
              sx={{
                p: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                mx: 2,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button
                  variant="text"
                  onClick={() => {
                    addNewCollectionDialog.onFalse();
                  }}
                >
                  <Typography fontSize={18} fontWeight={700} color="black">
                    Cancel
                  </Typography>
                </Button>
                <Button
                  onClick={() => {
                    setValue('name', name);
                    onSubmit();
                  }}
                  variant="contained"
                  color="secondary"
                  sx={{
                    border: '1px solid black',
                    opacity: 1,
                    color: 'black',
                    px: 3,
                  }}
                >
                  <Typography fontSize={18} fontWeight={700} color="black">
                    Create
                  </Typography>
                </Button>
              </Box>
            </DialogActions>
          </Dialog>
        )}
      </Box>
    </FormProvider>
  );
};

export default ProductAddNewProductCollection;
ProductAddNewProductCollection.propTypes = {
  handleSelectedCollection: PropTypes.func,
};
