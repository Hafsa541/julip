import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

// SETUP COLORS
const disabled = '#F8F4F9';
const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

const SECONDARY = {
  lighter: '#E4FFCC', // Lighter version of #DCFFBA
  light: '#B4FF7A', // Slightly lighter version
  main: '#DCFFBA', // Your main color
  dark: '#A4C77D', // Darker version of #DCFFBA
  darker: '#6E8B3C', // Even darker version of #DCFFBA
  contrastText: '#FFFFFF',
};

const PRIMARY = {
  lighter: '#B4C6FF', // Lighter version of #A8BAFF
  light: '#A0B8FF', // Slightly lighter version
  main: '#A8BAFF', // Your main color
  dark: '#5E77FF', // Darker version of #A8BAFF
  darker: '#3A59CC', // Even darker version of #A8BAFF
  contrastText: '#FFFFFF',
};

const INFO = {
  lighter: '#CAFDF5',
  light: '#61F3F3',
  main: '#00B8D9',
  dark: '#006C9C',
  darker: '#003768',
  contrastText: '#FFFFFF',
};

const SUCCESS = {
  lighter: '#D3FCD2',
  light: '#77ED8B',
  main: '#22C55E',
  dark: '#118D57',
  darker: '#065E49',
  contrastText: '#ffffff',
};

const WARNING = {
  lighter: '#FFF5CC',
  light: '#FFD666',
  main: '#FFAB00',
  dark: '#B76E00',
  darker: '#7A4100',
  contrastText: GREY[800],
};

const ERROR = {
  lighter: '#FFB8D0', // Lighter version of #FD5065
  light: '#FF7D9A', // Slightly lighter version
  main: '#FD5065', // Your main color
  dark: '#D13E56', // Darker version of #FD5065
  darker: '#9C1F3F', // Even darker version of #FD5065
  contrastText: '#FFFFFF',
};

const COMMON = {
  common: {
    black: '#000000',
    white: '#FFFFFF',
  },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  disabled,
  divider: alpha(GREY[500], 0.2),
  action: {
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    // disabledBackground: alpha(GREY[500], 0.24),
    disabledBackground: disabled,
    focus: alpha(GREY[500], 0.24),
    // hoverOpacity: 0.08,
    hoverOpacity: 0,
    disabledOpacity: 0.48,
  },
};

export function palette(mode) {
  const light = {
    ...COMMON,
    mode: 'light',
    text: {
      primary: GREY[800],
      secondary: GREY[600],
      disabled: GREY[500],
    },
    background: {
      paper: '#FFFFFF',
      default: '#FFFFFF',
      neutral: GREY[200],
      disabled,
    },
    action: {
      ...COMMON.action,
      active: GREY[600],
    },
  };

  const dark = {
    ...COMMON,
    mode: 'dark',
    text: {
      primary: '#FFFFFF',
      secondary: GREY[500],
      disabled: GREY[600],
    },
    background: {
      paper: GREY[800],
      default: GREY[900],
      neutral: alpha(GREY[500], 0.12),
    },
    action: {
      ...COMMON.action,
      active: GREY[500],
    },
  };

  return mode === 'light' ? light : dark;
}
