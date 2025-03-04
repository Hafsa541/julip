'use client';

import { Typography, Stack, Box } from '@mui/material';

import { useFormContext } from 'react-hook-form';
import AboutSocialLinksForm from './about-social-links-form';
import BasicLinksForm from './about-basic-links-form';

const AboutLinksFormParent = () => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <Stack sx={{ position: 'relative', mx: 2 }}>
      <Typography fontSize={30} fontWeight="bold" sx={{ mt: 2, mb: 0.5, ml: 1 }}>
        Your Links
      </Typography>

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
        <AboutSocialLinksForm />
        <BasicLinksForm />
      </Box>
    </Stack>
  );
};

export default AboutLinksFormParent;
