import { createTheme } from '@mui/material/styles';

// Centralized color palette - Luxury Gold & Black Theme
const luxuryPalette = {
  primary: '#D4AF37', // Luxury gold
  primaryLight: '#E8D5A8', // Light gold
  primaryDark: '#B8941D', // Dark gold
  secondary: '#1a1a1a', // Deep black
  accent: '#D4AF37', // Gold accent
  
  // Neutral colors
  white: '#FFFFFF',
  black: '#1a1a1a',
  gray50: '#FEFDFB',    // Warm cream
  gray100: '#FAF9F6',
  gray200: '#F5F3F0',
  gray300: '#E8E6E1',
  gray400: '#D9D5CF',
  gray500: '#C4BFBA',
  gray600: '#989390',
  gray700: '#6F6A64',
  gray800: '#4A4844',
  gray900: '#2a2a2a',    // Sophisticated dark gray
  
  // Status colors
  success: '#5BA87C',
  warning: '#D8A156',
  error: '#D97E6F',
  info: '#7BA8C4',
};

// Create Material-UI theme
export const theme = createTheme({
  palette: {
    primary: {
      main: luxuryPalette.primary,
      light: luxuryPalette.primaryLight,
      dark: luxuryPalette.primaryDark,
      contrastText: luxuryPalette.white,
    },
    secondary: {
      main: luxuryPalette.secondary,
      light: luxuryPalette.accent,
      dark: luxuryPalette.secondary,
      contrastText: luxuryPalette.white,
    },
    success: {
      main: luxuryPalette.success,
    },
    warning: {
      main: luxuryPalette.warning,
    },
    error: {
      main: luxuryPalette.error,
    },
    info: {
      main: luxuryPalette.info,
    },
    background: {
      default: luxuryPalette.gray50,
      paper: luxuryPalette.white,
    },
    text: {
      primary: luxuryPalette.gray900,
      secondary: luxuryPalette.gray600,
    },
    divider: luxuryPalette.gray200,
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      color: luxuryPalette.gray900,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: luxuryPalette.gray900,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      color: luxuryPalette.gray900,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: luxuryPalette.gray900,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: luxuryPalette.gray900,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: luxuryPalette.gray900,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: luxuryPalette.gray800,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: luxuryPalette.gray700,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: `0 8px 20px rgba(212, 175, 55, 0.15)`,
          },
        },
        contained: {
          backgroundColor: luxuryPalette.primary,
          color: luxuryPalette.white,
          '&:hover': {
            backgroundColor: luxuryPalette.primaryDark,
          },
        },
        outlined: {
          borderColor: luxuryPalette.primary,
          color: luxuryPalette.primary,
          '&:hover': {
            backgroundColor: luxuryPalette.gray50,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          border: '1px solid rgba(212, 175, 55, 0.1)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
          transition: 'all 0.3s ease',
          backgroundColor: luxuryPalette.white,
          '&:hover': {
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(-2px)',
            borderColor: 'rgba(212, 175, 55, 0.2)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: luxuryPalette.primary,
            },
            '&.Mui-focused fieldset': {
              borderColor: luxuryPalette.primary,
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: luxuryPalette.white,
          color: luxuryPalette.gray900,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
          borderBottom: `1px solid ${luxuryPalette.gray200}`,
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
});

// Export colors for use in components
export const colors = luxuryPalette;
