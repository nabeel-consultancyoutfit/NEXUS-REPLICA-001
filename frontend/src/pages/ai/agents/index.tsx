/**
 * Route: /ai/agents
 * Renders the agents page inside the full app layout.
 */
import React, { ReactElement, useState } from 'react';
import type { NextPageWithLayout } from '../../_app';
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

const AiAgentsRoute: NextPageWithLayout = () => <CloneAgentsWrapper />;

AiAgentsRoute.getLayout = (page: ReactElement) => page;

export default AiAgentsRoute;
