import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    action: {
      disabled: "white",

    },
    background: {
      default: '#121212',
      paper: '#121212',
    },
    text: {
      primary: '#fff',
      secondary: '#19857b',
    },
    primary: {
      main: '#19857b',
      error: red.A400
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
      danger: '#e53e3e',
    },
  },
});

export default theme;