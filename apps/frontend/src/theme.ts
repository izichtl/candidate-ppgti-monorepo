import { createTheme } from '@mui/material/styles';
import '@fontsource/open-sans';

const ppgtiTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1e3a8a',
      light: '#3b82f6',
      dark: '#172554',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#06b6d4',
      light: '#67e8f9',
      dark: '#0891b2',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#475569',
    },
    background: {
      default: '#f1f5f9',
      paper: '#ffffff',
    },
    success: {
      main: '#10b981',
      contrastText: '#fff',
    },
    warning: {
      main: '#f59e0b',
    },
    error: {
      main: '#ef4444',
    },
    info: {
      main: '#3b82f6',
    },
  },
  typography: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: 14,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: { fontSize: '2.5rem', fontWeight: 700 },
    h2: { fontSize: '2rem', fontWeight: 700 },
    h3: { fontSize: '1.75rem', fontWeight: 700 },
    h4: { fontSize: '1.5rem', fontWeight: 600 },
    h5: { fontSize: '1.25rem', fontWeight: 600 },
    h6: { fontSize: '1rem', fontWeight: 600 },
    button: { textTransform: 'none' },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
});

const ifpbTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#007236',
      light: '#00a54f',
      dark: '#005026',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ed3236',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#1e1e1e',
      secondary: '#4f4f4f',
    },
    background: {
      default: '#ffffff',
      paper: '#f9f9f9',
    },
    grey: {
      500: '#bfbebf',
    },
    success: {
      main: '#007236',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#f59e0b',
    },
    error: {
      main: '#ed3236',
    },
    info: {
      main: '#1976d2',
    },
  },
  typography: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: 14,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: { fontSize: '2.5rem', fontWeight: 700 },
    h2: { fontSize: '2rem', fontWeight: 700 },
    h3: { fontSize: '1.75rem', fontWeight: 700 },
    h4: { fontSize: '1.5rem', fontWeight: 600 },
    h5: { fontSize: '1.25rem', fontWeight: 600 },
    h6: { fontSize: '1rem', fontWeight: 600 },
    button: { textTransform: 'none' },
  },
  shape: {
    borderRadius: 4,
  },
  spacing: 8,
});

const themeName = 'PPGTI';
// @ts-expect-error
const theme = themeName === 'IFPB' ? ifpbTheme : ppgtiTheme;
export default theme;
