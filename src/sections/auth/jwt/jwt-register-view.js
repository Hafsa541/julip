'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import { Container, Box } from '@mui/system';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { Divider } from '@mui/material';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// routes
import { paths } from 'src/routes/paths';

import { RouterLink } from 'src/routes/components';
import { useSearchParams, useRouter } from 'src/routes/hooks';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
// auth
import { useAuthContext } from 'src/auth/hooks';
// comment
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function JwtRegisterView() {
  const { register } = useAuthContext();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');
  const password = useBoolean();

  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string().required('First name required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    fullName: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await register?.(data.email, data.password, data.fullName);

      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack
      spacing={2}
      sx={{
        mb: 5,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <img src="/assets/icons/Julip.svg" alt="Julip" />

      <Typography fontSize={20} fontWeight={700} align="center" color="black" sx={{ width: '75%' }}>
        Get ready to earn more and secure more brand deals with Julip!🥳
      </Typography>
      <Typography fontSize={16} fontWeight={600} color="black">
        Sign up for free!
      </Typography>
    </Stack>
  );

  const renderForm = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack spacing={2.5} width="80%">
        {!!errorMsg && (
          <Alert severity="error" variant="outlined">
            {errorMsg}
          </Alert>
        )}

        <RHFTextField
          name="fullName"
          label="Full name"
          sx={{ '.MuiInputBase-input.MuiOutlinedInput-input': { fontWeight: 700 } }}
          // InputProps={{
          //   endAdornment: (
          //     <InputAdornment position="end">
          //       <Iconify icon="teenyicons:tick-circle-outline" />
          //     </InputAdornment>
          //   ),
          // }}
        />
        <RHFTextField
          name="email"
          label="Email address"
          sx={{ '.MuiInputBase-input.MuiOutlinedInput-input': { fontWeight: 700 } }}
          // InputProps={{
          //   endAdornment: (
          //     <InputAdornment position="end">
          //       <Iconify icon="teenyicons:tick-circle-outline" />
          //     </InputAdornment>
          //   ),
          // }}
        />

        <RHFTextField
          name="password"
          label="Password"
          type={password.value ? 'text' : 'password'}
          sx={{ '.MuiInputBase-input.MuiOutlinedInput-input': { fontWeight: 700 } }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          color="secondary"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          disabled={!isValid}
          sx={{
            color: 'black',
            borderRadius: '3rem',
            ...(isValid && { border: '1px solid black' }),
          }}
        >
          Continue
        </LoadingButton>
      </Stack>
    </Box>
  );

  const renderThirdPartySignupBtns = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack
        width="80%"
        spacing={2}
        sx={{
          color: 'text.secondary',
          mt: 2.5,
          typography: 'caption',
          textAlign: 'center',
        }}
      >
        <Divider>
          <Typography color="black" fontSize={16} fontWeight={500}>
            or
          </Typography>
        </Divider>
        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          variant="outlined"
          sx={{
            border: '1px solid #CFCFCF',
            borderRadius: 100,
            color: '#000',
          }}
        >
          <img src="/assets/icons/social-media/Google.svg" alt="google" />
          <Typography fontWeight={700} fontSize={17} sx={{ padding: '0 10px' }}>
            Sign up with Google
          </Typography>
        </LoadingButton>
        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          variant="outlined"
          sx={{
            border: '1px solid #CFCFCF',
            borderRadius: 100,
            color: '#000',
          }}
        >
          <img src="/assets/icons/apple.svg" alt="apple" />
          <Typography fontWeight={700} fontSize={17} sx={{ padding: '0 10px' }}>
            Sign up with Apple
          </Typography>
        </LoadingButton>
        <Typography textAlign="center" fontSize={16} fontWeight={500} color="black" inline>
          Already have an account?
          <Typography
            component={RouterLink}
            href={paths.auth.jwt.login}
            sx={{ marginLeft: '2px' }}
            inline
            textAlign="center"
            fontSize={16}
            fontWeight={700}
            color="black"
          >
            Log in.
          </Typography>
        </Typography>
        .
      </Stack>
    </Box>
  );

  return (
    <Container
      sx={{
        backgroundColor: '#fff',
        borderRadius: 2,
        marginY: 5,
        '&.MuiContainer-root': {
          px: '5rem',
          pt: '2rem',
        },
      }}
    >
      <Box
        sx={{
          minWidth: '600px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FormProvider methods={methods} onSubmit={onSubmit}>
          {renderHead}

          {renderForm}

          {renderThirdPartySignupBtns}
        </FormProvider>
      </Box>
    </Container>
  );
}
