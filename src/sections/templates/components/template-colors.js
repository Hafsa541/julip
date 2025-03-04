'use client';

// @mui

import { Box, Stack, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';

import TemplateFeatured from './tempalte-featured-theme';
import TemplateCustomize from './template-customize';

// ----------------------------------------------------------------------

export default function TemplatesColors() {
  return (
    <Stack>
      <Stack spacing={1.5} sx={{ backgroundColor: '#E7E7E74D', p: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Iconify icon="hugeicons:colors" />
          <Typography variant="body" fontSize={18} fontWeight="bold">
            Colors
          </Typography>
        </Box>
        <TemplateFeatured />
        <TemplateCustomize />
      </Stack>
    </Stack>
  );
}
