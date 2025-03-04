'use client';

import { useEffect, useState } from 'react';
// @mui
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import { HexColorPicker } from 'react-colorful';
import Iconify from 'src/components/iconify';
import { dispatch, useSelector } from 'src/app/redux/store';
import { setTemplateData } from 'src/app/redux/slices/templateSlice';
import { useBoolean } from 'src/hooks/use-boolean';

// ----------------------------------------------------------------------

export default function TemplateCustomize() {
  const templateData = useSelector((state) => state.template.data);

  const [customMainColor, setCustomMainColor] = useState(
    templateData?.mode === 'light'
      ? templateData?.colors?.light?.main
      : templateData?.colors?.dark?.main
  );

  const [customBackgroundColor, setCustomBackgroundColor] = useState(
    templateData?.mode === 'light'
      ? templateData?.colors?.light?.background
      : templateData?.colors?.dark?.background
  );
  const [customButtonColor, setCustomButtonColor] = useState(
    templateData?.mode === 'light'
      ? templateData?.colors?.light?.buttons
      : templateData?.colors?.dark?.buttons
  );

  // TODO : create temp color states to display on the small sqaure box at the color picker section.

  useEffect(() => {
    setCustomMainColor(
      templateData?.mode === 'light'
        ? templateData?.colors?.light?.main
        : templateData?.colors?.dark?.main
    );
    setCustomBackgroundColor(
      templateData?.mode === 'light'
        ? templateData?.colors?.light?.background
        : templateData?.colors?.dark?.background
    );
    setCustomButtonColor(
      templateData?.mode === 'light'
        ? templateData?.colors?.light?.buttons
        : templateData?.colors?.dark?.buttons
    );
  }, [templateData]);

  const mainColorDialog = useBoolean(false);
  const backgroundColorDialog = useBoolean(false);
  const buttonColorDialog = useBoolean(false);

  return (
    <Stack sx={{ mt: 2 }}>
      <Box sx={{ backgroundColor: 'white', p: 1, borderRadius: 1, border: '1px solid #CFCFCF' }}>
        <Typography variant="body" fontSize={18} fontWeight="bold" sx={{ mx: 2, my: 2 }}>
          Customize
        </Typography>

        <Stack>
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              my: 1,
            }}
          >
            <Typography color="black" fontSize={18} fontWeight={500}>
              Main color
            </Typography>
            <Box
              sx={{
                border: '1px solid #CFCFCF',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 2,
                p: 1,
                width: '202px',
                height: '47px',
              }}
            >
              <Typography color="black" fontSize={17} fontWeight={500} ml={2}>
                {customMainColor}
              </Typography>
              <Box
                sx={{
                  backgroundColor: customMainColor,
                  width: '27px',
                  height: '27px',
                  border: '1px solid #CFCFCF',
                  cursor: 'pointer',
                }}
                onClick={mainColorDialog.onTrue}
              >
                {/* comments */}
              </Box>
            </Box>
          </Container>
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography color="black" fontSize={18} fontWeight={500}>
              Background
            </Typography>
            <Box
              sx={{
                border: '1px solid #CFCFCF',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 2,
                p: 1,
                width: '202px',
                height: '47px',
              }}
            >
              <Typography color="black" fontSize={17} fontWeight={500} ml={2}>
                {customBackgroundColor}
              </Typography>
              <Box
                sx={{
                  backgroundColor: customBackgroundColor,
                  width: '27px',
                  height: '27px',
                  border: '1px solid #CFCFCF',
                  cursor: 'pointer',
                }}
                onClick={backgroundColorDialog.onTrue}
              >
                {/* comments */}
              </Box>
            </Box>
          </Container>
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              my: 1,
            }}
          >
            <Typography color="black" fontSize={18} fontWeight={500}>
              Buttons
            </Typography>
            <Box
              sx={{
                border: '1px solid #CFCFCF',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 2,
                p: 1,
                width: '202px',
                height: '47px',
              }}
            >
              <Typography color="black" fontSize={17} fontWeight={500} ml={2}>
                {customButtonColor}
              </Typography>
              <Box
                sx={{
                  backgroundColor: customButtonColor,
                  width: '27px',
                  height: '27px',
                  border: '1px solid #CFCFCF',
                  cursor: 'pointer',
                }}
                onClick={buttonColorDialog.onTrue}
              >
                {/* comments */}
              </Box>
            </Box>
          </Container>
        </Stack>
      </Box>

      {/* main palate */}
      {mainColorDialog.value && (
        <Dialog
          onClose={mainColorDialog.onFalse}
          aria-labelledby="customized-dialog-title"
          open={mainColorDialog.value}
        >
          <DialogTitle sx={{ m: 0, p: 2, mr: 5 }} id="customized-dialog-title">
            Choose Main color
          </DialogTitle>

          <IconButton
            aria-label="close"
            onClick={mainColorDialog.onFalse}
            sx={(theme) => ({
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <Iconify icon="material-symbols:close-rounded" />
          </IconButton>

          <DialogContent dividers>
            <HexColorPicker color={customMainColor} onChange={setCustomMainColor} />

            <Box sx={{ width: '100%', border: '1px solid black', p: 1, my: 1 }}>
              {customMainColor}
            </Box>
            <Button
              sx={{
                backgroundColor: 'rgb(168, 186, 255)',
                color: 'black',
                width: '100%',
                border: '1px solid black',
              }}
              onClick={() => {
                mainColorDialog.onFalse();
                dispatch(
                  setTemplateData({
                    ...templateData,
                    colors: {
                      ...templateData?.colors, // Retain the existing colors object
                      light: {
                        ...templateData?.colors?.light, // Retain the existing light color object
                        main: customMainColor, // Update only the button color
                      },
                      dark: {
                        ...templateData?.colors?.dark, // Retain the existing dark color object
                        main: customMainColor, // Update only the button color
                      },
                    },
                  })
                );
              }}
            >
              Apply
            </Button>
          </DialogContent>
        </Dialog>
      )}

      {/* background palate */}
      {backgroundColorDialog.value && (
        <Dialog
          onClose={backgroundColorDialog.onFalse}
          aria-labelledby="customized-dialog-title"
          open={backgroundColorDialog.value}
        >
          <DialogTitle sx={{ m: 0, p: 2, mr: 5 }} id="customized-dialog-title">
            Choose Background
          </DialogTitle>

          <IconButton
            aria-label="close"
            onClick={backgroundColorDialog.onFalse}
            sx={(theme) => ({
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <Iconify icon="material-symbols:close-rounded" />
          </IconButton>
          <DialogContent dividers>
            <HexColorPicker color={customBackgroundColor} onChange={setCustomBackgroundColor} />

            <Box sx={{ width: '100%', border: '1px solid black', p: 1, my: 1 }}>
              {customBackgroundColor}
            </Box>
            <Button
              sx={{
                backgroundColor: 'rgb(168, 186, 255)',
                color: 'black',
                width: '100%',
                border: '1px solid black',
              }}
              onClick={() => {
                backgroundColorDialog.onFalse();
                dispatch(
                  setTemplateData({
                    ...templateData,
                    colors: {
                      ...templateData?.colors, // Retain the existing colors object
                      light: {
                        ...templateData?.colors?.light, // Retain the existing light color object
                        background: customBackgroundColor, // Update only the button color
                      },
                      dark: {
                        ...templateData?.colors?.dark, // Retain the existing dark color object
                        background: customBackgroundColor, // Update only the button color
                      },
                    },
                  })
                );
              }}
            >
              Apply
            </Button>
          </DialogContent>
        </Dialog>
      )}

      {/* button palate */}
      {buttonColorDialog.value && (
        <Dialog
          onClose={buttonColorDialog.onFalse}
          aria-labelledby="customized-dialog-title"
          open={buttonColorDialog.value}
        >
          <DialogTitle sx={{ m: 0, p: 2, mr: 5 }} id="customized-dialog-title">
            Choose Buttons
          </DialogTitle>

          <IconButton
            aria-label="close"
            onClick={buttonColorDialog.onFalse}
            sx={(theme) => ({
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <Iconify icon="material-symbols:close-rounded" />
          </IconButton>
          <DialogContent dividers>
            <HexColorPicker color={customButtonColor} onChange={setCustomButtonColor} />

            <Box sx={{ width: '100%', border: '1px solid black', p: 1, my: 1 }}>
              {customButtonColor}
            </Box>
            <Button
              sx={{
                backgroundColor: 'rgb(168, 186, 255)',
                color: 'black',
                width: '100%',
                border: '1px solid black',
              }}
              onClick={() => {
                buttonColorDialog.onFalse();
                dispatch(
                  setTemplateData({
                    ...templateData,
                    colors: {
                      ...templateData?.colors, // Retain the existing colors object
                      light: {
                        ...templateData?.colors?.light, // Retain the existing light color object
                        buttons: customButtonColor, // Update only the button color
                      },
                      dark: {
                        ...templateData?.colors?.dark, // Retain the existing dark color object
                        buttons: customButtonColor, // Update only the button color
                      },
                    },
                  })
                );
              }}
            >
              Apply
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </Stack>
  );
}
