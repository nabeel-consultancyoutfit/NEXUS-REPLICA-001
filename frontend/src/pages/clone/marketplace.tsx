/**
 * Route: /clone/marketplace
 * Renders CloneMarketplacePage + left filter rail inside CloneMarketLayout.
 * Isolated from the existing workspace application.
 */
import React, { ReactElement, useState } from 'react';
import type { NextPageWithLayout } from '../_app';
import CloneMarketplacePage, { CloneMarketplaceSidebar } from '@/modules/nexusai-clone/pages/CloneMarketplacePage';
import { CloneMarketLayout } from '@/layouts/clone-layout/CloneAppShell';

/**
 * We use a wrapper component so both the sidebar and the page content
 * can share the same filter state without prop drilling through the layout.
 */
function CloneMarketWrapper() {
  const [filters, setFilters] = useState<any>({
    search: '', capability: 'All', providers: [],
    pricingTypes: [], maxPrice: 100, minRating: null, licences: [],
  });

  return (
    <CloneMarketLayout
      sidebar={
        <CloneMarketplaceSidebar
          filters={filters}
          setFilters={setFilters}
          total={20}
        />
      }
    >
      <CloneMarketplacePage />
    </CloneMarketLayout>
  );
}

const CloneMarketPage: NextPageWithLayout = () => <CloneMarketWrapper />;

// This page controls its own layout entirely — no outer layout wrapper needed
CloneMarketPage.getLayout = (page: ReactElement) => page;

export default CloneMarketPage;
