'use client';

// @mui

import { Container } from '@mui/system';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// routes
import { paths } from 'src/routes/paths';

import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export default function JwtOnboardingView() {
  const router = useRouter();

  const renderHead = (
    <Stack
      spacing={2}
      sx={{
        mb: 5,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '50%',
      }}
    >
      <img src="/assets/icons/Julip.svg" alt="Julip" />

      <Typography fontSize={20} fontWeight={700} align="center" width={450} sx={{ mt: 5 }}>
        Get ready to earn more and secure more brand deals with Julip!🥳
      </Typography>
      <Typography fontSize={16} fontWeight={600} align="center">
        Please log in or sign up with a valid email to access the fastest website builder you’ve
        ever seen.
      </Typography>
      <Container sx={{ display: 'flex', alignItems: 'center', mt: 8 }}>
        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={() => router.replace(paths.auth.jwt.login)}
          sx={{
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '3rem',
            border: '1px solid black',
            mx: 1,
          }}
        >
          Login
        </Button>
        <Button
          fullWidth
          color="secondary"
          size="large"
          type="submit"
          variant="contained"
          onClick={() => router.replace(paths.auth.jwt.register)}
          sx={{
            color: 'black',
            borderRadius: '3rem',
            border: '1px solid black',
          }}
        >
          Signup
        </Button>
      </Container>
    </Stack>
  );

  return (
    <Container
      sx={{
        minWidth: '500px',
        maxWidth: '720px',
        background: 'white',
        borderRadius: '2rem',
        margin: '30px',
        pt: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {renderHead}
    </Container>
  );
}
