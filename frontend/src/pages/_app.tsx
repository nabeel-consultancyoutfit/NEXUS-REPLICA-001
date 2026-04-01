import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from 'notistack';
import { store } from '@/redux/store';
import theme from '@/theme';
import { AuthProvider } from '@/contexts/AuthContext';
import { SnackbarUtilsConfigurator } from '@/lib/snackbar';
import ErrorBoundary from '@/components/ErrorBoundary';
import MainLayout from '@/layout/MainLayout';
import '@/styles/globals.css';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <SnackbarUtilsConfigurator />
            <ErrorBoundary>{getLayout(<Component {...pageProps} />)}</ErrorBoundary>
          </SnackbarProvider>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}
