'use client';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button, Container, Link } from '@mui/material';
// components
import { useSelector } from 'src/app/redux/store';
import { useGetPredefinedTemplatesQuery } from 'src/app/redux/slices/apiSlice';
import isDarkColor from 'src/utils/is-dark';

import WebLinksButton from '../components/card-web-links-button';
import AboutOption from '../components/about/about-option';
import ServicesOption from '../components/services/services-option';
import ShopOption from '../components/shop/shop-option';

// ----------------------------------------------------------------------

const socialMediaList = [
  {
    name: 'Instagram',
    image: '/assets/icons/social-media/Instagram.svg',
  },
  {
    name: 'TikTok',
    image: '/assets/icons/social-media/Tiktok.svg',
  },
  {
    name: 'X',
    image: '/assets/icons/social-media/X.svg',
  },
  {
    name: 'Threads',
    image: '/assets/icons/social-media/Thread.svg',
  },
  {
    name: 'YouTube',
    image: '/assets/icons/social-media/Youtube.svg',
  },
  {
    name: 'Facebook',
    image: '/assets/icons/social-media/Facebook.svg',
  },
  {
    name: 'Discord',
    image: '/assets/icons/social-media/Discord.svg',
  },
  {
    name: 'LinkedIn',
    image: '/assets/icons/social-media/LinkedIn.svg',
  },
  {
    name: 'Pinterest',
    image: '/assets/icons/social-media/Pinterest.svg',
  },
  {
    name: 'Snapchat',
    image: '/assets/icons/social-media/Snapchat.svg',
  },
  {
    name: 'Spotify',
    image: '/assets/icons/social-media/Spotify.svg',
  },
];
export default function SandCard({ data, onTemplateView = false, mode = 'light' }) {
  const { data: predefinedTemplateList, error, isLoading } = useGetPredefinedTemplatesQuery();
  let profileData = useSelector((state) => state?.profile?.data);
  let templateData = useSelector((state) => state?.template?.data);

  if (data) {
    profileData = data?.profileData;
    templateData = data?.templateData;
  }

  const [mainTextColor, setMainTextColor] = useState('black');
  const [backgroundTextColor, setBackgroundTextColor] = useState('black');
  const [buttonsTextColor, setButtonsTextColor] = useState('black');

  const optionsist = ['Shop', 'About', 'Services'];
  const [selectedOption, setSelectedOption] = useState(optionsist[0]);

  let colorsToUse =
    templateData?.mode === 'dark' ? templateData?.colors?.dark : templateData?.colors?.light;
  let fontsToUse = templateData?.fonts;

  if (onTemplateView) {
    const SandTemplate = predefinedTemplateList?.data?.filter((item) => item?.name === 'Sand');
    if (SandTemplate) {
      colorsToUse =
        mode === 'dark' ? SandTemplate[0]?.colors?.dark : SandTemplate[0]?.colors?.light;
      fontsToUse = SandTemplate[0]?.fonts;
    } else {
      colorsToUse =
        mode === 'dark'
          ? {
              main: '#FFFFFF',
              background: '#F4EBD5',
              buttons: '#7F5136',
            }
          : {
              main: '#161616',
              background: '#F4EBD5',
              buttons: '#7F5136',
            };
      fontsToUse = { header: 'DM Sans', body: 'Monaz-Regular' };
    }
  }

  const determineTextColor = (color) => (isDarkColor(color) ? 'white' : 'black');
  useEffect(() => {
    setMainTextColor(determineTextColor(colorsToUse?.main));
    setBackgroundTextColor(determineTextColor(colorsToUse?.background));
    setButtonsTextColor(determineTextColor(colorsToUse?.buttons));
  }, [templateData?.colors, mode, colorsToUse]);

  return (
    <Card
      sx={{
        textAlign: 'center',
        borderRadius: 0,
        backgroundColor: colorsToUse?.main,
        color: 'black',
      }}
    >
      <Box
        sx={{
          mt: 5,
          width: '100%',
          backgroundColor: colorsToUse?.background,
        }}
      >
        {/* Image + Username + Social Icons */}
        <Stack
          direction="row"
          sx={{
            width: '85%',
            mx: 'auto',
          }}
        >
          {/* Image */}
          <Box
            sx={{
              minWidth: 125,
              maxWidth: 125,
              height: 125,
              border: '1px solid black',
              borderRadius: 2,
              position: 'relative',
              bottom: 25,
              backgroundColor: 'white',
              overflow: 'hidden',
            }}
          >
            <img
              src={profileData?.image}
              alt="Profile"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>

          <Box pl={1}>
            {/* Username */}
            <Typography
              fontSize="2em"
              fontWeight={700}
              fontFamily={fontsToUse?.header}
              color={backgroundTextColor}
              align="left"
              width="100%"
              sx={{
                // wordBreak: 'break-word',
                m: 0.5,
                lineHeight: 1.2,
                mb: 1,
              }}
            >
              {profileData?.profileName}
            </Typography>

            {/* Social Icons */}
            <Stack direction="row" alignItems="left" justifyContent="left" mb={1.25}>
              {profileData?.socialLinks?.map((social, index) => {
                const socialMedia = socialMediaList?.find(
                  (item) => item?.name === social?.platform
                );
                if (social?.visibility && socialMedia) {
                  return (
                    <Link
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 0.5,
                        mr: 1,
                      }}
                    >
                      <img
                        src={socialMedia?.image}
                        alt={socialMedia?.name}
                        style={{
                          filter: `invert(${isDarkColor(colorsToUse.background) ? 1 : 0})`,
                          width: 16,
                          height: 16,
                        }}
                      />
                    </Link>
                  );
                }
                return null;
              })}
            </Stack>
          </Box>
        </Stack>

        {/* Profile Bio */}
        <Container
          sx={{
            textAlign: 'center',
            my: 1,
            mb: 2,
          }}
        >
          <Typography
            fontSize={15}
            fontWeight={400}
            align="center"
            fontFamily={fontsToUse?.body}
            color={backgroundTextColor}
            width="100%"
            sx={{ wordBreak: 'break-word', m: 'auto' }}
          >
            {profileData?.bio}
          </Typography>
        </Container>

        <Stack
          direction="row"
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          {optionsist.map((option) => (
            <Button
              key={option}
              onClick={() => setSelectedOption(option)}
              sx={{
                border: '1px solid black',
                borderRadius: 1.5,
                backgroundColor: 'transparent',
                color: backgroundTextColor,
                whiteSpace: 'nowrap',
                flexShrink: 0,
                width: '30%',
                transition: 'background 0.3s ease',
                ...(selectedOption === option && {
                  backgroundColor: 'white',
                  borderBottom: 0,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  color: 'black',
                  '&:hover': {
                    background: 'white',
                  },
                  '& .MuiTypography-root.MuiTypography-body2': {
                    color: 'black',
                  },
                  '&:hover .MuiTypography-root.MuiTypography-body2': {
                    color: 'black',
                  },
                }),
              }}
            >
              <Typography fontSize={18} fontWeight={600} fontFamily={fontsToUse?.header}>
                {option}
              </Typography>
            </Button>
          ))}
        </Stack>
      </Box>

      {selectedOption === 'Shop' && (
        <ShopOption
          card="Sand"
          colors={colorsToUse}
          fonts={{ ...fontsToUse, mainTextColor, backgroundTextColor, buttonsTextColor }}
        />
      )}
      {selectedOption === 'About' && <AboutOption />}
      {selectedOption === 'Services' && <ServicesOption />}

      {profileData?.webLinks?.length > 0 && (
        <WebLinksButton
          links={profileData?.webLinks}
          colors={colorsToUse}
          fonts={{ ...fontsToUse, mainTextColor, backgroundTextColor, buttonsTextColor }}
        />
      )}
    </Card>
  );
}

SandCard.propTypes = {
  data: PropTypes.object,
  onTemplateView: PropTypes.bool,
  mode: PropTypes.string,
};
