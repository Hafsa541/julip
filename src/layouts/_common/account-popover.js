import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

// auth
import { useAuthContext } from 'src/auth/hooks';
// components

import { useSnackbar } from 'src/components/snackbar';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useSelector } from 'src/app/redux/store';
import Iconify from 'src/components/iconify';
// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: 'Settings',
    linkTo: paths.dashboard.settings,
  },
  {
    label: 'Payments',
    linkTo: '/',
  },
  {
    label: 'Billings',
    linkTo: '/',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const router = useRouter();

  // const { user } = useMockedUser();
  const profileData = useSelector((state) => state?.profile?.data);
  const authUserData = useSelector((state) => state?.auth?.user);

  const { logout } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const popover = usePopover();

  const handleLogout = async () => {
    try {
      await logout();
      popover.onClose();
      router.replace('/');
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  const handleClickItem = (path) => {
    popover.onClose();
    router.push(path);
  };

  return (
    <>
      <Avatar
        src={profileData?.image}
        alt={authUserData?.avatar}
        sx={{
          width: 50,
          height: 50,
          border: (theme) => `solid 2px ${theme.palette.background.default}`,
        }}
      />
      <Typography fontWeight={700} fontSize={16} color="black" noWrap>
        @{authUserData?.fullName}
      </Typography>
      <Iconify
        icon={popover.open ? 'iconamoon:arrow-up-2-thin' : 'iconamoon:arrow-down-2-thin'}
        onClick={popover.onOpen}
        color="black"
        width={26}
        height={26}
        sx={{ cursor: 'pointer' }}
      />

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 200, p: 0 }}>
        <Box
          sx={{
            p: 2,
            pb: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Avatar
            src={profileData?.image}
            alt={authUserData?.avatar}
            sx={{
              width: 42,
              height: 42,
              border: (theme) => `solid 2px ${theme.palette.background.default}`,
            }}
          />
          <Box sx={{ width: '80%', ml: 0.5 }}>
            <Typography fontWeight={700} fontSize={16} color="black" noWrap>
              @{authUserData?.fullName}
            </Typography>
            <Typography variant="subtitle2" color="#6c6c6c" noWrap>
              myjulip.com/{authUserData?.userName}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
              <img
                src={`/assets/icons/header/${option.label.toLowerCase()}.svg`}
                alt="signout"
                color="black"
                width={16}
                height={16}
              />
              <Typography color="black" fontSize={16} fontWeight={500} ml={1}>
                {option.label}
              </Typography>
            </MenuItem>
          ))}

          {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}

          <MenuItem onClick={handleLogout}>
            <img
              src="/assets/icons/header/signout.svg"
              alt="signout"
              color="black"
              width={16}
              height={16}
              style={{ transform: 'rotate(180deg)' }}
            />

            <Typography color="black" fontSize={16} fontWeight={500} ml={1}>
              Sign out
            </Typography>
          </MenuItem>
        </Stack>
      </CustomPopover>
    </>
  );
}
