import { ref, Ref } from "vue";

/**
 * Load more items
 * @param items
 * @param initialVisibleCount
 * @returns
 */
export const useLoadMore = (items: any, initialVisibleCount: number) => {
  const visibleItems = ref(items.slice(0, initialVisibleCount));
  const shouldShowLoadMoreButton: Ref<boolean> = ref(
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
