import type { GetServerSideProps } from 'next';

/**
 * Root route — redirects immediately to /ai.
 */
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/ai',
      permanent:   false,
    },
  };
};

export default function RootPage() {
  return null;
}
