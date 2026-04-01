/**
 * Route: /clone/chat
 * Renders CloneChatPage inside CloneAppLayout (sidebar + right panel).
 * Isolated from the existing workspace application.
 */
import React, { ReactElement, useState } from 'react';
import type { NextPageWithLayout } from '../_app';
import CloneChatPage from '@/modules/nexusai-clone/pages/CloneChatPage';
import { CloneAppLayout } from '@/layouts/clone-layout/CloneAppShell';

function CloneChatWrapper() {
  const [selectedModelId, setSelectedModelId] = useState('gpt-5');

  return (
    <CloneAppLayout
      selectedModelId={selectedModelId}
      onSelectModel={setSelectedModelId}
    >
      <CloneChatPage />
    </CloneAppLayout>
  );
}

const CloneChatRoute: NextPageWithLayout = () => <CloneChatWrapper />;

CloneChatRoute.getLayout = (page: ReactElement) => page;

export default CloneChatRoute;
