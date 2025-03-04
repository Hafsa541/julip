'use client';

import PropTypes from 'prop-types';
import React, { useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import * as Yup from 'yup';
import { isEmpty } from 'lodash';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FormProvider from 'src/components/hook-form';

import { useSelector } from 'src/app/redux/store';
import { useUpdateProfileMutation } from 'src/app/redux/slices/apiSlice';
import { useSnackbar } from 'src/components/snackbar';
import AboutProfileForm from './about-profile-form';
import AboutLinksFormParent from './about-links-form-parent';

export default function AboutForm({ profileData }) {
  const profileSliceData = useSelector(state => state.profile.data)
  const userId = useSelector((state) => state.auth?.user?._id);
  const [updateProfile] = useUpdateProfileMutation();

  const { enqueueSnackbar } = useSnackbar();

  const ProfileSchema = Yup.object().shape({
    username: Yup.string().required('Profile name is required'),
    bioDescription: Yup.string()
      .max(300, 'Description must not exceed 500 characters')
      .required('Bio is rerquired'),

    image: Yup.mixed()
      .nullable()
      .test('isValidImage', 'Profile image must be a valid URL or file', (value) => {
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
    socialLinks: Yup.array(),
    basicLinks: Yup.array(),
  });

  const defaultValues = useMemo(
    () => ({
      username: profileData?.profileName || '',
      bioDescription: profileData?.bio || '',
      image: profileData?.image || null,
      socialLinks: profileData?.socialLinks || [],
      basicLinks: profileData?.webLinks || [],
    }),
    [profileData]
  );
  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  useEffect(() => {
    if (!isEmpty(profileSliceData)) {
      reset({
        username: profileSliceData?.profileName || '',
        bioDescription: profileSliceData?.bio || '',
        image: profileSliceData?.image || null,
        socialLinks: profileSliceData?.socialLinks || [],
        basicLinks: profileSliceData?.webLinks || [],
      });
    }
  }, [profileSliceData, reset]);

  const onSubmit = handleSubmit(async (data, query) => {
    try {
      console.log('data:', data);
      console.log('query:', query);

      const finalData = {
        profileName: data.username,
        bio: data.bioDescription,
        image: data.image,
        webLinks: data.basicLinks,
        socialLinks: data.socialLinks,
        userId,
      };

      const formData = new FormData();

      // Handle the image field based on its type
      if (typeof data.image === 'string') {
        // If the image is a URL, include it in the JSON body
        finalData.image = data.image; // Keep the URL as-is
      } else if (data.image instanceof File) {
        // If the image is a file, add it to FormData
        formData.append('image', data.image);
        delete finalData.image; // Remove from JSON body
      }

      // Add the remaining data as a JSON string
      formData.append('body', JSON.stringify(finalData));

      const res = await updateProfile({ query, data: formData });
      console.log('response', res);
      enqueueSnackbar(res?.data?.message, {
        variant: 'success',
        anchorOrigin: { horizontal: 'center', vertical: 'top' },
      });
      console.log('Final Data', finalData);
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error?.message, {
        variant: 'error',
        anchorOrigin: { horizontal: 'center', vertical: 'top' },
      });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <AboutProfileForm />
      <AboutLinksFormParent />
      <Box
        sx={{
          mx: 5,
          display: 'flex',
          justifyContent: 'right',
        }}
      >
        <LoadingButton
          type="button"
          onClick={() => onSubmit('draft')}
          variant="outlined"
          color="secondary"
          isLoading={isSubmitting}
          sx={{
            color: 'black',
            border: '1px solid black',
            my: 2,
            mx: 1,
            p: 1.25,
            px: 5,
          }}
        >
          <Typography fontWeight={700} fontSize={16}>
            Save
          </Typography>
        </LoadingButton>

        <LoadingButton
          type="button"
          onClick={() => onSubmit('published')}
          variant="contained"
          color="secondary"
          isLoading={isSubmitting}
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

AboutForm.propTypes = {
  profileData: PropTypes.object,
};
