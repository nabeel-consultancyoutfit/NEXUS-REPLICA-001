/**
 * Route: /clone/discover
 * Renders CloneDiscoverPage inside ClonePageLayout (Navbar only).
 */
import React, { ReactElement } from 'react';
import type { NextPageWithLayout } from '../_app';
import CloneDiscoverPage from '@/modules/nexusai-clone/pages/CloneDiscoverPage';
import { ClonePageLayout } from '@/layouts/clone-layout/CloneAppShell';

const CloneDiscoverRoute: NextPageWithLayout = () => <CloneDiscoverPage />;

CloneDiscoverRoute.getLayout = (page: ReactElement) => (
  <ClonePageLayout>{page}</ClonePageLayout>
);

export default CloneDiscoverRoute;
