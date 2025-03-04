'use client';

// @mui
import { Stack, Box, Typography, MenuItem } from '@mui/material';

import Iconify from 'src/components/iconify';
import { RHFSelect } from 'src/components/hook-form';
import { dispatch, useSelector } from 'src/app/redux/store';
import { setTemplateData } from 'src/app/redux/slices/templateSlice';

const headerFonts = [
  'DM Sans',
  'Lora',
  'Fraunces',
  'Work Sans',
  'Poppins',
  'Outfit',
  'CabinetGrotesk-Variable',
  'Space Grotesk',
  'Raleway',
  'Noto Serif',
  'Prompt',
  'Monaz-Regular',
];

const bodyFonts = [
  'DM Sans',
  'Lora',
  'Fraunces',
  'Work Sans',
  'Poppins',
  'Outfit',
  'CabinetGrotesk-Variable',
  'Space Grotesk',
  'Raleway',
  'Noto Serif',
  'Prompt',
  'Monaz-Regular',
];

// ----------------------------------------------------------------------

export default function TemplatesFonts() {
  const templateData = useSelector((state) => state.template.data);

  return (
    <Stack>
      <Stack spacing={1.5} sx={{ backgroundColor: '#E7E7E74D', p: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Iconify icon="material-symbols:font-download-outline-sharp" />
          <Typography variant="body" fontSize={18} fontWeight="bold">
            Font
          </Typography>
        </Box>
        {/* Header fonts */}
        <Box>
          <Typography fontWeight={400} fontFamily="DM Sans" sx={{ mx: 2 }}>
            Titles
          </Typography>
          <Box sx={{ pt: 1, width: '95%', m: 'auto' }}>
            <RHFSelect
              name="fonts.header"
              sx={{
                '& .MuiSelect-select.MuiSelect-outlined ': {
                  display: 'flex',
                  justifyContent: 'flex-start',
                  gap: 1,
                  backgroundColor: 'white',
                },
              }}
            >
              {headerFonts.map((headerFontMapped, index) => (
                <MenuItem
                  value={headerFontMapped}
                  key={index}
                  onClick={() => {
                    // Dispatch the new font to the Redux store
                    dispatch(
                      setTemplateData({
                        ...templateData,
                        fonts: {
                          ...templateData?.fonts, // Retain the existing fonts object
                          header: headerFontMapped, // Update the header font
                        },
                      })
                    );
                  }}
                >
                  <Typography fontFamily={headerFontMapped}>{headerFontMapped}</Typography>
                </MenuItem>
              ))}
            </RHFSelect>
          </Box>
        </Box>
        {/* Body Fonts */}
        <Box sx={{ mt: 2 }}>
          <Typography fontWeight={400} fontFamily="DM Sans" sx={{ mx: 2 }}>
            Body copy
          </Typography>
          <Box sx={{ pt: 1, width: '95%', m: 'auto' }}>
            <RHFSelect
              name="fonts.body"
              sx={{
                '& .MuiSelect-select.MuiSelect-outlined ': {
                  display: 'flex',
                  justifyContent: 'flex-start',
                  gap: 1,
                  backgroundColor: 'white',
                },
              }}
            >
              {bodyFonts.map((bodyFontMapped, index) => (
                <MenuItem
                  value={bodyFontMapped}
                  key={index}
                  onClick={() => {
                    dispatch(
                      setTemplateData({
                        ...templateData,
                        fonts: {
                          ...templateData?.fonts, // Retain the existing fonts object
                          body: bodyFontMapped,
                        },
                      })
                    );
                  }}
                >
                  <Typography fontFamily={bodyFontMapped}>{bodyFontMapped}</Typography>
                </MenuItem>
              ))}
            </RHFSelect>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
}
