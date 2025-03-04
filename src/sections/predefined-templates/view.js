import { Box, Button, Container, Stack, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'src/app/redux/store';
import Iconify from 'src/components/iconify';
import WaterCard from './cards/water-card';
import SandCard from './cards/sand-card';

const TemplatePreview = () => {
  const templateData = useSelector((state) => state.template.data);
  return (
    <Stack minWidth={350} position="relative">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          my: 2,
          gap: 1,
        }}
      >
        <Iconify icon="eva:eye-outline" />
        <Typography fontSize={18} fontWeight={700} fontFamily="CabinetGrotesk-Variable">
          Preview
        </Typography>
      </Box>
      <Box
        sx={{
          height: '75vh',
          width: '90%',
          maxWidth: 350,
          overflowY: 'auto',
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none',
          border: '1px solid #ccc',
          borderRadius: 2,
        }}
      >
        {templateData?.name === 'Water' && <WaterCard />}
        {templateData?.name === 'Sand' && <SandCard />}
      </Box>
      <Container
        sx={{
          backgroundColor: 'white',
          width: '90%',
          maxWidth: 350,
          border: '1px solid #ccc',
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          padding: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
        }}
      >
        <Typography variant="body2" fontFamily={templateData?.fonts?.body}>
          Try 14-day trial
        </Typography>
        <Button
          variant="contained"
          sx={{
            color: 'black',
            borderRadius: 1.5,
            border: '1px solid black',
            backgroundColor: templateData?.colors?.light?.buttons,
            '&:hover': { backgroundColor: templateData?.colors?.light?.buttons },
          }}
        >
          <Typography variant="body" fontFamily={templateData?.fonts?.header}>
            <strong>Try</strong> Julip
          </Typography>
        </Button>
      </Container>
    </Stack>
  );
};

export default TemplatePreview;
