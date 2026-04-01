/**
 * Route: /ai/chat
 *
 * Accepts an optional `?prompt=` query parameter.
 * When present (e.g. after completing the homepage guided-discovery flow),
 * the prompt is passed to CloneChatPage which auto-sends it on mount.
 */
import React, { ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import type { NextPageWithLayout } from '../../_app';
import CloneChatPage from '@/modules/nexusai-clone/pages/CloneChatPage';
import { CloneAppLayout } from '@/layouts/clone-layout/CloneAppShell';

function AiChatWrapper() {
  const router           = useRouter();
  const [selectedModelId, setSelectedModelId] = useState('gpt-5');
  const [showActiveModel, setShowActiveModel] = useState(false);

  // ?prompt= comes from the homepage guided-discovery card
  const initialPrompt = typeof router.query.prompt === 'string'
    ? router.query.prompt
    : undefined;

  return (
    <CloneAppLayout
      selectedModelId={selectedModelId}
      showActiveModel={showActiveModel}
      onSelectModel={setSelectedModelId}
    >
      <CloneChatPage
        selectedModelId={selectedModelId}
        onSelectModel={setSelectedModelId}
        onProceedModel={(modelId) => {
          setSelectedModelId(modelId);
          setShowActiveModel(true);
        }}
        initialPrompt={initialPrompt}
      />
    </CloneAppLayout>
  );
}

const AiChatRoute: NextPageWithLayout = () => <AiChatWrapper />;

AiChatRoute.getLayout = (page: ReactElement) => page;

export default AiChatRoute;
