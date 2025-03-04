'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export default function ModernResetPasswordView() {
  const password = useBoolean();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { resetPassword } = useAuthContext();

  const NewPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const defaultValues = {
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(NewPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const updatedData = {
        newPassword: data.password,
        token: window.location.search.split('=')[1],
      };
      const res = await resetPassword(updatedData);
      reset();
      setSuccess(res.success);
      setError('');
    } catch (e) {
      console.error(e);
      setError(e.message);
      setSuccess('');
    }
  });

  const renderForm = (
    <Stack spacing={3} alignItems="center">
      <RHFTextField
        name="password"
        label="Password"
        type={password.value ? 'text' : 'password'}
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

      <RHFTextField
        name="confirmPassword"
        label="Confirm New Password"
        type={password.value ? 'text' : 'password'}
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
        size="large"
        type="submit"
        variant="contained"
        color="secondary"
        loading={isSubmitting}
        disabled={!isValid}
        sx={{
          borderRadius: '3rem',
          ...(isValid && { border: '1px solid black', color: 'black' }),
        }}
      >
        Update Password
      </LoadingButton>

      <Link
        component={RouterLink}
        href={paths.auth.jwt.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={16} />
        Return to sign in
      </Link>
    </Stack>
  );

  const renderHead = (
    <>
      <img src="/assets/icons/Julip.svg" alt="Julip" />

      <Stack spacing={1} sx={{ my: 5 }}>
        <Typography variant="h4">Reset Password</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Enter a new password below to change your password
        </Typography>
      </Stack>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}
      {(error || success) && (
        <Alert
          severity={error ? 'error' : 'success'}
          variant="outlined"
          sx={{ marginBottom: '1rem' }}
        >
          {error || success}
        </Alert>
      )}
      {renderForm}
    </FormProvider>
  );
}
