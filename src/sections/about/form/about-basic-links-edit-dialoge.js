'use client';

import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

const AboutBasicLinksEditDialoge = ({ dialog, handleEdit, selectedItem }) => {
  const SocialLinksSchema = Yup.object().shape({
    url: Yup.string().required('URL is required').url('Must be a valid URL'),
    title: Yup.string().required('Title Required'),
  });

  const defaultValues = useMemo(
    () => ({
      url: selectedItem?.platform,
      title: selectedItem?.name,
    }),
    [selectedItem]
  );

  const methods = useForm({
    resolver: yupResolver(SocialLinksSchema),
    defaultValues,
  });

  const { reset, handleSubmit, watch } = methods;
  const values = watch();
  useEffect(() => {
    reset({
      url: selectedItem?.url,
      title: selectedItem?.title,
    });
  }, [reset, selectedItem]);

  const onSubmit = handleSubmit((data) => {
    try {
      handleEdit(data.url, data.title);
      dialog.onFalse();
      reset();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog open={dialog.value} onClose={dialog.onFalse}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>
          <Typography fontSize={24} fontWeight={700} color="black">
            Edit your link
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ color: 'text.secondary', width: 550, mx: 2 }}>
          <Box>
            <Typography variant="subtitle2" color="black" fontSize={15}>
              URL
            </Typography>
            <RHFTextField
              name="url"
              sx={{
                backgroundColor: 'white',
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  fontSize: 17,
                  color: 'black',
                  fontWeight: 500,
                },
              }}
              placeholder="https://www.example.com"
            />
            <Typography variant="subtitle2" color="black" sx={{ mt: 2 }} fontSize={15}>
              Title
            </Typography>
            <Box sx={{ position: 'relative' }}>
              <RHFTextField
                name="title"
                sx={{
                  backgroundColor: 'white',
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    fontSize: 17,
                    fontWeight: 500,
                    color: 'black',
                  },
                }}
                placeholder="Link title"
                inputProps={{ maxLength: 30 }}
              />
              <Typography
                variant="subtitle2"
                color="black"
                sx={{ position: 'absolute', right: 5, top: 20 }}
              >
                {values.title?.length}/30
              </Typography>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={dialog.onFalse} variant="text">
            <Typography fontSize={18} fontWeight={700}>
              Cancel
            </Typography>
          </Button>
          <Button
            type="button"
            onClick={onSubmit}
            variant="contained"
            color="secondary"
            sx={{ color: 'black', width: 130, height: 50, border: '1px solid black' }}
          >
            <Typography fontSize={18} fontWeight={700}>
              Save
            </Typography>
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default AboutBasicLinksEditDialoge;
AboutBasicLinksEditDialoge.propTypes = {
  dialog: PropTypes.any,
  handleEdit: PropTypes.func,
  selectedItem: PropTypes.any,
};
