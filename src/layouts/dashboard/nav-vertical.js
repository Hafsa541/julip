'use client';

import PropTypes from 'prop-types';
import { useEffect } from 'react';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import { Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
// components
import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';
import { usePathname } from 'src/routes/hooks';
import { NavSectionVertical } from 'src/components/nav-section';
//
import { NAV } from '../config-layout';
import { useNavData } from './config-navigation';
import { NavToggleButton } from '../_common';

// ----------------------------------------------------------------------

export default function NavVertical({ openNav, onCloseNav }) {
  const { user } = useMockedUser();

  const pathname = usePathname();

  const lgUp = useResponsive('up', 'lg');

  const navData = useNavData();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
        backgroundColor: '#F8F4F9',
      }}
    >
      <Logo sx={{ mt: 3, ml: 4, mb: 8 }} />

      <NavSectionVertical
        data={navData}
        config={{
          currentRole: user?.role || 'admin',
        }}
      />

      {/* <Box sx={{ flexGrow: 1, position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            px: 2,
          }}
        >
          <Iconify icon="qlementine-icons:question-16" mt={0.5} size={64} color="black" />

          <Stack spacing={0}>
            <Typography ml={0.5} color="black">
              Have a question or a technical problem?
            </Typography>
            <Typography ml={0.5} color="black">
              Email us at: <strong>hello@myjulip.com</strong>
            </Typography>
          </Stack>
        </Box>
      </Box> */}
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_VERTICAL },
      }}
    >
      <NavToggleButton />

      {lgUp ? (
        <Stack
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.W_VERTICAL,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Stack>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.W_VERTICAL,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

NavVertical.propTypes = {
  onCloseNav: PropTypes.func,
  openNav: PropTypes.bool,
};
