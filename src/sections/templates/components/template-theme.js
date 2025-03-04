'use client';

import React, { useEffect, useState } from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';

import { useFormContext } from 'react-hook-form';
import { useGetPredefinedTemplatesQuery } from 'src/app/redux/slices/apiSlice';
import { dispatch, useSelector } from 'src/app/redux/store';
import { setTemplateData } from 'src/app/redux/slices/templateSlice';

import Iconify from 'src/components/iconify';
import WaterCard from '../../predefined-templates/cards/water-card';
import SandCard from '../../predefined-templates/cards/sand-card';

const TemplateTheme = () => {
  const { data: templateList, error, isLoading } = useGetPredefinedTemplatesQuery();
  const templateData = useSelector((state) => state.template.data);

  const [selectedCard, setSelectedCard] = useState(templateData || null); // State for managing selected card

  useEffect(() => {
    setSelectedCard(templateData?.name);
  }, [templateData]);

  // Handle selection of a card
  const handleCardClick = (template) => {
    const selectedTemplate = templateList?.data.find((t) => t?.name === template?.name);
    if (selectedTemplate) {
      dispatch(setTemplateData(selectedTemplate)); // Dispatch selected template data to Redux
    }
  };

  return (
    <Stack spacing={1.5} sx={{ backgroundColor: '#E7E7E74D', p: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Iconify icon="tabler:circle-square" />
        <Typography variant="h6">Theme</Typography>
      </Box>

      <Grid container>
        {templateList?.data?.map((template) => (
          <Grid item xs={12} sm={6} md={6} lg={6} key={template._id} p={0}>
            <Box
              sx={{
                boxSizing: 'border-box',
                cursor: 'pointer',
                p: 0,
                m: -2,
              }}
              onClick={() => handleCardClick(template)}
            >
              <Box
                sx={{
                  backgroundColor: template.colors.light.main,
                  border: selectedCard === template?.name ? '1px solid #000' : 'none',
                  width: '100%',
                  borderRadius: 2,
                  transition: 'border 0.1s ease',
                  pointerEvents: 'none',
                  m: 'auto',
                  p: 0,
                  willChange: 'transform',
                  transform: 'scale(0.85)',
                  transformOrigin: 'center',
                  textRendering: 'optimizeLegibility',
                  WebkitFontSmoothing: 'antialiased',
                  height: '75vh',
                  overflowY: 'auto',
                  scrollBehavior: 'smooth',
                  scrollbarWidth: 'none',
                }}
              >
                {template?.name === 'Water' && <WaterCard onTemplateView />}
                {template?.name === 'Sand' && <SandCard onTemplateView />}
              </Box>
            </Box>

            <Typography fontWeight={700} fontSize={16} color="black" align="center">
              {template?.name}
            </Typography>
          </Grid>
        ))}

        {/* Premium Locked Lime Card */}
        <Grid item xs={12} sm={6} md={6} lg={6} p={0} sx={{ position: 'relative' }}>
          <img
            src="/assets/template/pro.svg"
            width="65px"
            height="auto"
            alt="pro"
            style={{ position: 'absolute', top: 20, right: 5, zIndex: 10 }}
          />
          <Box
            sx={{
              cursor: 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 0,
              m: -2,
              opacity: '0.9',
              filter: 'brightness(90%)',
            }}
          // onClick={() => handleCardClick(template)}
          >
            <Box
              sx={{
                // backgroundColor: template.colors.light.main,
                // border: selectedCard === template?.name ? '1px solid #000' : 'none',
                width: 280,
                borderRadius: 2,
                transition: 'border 0.1s ease',
                pointerEvents: 'none',
                m: 'auto',
                p: 0,
                willChange: 'transform',
                transform: 'scale(0.85)',
                transformOrigin: 'center',
                textRendering: 'optimizeLegibility',
                WebkitFontSmoothing: 'antialiased',
                imageRendering: 'high-quality',
                // height: '80vh',
                overflowY: 'auto',
                scrollBehavior: 'smooth',
                scrollbarWidth: 'none',
              }}
            >
              <img src="/assets/template/Lime.svg" width="100%" height="auto" alt="Lime" />
            </Box>
          </Box>

          <Typography fontWeight={700} fontSize={16} color="black" align="center">
            Lime
          </Typography>
        </Grid>

        {/* Premium Locked Coffee Card */}
        <Grid item xs={12} sm={6} md={6} lg={6} p={0} sx={{ position: 'relative' }}>
          <img
            src="/assets/template/pro.svg"
            width="65px"
            height="auto"
            alt="pro"
            style={{ position: 'absolute', top: 20, right: 5, zIndex: 10 }}
          />
          <Box
            sx={{
              cursor: 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 0,
              m: -2,
              opacity: '0.9',
              filter: 'brightness(90%)',
              position: 'relative',
            }}
          // onClick={() => handleCardClick(template)}
          >
            <Box
              sx={{
                // backgroundColor: template.colors.light.main,
                // border: selectedCard === template?.name ? '1px solid #000' : 'none',
                width: 280,
                borderRadius: 2,
                transition: 'border 0.1s ease',
                pointerEvents: 'none',
                m: 'auto',
                p: 0,
                willChange: 'transform',
                transform: 'scale(0.85)',
                transformOrigin: 'center',
                textRendering: 'optimizeLegibility',
                WebkitFontSmoothing: 'antialiased',
                overflowY: 'auto',
                scrollBehavior: 'smooth',
                scrollbarWidth: 'none',
              }}
            >
              <img src="/assets/template/Coffee.svg" width="100%" height="auto" alt="Coffee" />
            </Box>
          </Box>

          <Typography fontWeight={700} fontSize={16} color="black" align="center">
            Coffee
          </Typography>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default TemplateTheme;
