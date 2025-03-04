/* eslint-disable no-nested-ternary */
import { Box, Grid, Stack, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

import { useFormContext } from 'react-hook-form';
import Iconify from 'src/components/iconify';
import { dispatch, useSelector } from 'src/app/redux/store';
import { setTemplateData, setTemplateMode } from 'src/app/redux/slices/templateSlice';
import { useGetPredefinedTemplatesQuery } from 'src/app/redux/slices/apiSlice';
import WaterCard from '../../predefined-templates/cards/water-card';
import SandCard from '../../predefined-templates/cards/sand-card';

const TemplateThemeMode = () => {
  const { data: templateList, error, isLoading } = useGetPredefinedTemplatesQuery();
  const templateData = useSelector((state) => state.template.data);

  // Default selection based on the initial mode
  const [selectedMode, setSelectedMode] = useState(templateData?.mode || 'light');

  useEffect(() => {
    setSelectedMode(templateData?.mode);
  }, [templateData]);

  // Handle selection of a card based on mode (light or dark)
  const handleCardClick = (mode) => {
    const predefinedTemplate = templateList?.data?.find(
      (template) => template?.name === templateData?.name
    );
    if (predefinedTemplate) {
      dispatch(setTemplateData(predefinedTemplate));
      dispatch(setTemplateMode(mode));
    }
  };

  return (
    <Stack spacing={1.5} sx={{ backgroundColor: '#E7E7E74D', p: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Iconify icon="icon-park-outline:dark-mode" />
        <Typography variant="h6">Mode</Typography>
      </Box>

      <Grid container>
        {/* Light Mode Card */}
        <Grid item xs={12} sm={6} md={6} lg={6} p={0}>
          <Box
            sx={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 0,
              m: -2,
            }}
            onClick={() => handleCardClick('light')}
          >
            <Box
              sx={{
                backgroundColor: templateList?.data?.find(
                  (template) => template?.name === templateData?.name
                )?.colors?.light?.main,
                border: selectedMode === 'light' ? '1px solid #000' : 'none',
                borderRadius: 2,
                transition: 'border 0.1s ease',
                pointerEvents: 'none',
                width: 350,
                m: 'auto',
                p: 0,
                willChange: 'transform',
                transform: 'scale(0.85)',
                transformOrigin: 'center',
                textRendering: 'optimizeLegibility',
                WebkitFontSmoothing: 'antialiased',
                height: '85vh',
                overflowY: 'auto',
                scrollBehavior: 'smooth',
                scrollbarWidth: 'none',
              }}
            >
              {templateData?.name === 'Water' && <WaterCard onTemplateView mode="light" />}
              {templateData?.name === 'Sand' && <SandCard onTemplateView mode="light" />}
            </Box>
          </Box>

          <Typography
            fontWeight={700}
            fontSize={16}
            color="black"
            align="center"
            position="relative"
            bottom={6}
          >
            Light mode
          </Typography>
        </Grid>

        {/* Dark Mode Card */}
        <Grid item xs={12} sm={6} md={6} lg={6} p={0}>
          <Box
            sx={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 0,
              m: -2,
            }}
            onClick={() => handleCardClick('dark')}
          >
            <Box
              sx={{
                backgroundColor: templateList?.data?.find(
                  (template) => template?.name === templateData?.name
                )?.colors?.dark?.main,
                border: selectedMode === 'dark' ? '1px solid #000' : 'none',
                borderRadius: 2,
                transition: 'border 0.1s ease',
                pointerEvents: 'none',
                width: 350,
                m: 'auto',
                p: 0,
                willChange: 'transform',
                transform: 'scale(0.85)',
                transformOrigin: 'center',
                textRendering: 'optimizeLegibility',
                WebkitFontSmoothing: 'antialiased',
                height: '85vh',
                overflowY: 'auto',
                scrollBehavior: 'smooth',
                scrollbarWidth: 'none',
              }}
            >
              {templateData?.name === 'Water' && <WaterCard onTemplateView mode="dark" />}
              {templateData?.name === 'Sand' && <SandCard onTemplateView mode="dark" />}
            </Box>
          </Box>

          <Typography
            fontWeight={700}
            fontSize={16}
            color="black"
            align="center"
            position="relative"
            bottom={6}
          >
            Dark mode
          </Typography>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default TemplateThemeMode;
