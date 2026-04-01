import { createTheme, Theme } from '@mui/material/styles';
import { enUS } from '@mui/material/locale';
import palette from './palette';
import typography from './typography';
import shadows from './shadows';
import componentOverrides from './overrides';

const theme: Theme = createTheme(
  {
    palette,
    typography,
    shadows,
  },
  enUS,
);

// Apply component overrides after theme creation
theme.components = componentOverrides(theme);

export default theme;
