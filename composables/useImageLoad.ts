import { ref, onMounted, onUnmounted } from "vue";

export function useImageLoad(timeout = 5000) {
  const isLoaded = ref(false);
  const hasError = ref(false);
  let timeoutId: NodeJS.Timeout | null = null;

  const onImageLoad = (event: Event) => {
    const img = event.target as HTMLImageElement;
    if (img.complete) {
      clearTimeout(timeoutId!);
      isLoaded.value = true;
      hasError.value = false;
      img.classList.add("loaded");
    }
  };

  const onImageError = () => {
    clearTimeout(timeoutId!);
    hasError.value = true;
    isLoaded.value = false;
  };

  onMounted(() => {
    timeoutId = setTimeout(() => {
      if (!isLoaded.value) {
        hasError.value = true;
      }
    }, timeout);
  });

  onUnmounted(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  });

  return {
    isLoaded,
    hasError,
    onImageLoad,
    onImageError,
  };
}
