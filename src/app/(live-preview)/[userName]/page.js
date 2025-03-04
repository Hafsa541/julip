'use client';

import { Container } from '@mui/material';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useGetUserDetailsMutation } from 'src/app/redux/slices/apiSlice';
import { useSelector } from 'src/app/redux/store';
import SandCard from 'src/sections/predefined-templates/cards/sand-card';
import WaterCard from 'src/sections/predefined-templates/cards/water-card';

const LivePreview = () => {
  const [getUserDetails] = useGetUserDetailsMutation();

  const livePreview = useSelector((state) => state.preview.data[0]);
  const templateData = livePreview?.template?.published;
  const profileData = livePreview?.profile?.published;

  const { userName } = useParams();

  useEffect(() => {
    async function fetchUserDetails() {
      await getUserDetails({ userName });
    }
    if (userName) {
      fetchUserDetails();
    }
  }, [getUserDetails, userName]);

  return (
    <Container
      sx={{
        height: '100vh',
        maxWidth: '500px',
        width: '100%',
      }}
      maxWidth={500}
      disableGutters
    >
      {templateData?.name === 'Water' && <WaterCard data={{ profileData, templateData }} />}
      {templateData?.name === 'Sand' && <SandCard data={{ profileData, templateData }} />}
    </Container>
  );
};

export default LivePreview;
