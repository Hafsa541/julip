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
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

const AboutBasicLinksAddDialoge = ({ dialog, handleAdd }) => {
  const BasicLinksSchema = Yup.object().shape({
    url: Yup.string().required('URL is required').url('Must be a valid URL'),
    title: Yup.string().required('Title Required'),
  });

  const defaultValues = useMemo(
    () => ({
      url: '',
      title: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(BasicLinksSchema),
    defaultValues,
  });

  const { reset, handleSubmit, watch } = methods;
  const values = watch();
  const onSubmit = handleSubmit((data) => {
    try {
      handleAdd(data.url, data.title);
      dialog.onFalse();
      reset();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog open={dialog.value} onClose={dialog.onFalse}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle sx={{ ml: 2 }}>
          <Typography fontSize={24} fontWeight={700} color="black">
            Add your link
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ color: 'text.secondary', width: 550, mx: 2 }}>
          <Box>
            <Typography variant="subtitle2" color="black" fontSize={15}>
              URL
            </Typography>
            <RHFTextField
              name="url"
              placeholder="https://www.example.com"
              sx={{
                backgroundColor: 'white',
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  fontSize: 17,
                  fontWeight: 500,
                  color: 'black',
                },
              }}
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
                sx={{ position: 'absolute', right: 10, top: 20 }}
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

export default AboutBasicLinksAddDialoge;
AboutBasicLinksAddDialoge.propTypes = {
  dialog: PropTypes.any,
  handleAdd: PropTypes.func,
};
