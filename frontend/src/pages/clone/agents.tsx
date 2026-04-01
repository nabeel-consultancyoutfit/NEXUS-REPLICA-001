/**
 * Route: /clone/agents
 * Renders CloneAgentsPage inside CloneAppLayout (sidebar + right panel).
 */
import React, { ReactElement, useState } from 'react';
import type { NextPageWithLayout } from '../_app';
import CloneAgentsPage from '@/modules/nexusai-clone/pages/CloneAgentsPage';
import { CloneAppLayout } from '@/layouts/clone-layout/CloneAppShell';

function CloneAgentsWrapper() {
  const [selectedModelId, setSelectedModelId] = useState('gpt-5');
  return (
    <CloneAppLayout
      selectedModelId={selectedModelId}
      onSelectModel={setSelectedModelId}
    >
      <CloneAgentsPage />
    </CloneAppLayout>
  );
}

const CloneAgentsRoute: NextPageWithLayout = () => <CloneAgentsWrapper />;

CloneAgentsRoute.getLayout = (page: ReactElement) => page;

export default CloneAgentsRoute;
