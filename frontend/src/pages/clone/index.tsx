/**
 * Route: /clone
 * Renders the CloneHomePage inside ClonePageLayout (Navbar only).
 * This page is fully isolated from the existing workspace application.
 */
import React, { ReactElement } from 'react';
import type { NextPageWithLayout } from '../_app';
import CloneHomePage from '@/modules/nexusai-clone/pages/CloneHomePage';
import { ClonePageLayout } from '@/layouts/clone-layout/CloneAppShell';

const CloneIndex: NextPageWithLayout = () => <CloneHomePage />;

CloneIndex.getLayout = (page: ReactElement) => (
  <ClonePageLayout>{page}</ClonePageLayout>
);

export default CloneIndex;
