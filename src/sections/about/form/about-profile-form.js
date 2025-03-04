'use client';

import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, Typography, Stack, Button } from '@mui/material';
import { useDispatch, useSelector } from 'src/app/redux/store';
import { setProfileName, setProfileBio, setProfileImage } from 'src/app/redux/slices/profileSlice';

import Iconify from 'src/components/iconify';
import { RHFTextField } from 'src/components/hook-form';
import AvatarEditorModal from './about-profile-avatar-editor-modal';

const AboutProfileForm = () => {
  const profileData = useSelector((state) => state.profile.data);
  const dispatch = useDispatch();
  const [imageState, setImageState] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { getValues, setValue } = useFormContext();
  const values = getValues();

  useEffect(() => {
    // Set the preview state based on the initial image value
    if (values?.image) {
      if (typeof values.image === 'string') {
        setImagePreview(values.image); // URL
        setImageState(null);
      } else if (values.image instanceof File) {
        setImagePreview(URL.createObjectURL(values.image)); // File
        setImageState(values.image);
      }
    }
  }, [values?.image]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageState(file);
      setImagePreview(URL.createObjectURL(file));
      setModalOpen(true);
    }
  };

  const handleSaveImage = (croppedImage) => {
    setImageState(croppedImage);
    setValue('image', croppedImage);
    setImagePreview(URL.createObjectURL(croppedImage));

    dispatch(setProfileImage(URL.createObjectURL(croppedImage)));
  };

  const handleRemoveImage = () => {
    setImageState(null);
    setImagePreview(null);
    setModalOpen(false);

    dispatch(setProfileImage(null));
  };

  const handleNameChange = (e) => {
    // Dispatch the action to update profile name in Redux store
    dispatch(setProfileName(e.target.value));
  };

  const handleBioChange = (e) => {
    // Dispatch the action to update bio in Redux store
    dispatch(setProfileBio(e.target.value));
  };

  return (
    <Stack sx={{ mx: 2, mt: 3 }}>
      <Typography fontSize={30} fontWeight="bold" sx={{ mb: 0.5, ml: 1 }}>
        Bio Description
      </Typography>
      <Stack spacing={3}>
        <Box
          spacing={3}
          sx={{
            borderRadius: 2,
            border: '1px solid #E7E7E7',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mr: 3,
            ml: 1,
          }}
        >
          <Stack
            spacing={0.3}
            sx={{ backgroundColor: '#E7E7E74D', py: 1, px: 3, pb: 2, borderRadius: 2 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: -0.5 }}>
              <Iconify icon="eva:edit-outline" size={14} />
              <Typography fontFamily="CabinetGrotesk-Variable" fontSize={18} fontWeight={700}>
                Profile name
              </Typography>
            </Box>

            <Box sx={{ position: 'relative', ml: 2 }}>
              <RHFTextField
                name="username"
                sx={{ backgroundColor: 'white', borderRadius: '1rem' }}
                placeholder="Your name"
                inputProps={{ maxLength: 25 }}
                value={profileData?.profileName || ''} // Bind value
                onChange={handleNameChange} // Handle changes
              />
              <Typography
                fontWeight={500}
                fontSize={15}
                sx={{ position: 'absolute', right: 10, bottom: 5 }}
              >
                {profileData?.profileName?.length || 0}/25
              </Typography>
            </Box>
          </Stack>

          <Stack
            spacing={0.3}
            sx={{ backgroundColor: '#E7E7E74D', py: 1, px: 3, pb: 2, borderRadius: 2 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* <Iconify icon="eva:person-outline" /> */}
              <img src="/assets/about/person.svg" alt="person" />
              <Typography fontFamily="CabinetGrotesk-Variable" fontSize={18} fontWeight={700}>
                Bio
              </Typography>
            </Box>

            <Box sx={{ position: 'relative', ml: 2 }}>
              <RHFTextField
                name="bioDescription"
                multiline
                // fullWidth
                rows={4}
                placeholder="Bio Description"
                inputProps={{ maxLength: 100 }}
                sx={{ backgroundColor: 'white', borderRadius: '1rem' }}
                value={profileData?.bio || ''} // Bind value
                onChange={handleBioChange} // Handle changes
              />
              <Typography
                fontWeight={500}
                fontSize={15}
                sx={{ position: 'absolute', right: 10, bottom: 5 }}
              >
                {profileData?.bio?.length || 0}/100
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Box
          spacing={3}
          sx={{
            borderRadius: 2,
            border: '1px solid #E7E7E7',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mr: 3,
            ml: 1,
          }}
        >
          <Stack spacing={3} sx={{ backgroundColor: '#E7E7E74D', p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* <Iconify icon="eva:image-outline" /> */}
              <img src="/assets/about/image.svg" alt="mountain" />

              <Typography variant="body" fontSize={18} fontWeight="bold">
                Profile Image
              </Typography>
            </Box>
            <Box>
              <Stack
                direction="row"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box>
                  {imagePreview ? (
                    <Box
                      component="img"
                      sx={{
                        height: 130,
                        width: 130,
                        border: '1px solid #ccc',
                        borderRadius: 3,
                        objectFit: 'cover',
                      }}
                      alt="Uploaded Image"
                      src={imagePreview}
                    />
                  ) : (
                    <Box
                      sx={{
                        height: 130,
                        width: 130,
                        border: '1px solid #ccc',
                        borderRadius: 3,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#f0f0f0',
                        objectFit: 'cover',
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
                    justifyContent: 'space-between',
                    ml: 5,
                  }}
                >
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      backgroundColor: '#A8BAFF',
                      color: 'black',
                      border: '1px solid black',
                      px: 5,
                      py: 1,
                      '&:hover': { backgroundColor: '#A8BAFF' },
                    }}
                  >
                    Choose an Image
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Button>

                  {imagePreview && (
                    <Button sx={{ background: 'transparent' }} onClick={handleRemoveImage}>
                      <Iconify icon="famicons:trash-outline" sx={{ width: 28, height: 28 }} />
                    </Button>
                  )}
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Stack>
      {modalOpen && (
        <AvatarEditorModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          image={imageState}
          onSave={handleSaveImage}
        />
      )}
    </Stack>
  );
};

export default AboutProfileForm;
