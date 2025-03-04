'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { Divider, Box, Container } from '@mui/material';
// routes

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useSearchParams, useRouter } from 'src/routes/hooks';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const { login } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login?.(data.email, data.password);
      reset();
      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack
      sx={{
        mb: 5,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container sx={{ marginY: 2 }}>
        <img src="/assets/icons/Julip.svg" alt="Julip" width={82} />
      </Container>

      <Typography fontSize={20} fontWeight={700}>
        Welcome Back!
      </Typography>

      <Typography fontSize={16} fontWeight={500}>
        Sign in to your Julip account.
      </Typography>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && (
        <Alert severity="error" variant="outlined">
          {errorMsg}
        </Alert>
      )}

      <RHFTextField
        name="email"
        placeholder="Email or Username"
        sx={{
          '& .MuiInputBase-input.MuiOutlinedInput-input': {
            fontSize: 17,
            fontWeight: 500,
          },
        }}
      />

      <RHFTextField
        name="password"
        placeholder="Password"
        type={password.value ? 'text' : 'password'}
        sx={{
          '& .MuiInputBase-input.MuiOutlinedInput-input': {
            fontSize: 17,
            fontWeight: 500,
          },
        }}
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

      <Link
        variant="body2"
        color="inherit"
        underline="always"
        component={RouterLink}
        href={paths.authDemo.modern.forgotPassword}
        sx={{ alignSelf: 'center', color: 'black' }}
      >
        <Typography fontSize={14} fontWeight={500}>
          Forgot password?
        </Typography>
      </Link>

      <LoadingButton
        fullWidth
        color="secondary"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        disabled={!isValid}
        sx={{
          border: '1px solid #CFCFCF',
          borderRadius: 100,
          color: '#000',
          ...(isValid && { border: '1px solid black' }),
        }}
      >
        Continue
      </LoadingButton>

      <Divider>
        <Typography color="black" fontSize={16} fontWeight={500}>
          or
        </Typography>
      </Divider>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="outlined"
        sx={{
          border: '1px solid #CFCFCF',
          borderRadius: 100,
          color: '#000',
        }}
      >
        <img src="/assets/icons/social-media/Google.svg" alt="google" />
        <Typography fontWeight={700} sx={{ padding: '0 10px' }}>
          Sign in with Google
        </Typography>
      </LoadingButton>
      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="outlined"
        sx={{
          border: '1px solid #CFCFCF',
          borderRadius: 100,
          color: '#000',
        }}
      >
        <img src="/assets/icons/apple.svg" alt="apple" />
        <Typography fontWeight={700} sx={{ padding: '0 10px' }}>
          Sign in with Apple
        </Typography>
      </LoadingButton>

      <Typography textAlign="center" fontSize={16} fontWeight={500} color="black" inline>
        Not a member?
        <Typography
          component={RouterLink}
          href={paths.auth.jwt.register}
          sx={{ marginLeft: '2px' }}
          inline
          textAlign="center"
          fontSize={16}
          fontWeight={700}
          color="black"
        >
          Sign up.
        </Typography>
      </Typography>
    </Stack>
  );

  return (
    <Container
      sx={{
        backgroundColor: '#fff',
        borderRadius: 2,
        marginY: 5,
        '&.MuiContainer-root': {
          padding: '5rem',
        },
      }}
      maxWidth="md"
    >
      <Box sx={{ minWidth: '600px' }}>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          {renderHead}

          {renderForm}
        </FormProvider>
      </Box>
    </Container>
  );
}
