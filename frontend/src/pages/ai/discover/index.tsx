/**
 * Route: /ai/discover
 * Renders the discover page inside the navbar-only layout.
 */
import React, { ReactElement } from 'react';
import type { NextPageWithLayout } from '../../_app';
import CloneDiscoverPage from '@/modules/nexusai-clone/pages/CloneDiscoverPage';
import { ClonePageLayout } from '@/layouts/clone-layout/CloneAppShell';

const AiDiscoverRoute: NextPageWithLayout = () => <CloneDiscoverPage />;

AiDiscoverRoute.getLayout = (page: ReactElement) => (
  <ClonePageLayout>{page}</ClonePageLayout>
);

export default AiDiscoverRoute;
