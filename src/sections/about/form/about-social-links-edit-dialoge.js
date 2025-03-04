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
  MenuItem,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';

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

const AboutSocialLinksEditDialoge = ({ dialog, handleEdit, socialMediaList, selectedItem }) => {
  const [platform, setPlatform] = useState('');

  const SocialLinksSchema = Yup.object().shape({
    platform: Yup.string().required('Platform Required'),
    username: Yup.string()
      .required('Username Required')
      .matches(/^@/, 'Username must start with @'),
    _id: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      platform: selectedItem?.platform || '',
      username: selectedItem?.username || '',
      _id: selectedItem?._id || '',
    }),
    [selectedItem]
  );

  const methods = useForm({
    resolver: yupResolver(SocialLinksSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = methods;

  const socialname = getValues();
  useEffect(() => {
    reset({
      platform: selectedItem?.platform,
      username: selectedItem?.username,
      _id: selectedItem?._id,
    });
  }, [reset, selectedItem]);

  const onSubmit = handleSubmit((data) => {
    try {
      console.log('data edit', data);
      handleEdit({ ...data, _id: selectedItem._id });
      dialog.onFalse();
      reset();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog open={dialog?.value} onClose={dialog?.onFalse}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>
          <Typography fontSize={24} fontWeight={700} color="black">
            Edit your link
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ color: 'text.secondary', width: 550, mx: 2 }}>
          <Box pt={1}>
            <RHFSelect
              name="platform"
              label="Choose your platform"
              MenuProps={MenuProps}
              sx={{
                '& .MuiSelect-select.MuiSelect-outlined ': {
                  display: 'flex',
                  justifyContent: 'flex-start',
                  gap: 1,
                },
                '& .MuiTypography-root.MuiTypography-body1': {
                  mt: 0.5,
                  fontSize: 17,
                  fontWeight: 700,
                },
              }}
            >
              {socialMediaList?.map((social, index) => (
                <MenuItem
                  value={social?.name}
                  key={index}
                  sx={{
                    borderBottom: '1px solid #ccc',
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: 0,
                  }}
                  onClick={() => setPlatform(social?.name)}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      gap: 1,
                    }}
                  >
                    {/* <Iconify icon={social.image} sx={{ paddingx: 1 }} /> */}
                    <img src={social?.image} alt={social?.name} />
                    <Typography>{social?.name}</Typography>
                  </Box>
                  {platform !== social?.name && socialname?.platform !== social?.name && (
                    <Box>
                      <Iconify icon="iconamoon:arrow-right-2-thin" />
                    </Box>
                  )}
                </MenuItem>
              ))}
            </RHFSelect>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" fontSize={15} color="black">
              Add your username
            </Typography>
            <RHFTextField
              name="username"
              placeholder="@username"
              sx={{
                backgroundColor: 'white',
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  fontSize: 17,
                  fontWeight: 500,
                  color: 'black',
                },
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={dialog.onFalse}
            variant="outlined"
            sx={{ color: 'black', width: 150, height: 50, border: '1px solid black' }}
          >
            <Typography fontSize={18} fontWeight={700}>
              Cancel
            </Typography>
          </Button>
          <Button
            type="button"
            onClick={onSubmit}
            variant="contained"
            color="secondary"
            sx={{ color: 'black', width: 150, height: 50, border: '1px solid black' }}
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

export default AboutSocialLinksEditDialoge;
AboutSocialLinksEditDialoge.propTypes = {
  dialog: PropTypes.any,
  handleEdit: PropTypes.func,
  socialMediaList: PropTypes.array,
  selectedItem: PropTypes.any,
};
