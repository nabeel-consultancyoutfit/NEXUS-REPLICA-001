/**
 * Route: /ai/marketplace
 * Renders the marketplace page and filter rail.
 */
import React, { ReactElement, useState } from 'react';
import type { NextPageWithLayout } from '../../_app';
import CloneMarketplacePage, {
  CloneMarketplaceSidebar,
  INITIAL_FILTERS,
} from '@/modules/nexusai-clone/pages/CloneMarketplacePage';
import { CloneMarketLayout } from '@/layouts/clone-layout/CloneAppShell';

function AiMarketplaceWrapper() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  return (
    <CloneMarketLayout
      sidebar={(
        <CloneMarketplaceSidebar
          filters={filters}
          setFilters={setFilters}
          total={20}
        />
      )}
    >
      <CloneMarketplacePage filters={filters} setFilters={setFilters} />
    </CloneMarketLayout>
  );
}

const AiMarketplaceRoute: NextPageWithLayout = () => <AiMarketplaceWrapper />;

AiMarketplaceRoute.getLayout = (page: ReactElement) => page;

export default AiMarketplaceRoute;
