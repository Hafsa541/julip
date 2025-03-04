import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Box } from '@mui/system';
import { Typography, Button, Snackbar, SnackbarContent } from '@mui/material';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
// theme
import { bgBlur } from 'src/theme/css';
// hooks
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
// components
import Logo from 'src/components/logo';
import SvgColor from 'src/components/svg-color';
import Iconify from 'src/components/iconify';
import { useAuthContext } from 'src/auth/hooks';
import { useSettingsContext } from 'src/components/settings';
//
import { HEADER, NAV } from '../config-layout';
import {
  Searchbar,
  AccountPopover,
  SettingsButton,
  LanguagePopover,
  ContactsPopover,
  NotificationsPopover,
} from '../_common';

// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
  const theme = useTheme();

  const { authenticated, method, user } = useAuthContext();
  const [url, setUrl] = useState(`${window.location.origin}/${user?.userName}`);
  const [open, setOpen] = useState(false);
  const settings = useSettingsContext();

  const isNavHorizontal = settings.themeLayout === 'horizontal';

  const isNavMini = settings.themeLayout === 'mini';

  const lgUp = useResponsive('up', 'lg');

  const offset = useOffSetTop(HEADER.H_DESKTOP);

  const offsetTop = offset && !isNavHorizontal;

  const handleCopyClick = async () => {
    try {
      await window.navigator.clipboard.writeText(url);
      // alert('Copied to clipboard!');
      setOpen(true);
    } catch (err) {
      console.error('Unable to copy to clipboard.', err);
      alert('Copy to clipboard failed.');
    }
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const renderContent = (
    <>
      {lgUp && isNavHorizontal && <Logo sx={{ mr: 2.5 }} />}

      {!lgUp && (
        <IconButton onClick={onOpenNav}>
          <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" />
        </IconButton>
      )}

      {/* <Searchbar /> */}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: 600,
          width: '100%',
          borderRadius: 3,
          pl: 3,
          height: 40,
          backgroundColor: '#E7E7E74D',
        }}
      >
        {/* <Box>www.myjulip.com/{user.userName}</Box> */}
        <Box onChange={(e) => setUrl(e.target.value)}>
          <Typography fontSize={16} fontWeight={600} color="initial">
            {url}
          </Typography>
        </Box>

        <Snackbar
          open={open}
          autoHideDuration={1500}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <SnackbarContent
            message="Profile URL Copied to Clipboard"
            sx={{
              backgroundColor: 'white',
              color: 'black',
            }}
          />
        </Snackbar>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCopyClick}
          sx={{
            color: 'black',
            px: 2,
            borderRadius: 3,
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
            },
            maxWidth: 130,
          }}
        >
          <Box sx={{ borderRadius: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Iconify icon="radix-icons:copy" />
            <Typography fontSize={16} fontWeight={600} color="initial">
              Copy URL
            </Typography>
          </Box>
        </Button>
      </Box>

      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1 }}
      >
        {/* <LanguagePopover />

        <NotificationsPopover />

        <ContactsPopover />

        <SettingsButton /> */}

        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.W_VERTICAL + 1}px)`,
          height: HEADER.H_DESKTOP,
          ...(offsetTop && {
            height: HEADER.H_DESKTOP_OFFSET,
          }),
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: 'background.default',
            height: HEADER.H_DESKTOP_OFFSET,
            borderBottom: `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_MINI + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
          borderBottom: '1px solid #ccc',
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
