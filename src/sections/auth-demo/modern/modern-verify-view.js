'use client';

import { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';

// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
// routes
import { Container } from '@mui/system';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// components
import FormProvider, { RHFCode } from 'src/components/hook-form';
// assets

import { useAuthContext } from 'src/auth/hooks';
import { useSelector } from 'src/app/redux/store';

// ----------------------------------------------------------------------

export default function ModernVerifyView() {
  const router = useRouter();
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [successResend, setSuccessResend] = useState('');
  const [errorResend, setErrorResend] = useState('');
  const email = useSelector((state) => state.auth?.user?.email);
  const { verifyEmail, resendCode, logout } = useAuthContext();

  const VerifySchema = Yup.object().shape({
    code: Yup.string().min(6, 'Code must be at least 6 characters').required('Code is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const defaultValues = {
    code: '',
    email: email ?? '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifySchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await verifyEmail({ ...data, email });
      setSuccess(res.success);
      setError('');
      router?.replace(paths.authDemo.modern.setProfile);
    } catch (e) {
      console.error(e);
      setError(e.message);
      setSuccess('');
    }
  });
  const handleResendCode = async () => {
    try {
      const res = await resendCode({ email });
      setSuccessResend(res.success);
      setErrorResend('');
    } catch (e) {
      console.error(e);
      setErrorResend(e.message);
      setSuccessResend('');
    }
  };

  const renderForm = (
    <Stack spacing={3} alignItems="center">
      <RHFCode name="code" />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="secondary"
        loading={isSubmitting}
        disabled={!isValid}
        sx={{
          border: '1px solid #ccc',
          color: 'black',
          ...(isValid && {
            border: '1px solid black',
          }),
        }}
      >
        Continue
      </LoadingButton>

      <Typography variant="body2" onClick={handleResendCode}>
        <Link
          color="inherit"
          underline="always"
          sx={{
            cursor: 'pointer',
          }}
        >
          Resend code
        </Link>
      </Typography>

      <Typography variant="body2" sx={{ position: 'absolute', bottom: 0 }}>
        Already have an account?
        <Link
          component={RouterLink}
          href={paths.auth.jwt.login}
          color="inherit"
          underline="always"
          fontWeight="bold"
          ml={1}
          onClick={() => logout()}
        >
          Log in.
        </Link>
      </Typography>
    </Stack>
  );

  const renderHead = (
    <>
      <img src="/assets/icons/Julip.svg" alt="Julip" />

      <Stack spacing={1} sx={{ my: 5 }}>
        <Typography variant="h3">Confirm your email</Typography>

        <Typography variant="body2" fontWeight={500}>
          We sent code to{' '}
          <Typography variant="body" fontWeight={700}>
            {email}
          </Typography>
          .
        </Typography>

        <Typography variant="body2">Please enter it here:</Typography>
      </Stack>
    </>
  );

  return (
    <Container
      maxWidth="sm"
      sx={{
        padding: '100px !important',
        paddingTop: '0 !important',
        position: 'relative',
      }}
    >
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
    </Container>
  );
}
