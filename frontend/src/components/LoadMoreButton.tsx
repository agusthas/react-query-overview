import { Button, ButtonProps } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { useEffect, useRef } from 'react';

export const LoadMoreButton: React.FC<
  ButtonProps<'button'> & {
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
  }
> = ({ hasNextPage, isFetchingNextPage, fetchNextPage, ...props }) => {
  const containerRef = useRef();
  const [ref, observedEntry] = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (observedEntry && observedEntry.isIntersecting) {
      fetchNextPage();
    }
  }, [observedEntry]);

  return (
    <Button
      ref={ref}
      onClick={() => fetchNextPage()}
      disabled={!hasNextPage || isFetchingNextPage}
      {...props}
    >
      {isFetchingNextPage
        ? 'Loading More...'
        : hasNextPage
        ? 'Load More'
        : 'Nothing more to load'}
    </Button>
  );
};
