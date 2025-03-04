'use client';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import { isEmpty } from 'lodash';
import { useSelector } from 'src/app/redux/store';

import { useSettingsContext } from 'src/components/settings';
import FormProvider from 'src/components/hook-form';
import {
  useGetPredefinedTemplatesQuery,
  useGetProfileQuery,
  useGetTemplateDetailsQuery,
  useUpdateTemplateMutation,
} from 'src/app/redux/slices/apiSlice';

import { useSnackbar } from 'src/components/snackbar';
import TemplatesColors from './components/template-colors';
import TemplateTheme from './components/template-theme';
import TemplateThemeMode from './components/template-theme-mode';
import TemplateFonts from './components/tempalte-featured-fonts';
import TemplatePreview from '../predefined-templates/view';

// ----------------------------------------------------------------------

export default function TemplatesView() {
  const settings = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();

  const { data: profile, error, isLoading } = useGetProfileQuery();
  const {
    data: templateDetails,
    error: errorDetails,
    isLoading: isLoadingDetails,
  } = useGetTemplateDetailsQuery();
  const [updateTemplate] = useUpdateTemplateMutation();

  const templateData = useSelector((state) => state?.template?.data);
  const TemplateID = useSelector((state) => state?.auth?.user?.template);

  const TemplateSchema = Yup.object().shape({
    colors: Yup.object().shape({
      dark: Yup.object().shape({
        main: Yup.string(),
        background: Yup.string(),
        buttons: Yup.string(),
      }),
      light: Yup.object().shape({
        main: Yup.string(),
        background: Yup.string(),
        buttons: Yup.string(),
      }),
    }),
    fonts: Yup.object().shape({
      header: Yup.string(),
      body: Yup.string(),
    }),
    name: Yup.string(),
    mode: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      colors: templateData?.colors || { main: '', background: '', buttons: '' },
      fonts: templateData?.fonts || { header: '', body: '' },
      _id: templateData?._id || '', // skip
      name: templateData?.name || '',
      mode: templateData?.mode || '',
    }),
    [templateData]
  );

  const methods = useForm({
    resolver: yupResolver(TemplateSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (!isEmpty(templateData)) {
      reset({
        colors: templateData?.colors || { main: '', background: '', buttons: '' },
        fonts: templateData?.fonts || { header: '', body: '' },
        _id: templateData?._id || '', // skip
        name: templateData?.name || '',
        mode: templateData?.mode || '',
      });
    }
  }, [templateData, reset]);

  const onSubmit = handleSubmit(async (data, query) => {
    try {
      const res = await updateTemplate({
        query,
        data,
      });
      enqueueSnackbar(res?.data?.message, {
        variant: 'success',
        anchorOrigin: { horizontal: 'center', vertical: 'top' },
      });
      console.log('Updated Template', res);
    } catch (e) {
      enqueueSnackbar(error?.message, {
        variant: 'error',
        anchorOrigin: { horizontal: 'center', vertical: 'top' },
      });
      console.error(e);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Container maxWidth={settings?.themeStretch ? false : 'xl'}>
        <Grid
          container
          sx={{
            mt: -1,
            minHeight: '100%',
          }}
        >
          <Grid item xs={12} md={7} sx={{ borderRight: '1px solid #ccc' }}>
            <Container disableGutters sx={{ pr: 2, mt: 3 }}>
              <Typography fontSize={30} fontWeight="bold" sx={{ mb: 0.5 }}>
                Design
              </Typography>
              <Box
                spacing={3}
                sx={{
                  borderRadius: 2,
                  border: '1px solid #E7E7E7',
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  mr: 3,
                  ml: 1,
                }}
              >
                <TemplateTheme />
                <TemplateThemeMode />
                <TemplatesColors />
                <TemplateFonts />
              </Box>
              <Box
                sx={{
                  mx: 3,
                  display: 'flex',
                  justifyContent: 'right',
                }}
              >
                <LoadingButton
                  type="button"
                  onClick={() => onSubmit('draft')}
                  variant="outlined"
                  color="secondary"
                  isLoading={isSubmitting}
                  sx={{
                    color: 'black',
                    border: '1px solid black',
                    my: 2,
                    mx: 1,
                    p: 1.25,
                    px: 5,
                  }}
                >
                  <Typography fontWeight={700} fontSize={16}>
                    Save
                  </Typography>
                </LoadingButton>

                <LoadingButton
                  type="button"
                  onClick={() => onSubmit('published')}
                  variant="contained"
                  color="secondary"
                  isLoading={isSubmitting}
                  sx={{
                    color: 'black',
                    border: '1px solid black',
                    my: 2,
                    p: 1.25,
                    px: 5,
                  }}
                >
                  <Typography fontWeight={700} fontSize={16}>
                    Publish
                  </Typography>
                </LoadingButton>
              </Box>
            </Container>
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              pl: 2,
              pt: 2,
            }}
          >
            <Box sx={{ p: 0, m: 0, position: 'fixed' }}>
              <TemplatePreview />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </FormProvider>
  );
}
