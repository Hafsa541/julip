'use client';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button, CardContent, CardMedia, Container, Link } from '@mui/material';
// components
import { useSelector } from 'src/app/redux/store';
import { useGetPredefinedTemplatesQuery } from 'src/app/redux/slices/apiSlice';

import isDarkColor from 'src/utils/is-dark';
import WebLinksButton from '../components/card-web-links-button';
import CardCarousel from '../components/shop/card-carousel';
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
export default function WaterCard({ data, onTemplateView = false, mode = 'light' }) {
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

  // Default colors an font form redux state
  let colorsToUse =
    templateData?.mode === 'dark' ? templateData?.colors?.dark : templateData?.colors?.light;
  let fontsToUse = templateData?.fonts;

  // If on template view, get colors and fonts from predefined template
  if (onTemplateView) {
    const WaterTemplate = predefinedTemplateList?.data?.filter((item) => item?.name === 'Water');
    if (WaterTemplate) {
      colorsToUse =
        mode === 'dark' ? WaterTemplate[0]?.colors?.dark : WaterTemplate[0]?.colors?.light;
      fontsToUse = WaterTemplate[0]?.fonts;
    } else {
      colorsToUse =
        mode === 'dark'
          ? {
              main: '#161616',
              background: '#F4EBD5',
              buttons: '#C3D5FF',
            }
          : {
              main: '#FFFFFF',
              background: '#F4EBD5',
              buttons: '#C3D5FF',
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
        backgroundColor: colorsToUse?.main,
        borderRadius: 0,
        color: 'black',
      }}
    >
      {/* Top Image */}
      <CardMedia image={profileData?.image} alt="cover" ratio="16/9" sx={{ height: 150 }} />

      <CardContent sx={{ p: 0, margin: 'auto' }}>
        {/* User Details */}
        <Container
          disableGutters
          sx={{
            width: '100%',
            backgroundColor: colorsToUse?.background,
          }}
        >
          {/* Username, bio and social icons */}
          <Box
            sx={{
              backgroundColor: colorsToUse?.main,
              p: 2,
              mx: 2,
              position: 'relative',
              bottom: 30,
              border: '1px solid black',
              borderRadius: 1,
              width: '90%',
              m: 'auto',
            }}
          >
            <Typography
              align="center"
              fontSize={32}
              fontFamily={fontsToUse?.header}
              fontWeight={700}
              color={mainTextColor}
              sx={{ wordBreak: 'break-word', m: 'auto', my: 1 }}
            >
              {profileData?.profileName}
            </Typography>
            <Typography
              fontSize={15}
              fontFamily={fontsToUse?.body}
              fontWeight="light"
              variant="body2"
              color={mainTextColor}
              align="center"
              width="90%"
              sx={{ wordBreak: 'break-word', m: 'auto', mb: 2 }}
            >
              {profileData?.bio}
            </Typography>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              sx={{ position: 'absolute', bottom: -15, width: '90%' }}
            >
              {profileData?.socialLinks?.map((social, index) => {
                const socialMedia = socialMediaList?.find(
                  (item) => item?.name === social?.platform
                );
                if (socialMedia && social?.visibility) {
                  return (
                    <Box
                      key={index}
                      component={Link}
                      href={social?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        width: 32,
                        height: 32,
                        backgroundColor: colorsToUse?.buttons,
                        mx: 0.3,
                        border: '1px solid black',
                        borderRadius: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        p: 0.75,
                      }}
                    >
                      <img
                        src={socialMedia?.image}
                        alt={socialMedia?.name}
                        style={{
                          filter: `invert(${isDarkColor(colorsToUse.buttons) ? 1 : 0})`,
                          width: '100%', // Ensures image uses the full width of the Box
                          height: '100%', // Ensures image uses the full height of the Box
                        }}
                      />
                    </Box>
                  );
                }
                return null;
              })}
            </Stack>
          </Box>

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
        </Container>

        {selectedOption === 'Shop' && (
          <ShopOption
            card="Water"
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
      </CardContent>
    </Card>
  );
}

WaterCard.propTypes = {
  data: PropTypes.object,
  onTemplateView: PropTypes.bool,
  mode: PropTypes.string,
};
