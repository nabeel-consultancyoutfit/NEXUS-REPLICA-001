/**
 * Route: /ai/marketplace
 * Renders the marketplace page and filter rail.
 */
import React, { ReactElement, useState } from 'react';
import type { NextPageWithLayout } from '../../_app';
import CloneMarketplacePage, { CloneMarketplaceSidebar } from '@/modules/nexusai-clone/pages/CloneMarketplacePage';
import { CloneMarketLayout } from '@/layouts/clone-layout/CloneAppShell';

function AiMarketplaceWrapper() {
  const [filters, setFilters] = useState<any>({
    search: '',
    capability: 'All',
    providers: [],
    pricingTypes: [],
    maxPrice: 100,
    minRating: null,
    licences: [],
  });

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
      <CloneMarketplacePage />
    </CloneMarketLayout>
  );
}

const AiMarketplaceRoute: NextPageWithLayout = () => <AiMarketplaceWrapper />;

AiMarketplaceRoute.getLayout = (page: ReactElement) => page;

export default AiMarketplaceRoute;
