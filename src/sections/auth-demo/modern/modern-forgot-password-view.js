'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import { Alert, Box } from '@mui/material';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------
export default function ModernForgotPasswordView() {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { forgotPassword } = useAuthContext();

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });
  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    getValues,
    formState: { isSubmitting, isValid },
  } = methods;

  const formValues = getValues();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await forgotPassword(data.email);
      setSuccess(res.message);
      setError('');
      setIsEmailSent(true);
    } catch (e) {
      console.error(e);
      setError(e.message);
      setIsEmailSent(false);
    }
  });

  const renderForm = (
    <Stack spacing={3} alignItems="center" sx={{ width: '125%' }}>
      <RHFTextField
        name="email"
        placeholder="Email"
        sx={{ '.MuiInputBase-input.MuiOutlinedInput-input': { fontWeight: 700, fontSize: 17 } }}
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
          justifyContent: 'center',
          pl: 2,
          pr: 1.5,
          mb: 3,
          borderRadius: '3rem',
          color: 'black',
          ...(isValid && { border: '1px solid black' }),
        }}
      >
        <Typography fontSize={17} fontWeight={700}>
          Send reset link
        </Typography>
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
        <Typography fontSize={14} fontWeight={500} color="black">
          Return to sign in
        </Typography>
      </Link>
    </Stack>
  );

  const renderHead = (
    <>
      <img src="/assets/icons/Julip.svg" alt="Julip" />
      <Stack
        spacing={1}
        sx={{
          my: 5,
        }}
      >
        <Typography fontSize={20} fontWeight={700} color="black">
          Reset Password
        </Typography>

        <Typography fontSize={16} fontWeight={500} color="black" align="center">
          Enter the email address connected to your account,
          <br />
          and we’ll send you a password reset link.
        </Typography>
      </Stack>
    </>
  );

  const renderResetEmail = (
    <Container>
      <img src="/assets/icons/Julip.svg" alt="Julip" />
      <Stack spacing={1} sx={{ my: 5 }}>
        <Typography fontSize={20} fontWeight={700} color="black">
          Check your email
        </Typography>

        <Typography fontSize={16} fontWeight={500} color="black">
          An email with steps to reset your password has been sent to <b>{formValues.email}</b>
        </Typography>
      </Stack>

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
        <Typography fontSize={14} fontWeight={500} color="black">
          Return to sign in
        </Typography>
      </Link>
    </Container>
  );
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!isEmailSent && renderHead}
        {(error || success) && (
          <Alert
            severity={error ? 'error' : 'success'}
            variant="outlined"
            sx={{ marginBottom: '1rem' }}
          >
            {error || success}
          </Alert>
        )}
        {!isEmailSent && renderForm}
        {isEmailSent && renderResetEmail}
      </Box>
    </FormProvider>
  );
}
