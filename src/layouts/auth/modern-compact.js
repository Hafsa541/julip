import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
//
import { HeaderSimple as Header } from '../_common';

// ----------------------------------------------------------------------

export default function AuthModernCompactLayout({ children }) {
  return (
    <>
      {/* <Header /> */}

      <Box
        component="main"
        sx={{
          py: 12,
          display: 'flex',
          minHeight: '100vh',
          textAlign: 'center',
          px: { xs: 2, md: 0 },
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
          '&:before': {
            width: 1,
            height: 1,
            zIndex: -1,
            content: "''",
            // opacity: 0.24,
            position: 'absolute',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundImage: 'url(/assets/background/signinPage.svg)',
          },
        }}
      >
        <Card
          sx={{
            py: 5,
            px: 3,
            minWidth: 800,
            // maxWidth: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </Card>
      </Box>
    </>
  );
}

AuthModernCompactLayout.propTypes = {
  children: PropTypes.node,
};
