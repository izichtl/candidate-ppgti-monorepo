import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// TODO AJUSTAR O TEMA DE CORES COM BASE
// NO CSS DO IFPB

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: '#216723',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
