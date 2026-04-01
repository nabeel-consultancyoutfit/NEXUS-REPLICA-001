import { Theme, Components } from '@mui/material/styles';

const componentOverrides = (theme: Theme): Components => ({
  MuiButton: {
    styleOverrides: {
      root: {
        boxShadow: 'none',
        textTransform: 'none',
        borderRadius: '8px',
        '&:hover': {
          boxShadow: 'none',
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: '12px',
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
        boxShadow: 'none',
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: '8px',
      },
    },
  },
  MuiTableHead: {
    styleOverrides: {
      root: {
        backgroundColor: '#f5f5f5',
        '& th': {
          fontWeight: 600,
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: '6px',
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: '12px',
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: '#212B36',
        color: '#FFFFFF',
        fontSize: '12px',
      },
    },
  },
});

export default componentOverrides;
