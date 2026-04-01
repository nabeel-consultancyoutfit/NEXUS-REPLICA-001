/**
 * Route: /ai
 * Renders the home page inside the navbar-only layout.
 */
import React, { ReactElement } from 'react';
import type { NextPageWithLayout } from '../_app';
import CloneHomePage from '@/modules/nexusai-clone/pages/CloneHomePage';
import { ClonePageLayout } from '@/layouts/clone-layout/CloneAppShell';

const AiIndexPage: NextPageWithLayout = () => <CloneHomePage />;

AiIndexPage.getLayout = (page: ReactElement) => (
  <ClonePageLayout>{page}</ClonePageLayout>
);

export default AiIndexPage;
