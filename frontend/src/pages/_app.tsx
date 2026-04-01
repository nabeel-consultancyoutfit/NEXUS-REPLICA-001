/**
 * _app.tsx — application shell.
 *
 * Provider order (required — do not reorder):
 *   Redux Provider         — must be outermost so RTK Query works
 *     AuthProvider         — reads from Redux, provides user state to the tree
 *       getLayout(page)    — per-page layout (ClonePageLayout, CloneAppLayout …)
 *
 * Each page declares its own layout via `getLayout` — see workspace-conventions.md.
 * ThemeProvider lives inside the layout shells (CloneAppShell), not here.
 */
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { AuthProvider } from '@/contexts/AuthContext';
import '@/styles/globals.css';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  return (
    <Provider store={store}>
      <AuthProvider>
        {getLayout(<Component {...pageProps} />)}
      </AuthProvider>
    </Provider>
  );
}
