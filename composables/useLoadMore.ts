import { ref } from "vue";
import type { Ref } from "vue";

/**
 * Load more items
 * @param items Array of items to load
 * @param initialVisibleCount Initial number of items to show
 * @returns Object containing visible items, load more button state, and load more function
 */
export const useLoadMore = <T extends Record<string, any>>(
  items: T[],
  initialVisibleCount: number,
) => {
  const visibleItems = ref<T[]>(items.slice(0, initialVisibleCount));
  const shouldShowLoadMoreButton = ref<boolean>(
    items.length > initialVisibleCount,
  );

  const loadMore = () => {
    const endIndex = items.length;
    visibleItems.value = items.slice(0, endIndex);
    shouldShowLoadMoreButton.value = false;
  };

  return {
    visibleItems,
    shouldShowLoadMoreButton,
    loadMore,
  };
};
