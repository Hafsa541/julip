'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Grid, Typography } from '@mui/material';
// components
import { useSettingsContext } from 'src/components/settings';

import {
  useGetProfileQuery,
  useGetTemplateDetailsQuery,
  useUpdateProfileMutation,
} from 'src/app/redux/slices/apiSlice';
import Form from 'src/sections/about/form/page';
import TemplatePreview from '../predefined-templates/view';

// ----------------------------------------------------------------------

export default function AboutView() {
  const settings = useSettingsContext();
  const { data: profile, error, isLoading } = useGetProfileQuery();
  const { data: templateDetails, errorT, isLoadingT } = useGetTemplateDetailsQuery();

  return (
    <Container disableGutters maxWidth={settings.themeStretch ? false : 'xl'} sx={{ p: 0 }}>
      <Grid
        container
        sx={{
          mt: -1,
          minHeight: '100%',
        }}
      >
        <Grid item xs={12} md={7} sx={{ borderRight: '1px solid #ccc' }}>
          <Form profileData={profile?.data} />
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            pl: 2,
            pt: 2,
          }}
        >
          <Box sx={{ p: 0, m: 0, position: 'fixed' }}>
            <TemplatePreview />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
