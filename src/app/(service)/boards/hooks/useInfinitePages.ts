'use client';

import { useMemo } from 'react';

type InfinitePage<TItem> = {
  list?: TItem[];
};

type UseInfinitePagesParams<TItem> = {
  pages?: unknown[];
};

export function useInfinitePages<TItem>({
  pages,
}: UseInfinitePagesParams<TItem>) {
  return useMemo(() => {
    if (!pages) {
      return [];
    }

    const pageLists = pages.map((page) => {
      const list = (page as InfinitePage<TItem>).list;

      return Array.isArray(list) ? list : [];
    });

    return pageLists.flat();
  }, [pages]);
}
