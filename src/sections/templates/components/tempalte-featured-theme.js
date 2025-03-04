'use client';

// @mui
import { Box, Typography, Grid } from '@mui/material';
import { useState } from 'react';
import { dispatch, useSelector } from 'src/app/redux/store';
import { setTemplateData } from 'src/app/redux/slices/templateSlice';
// ----------------------------------------------------------------------

const colorTheme = [
  {
    main: '#FFFFFF',
    background: '#F4EBD5',
    buttons: '#A8BAFF',
  },
  {
    main: '#FFFFFF',
    background: '#440C17',
    buttons: '#A8BAFF',
  },
  {
    main: '#FFFFFF',
    background: '#634528',
    buttons: '#F4EBD5',
  },
  {
    main: '#FFFFFF',
    background: '#F4EBD5',
    buttons: '#FFFFFF',
  },
  {
    main: '#FFFFFF',
    background: '#3B5E54',
    buttons: '#DCFFBA',
  },
  {
    main: '#FFFFFF',
    background: '#440C17',
    buttons: '#F4EBD5',
  },
];

export default function TemplateFeatured() {
  const templateData = useSelector((state) => state.template.data);
  const [selectedColors, setSelectedColors] = useState('');

  const handleColorSelect = (ThemeColors) => {
    setSelectedColors(ThemeColors);
    dispatch(
      setTemplateData({
        ...templateData,
        colors: {
          ...templateData?.colors,
          light: ThemeColors, // Update light color theme
          dark: {
            ...templateData?.colors?.dark, // Keep dark.main unchanged
            background: ThemeColors.background, // Update dark.background
            buttons: ThemeColors.buttons, // Update dark.buttons
          },
        },
      })
    );
  };

  return (
    <Box sx={{ backgroundColor: 'white', p: 1, borderRadius: 1, border: '1px solid #CFCFCF' }}>
      <Typography variant="body" fontSize={18} fontWeight="bold" sx={{ mx: 2, my: 2 }}>
        Featured themes
      </Typography>

      <Grid container rowGap={2} sx={{ m: 'auto', py: 2, alignItems: 'center', width: '100%' }}>
        {colorTheme.map((ThemeColors, index) => (
          <Grid item xs={6} key={index}>
            <Box
              sx={{
                cursor: 'pointer',
                outline: selectedColors === ThemeColors ? '1px solid black' : '1px solid #CFCFCF',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '64px',
                width: '90%',
                m: 'auto',
              }}
              onClick={() => handleColorSelect(ThemeColors)}
            >
              <Box
                sx={{
                  backgroundColor: ThemeColors.background,
                  width: '50%', // 50% width of the container
                  height: '64px',
                  borderRight: '1px solid #CCC',
                }}
              >
                {/* background color */}
              </Box>
              <Box
                sx={{
                  backgroundColor: ThemeColors.buttons,
                  width: '50%', // 50% width of the container
                  height: '64px',
                }}
              >
                {/* button color */}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
