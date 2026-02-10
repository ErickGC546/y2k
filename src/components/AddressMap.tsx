
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface AddressMapProps {
  address?: string;
  onSelectLocation?: (address: string, coordinates: [number, number]) => void;
  readOnly?: boolean;
}

const LazyMapContent = lazy(() => import('./AddressMapContent'));

const AddressMap: React.FC<AddressMapProps> = (props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Skeleton className="h-[256px] w-full rounded-md" />;
  }

  return (
    <Suspense fallback={<Skeleton className="h-[256px] w-full rounded-md" />}>
      <LazyMapContent {...props} />
    </Suspense>
  );
};

export default AddressMap;
