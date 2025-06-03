import { ref, computed, readonly } from "vue";
import type { Ref } from "vue";

export type LoadingState =
  | "idle"
  | "loading"
  | "success"
  | "error"
  | "loadingMore";

export interface UseLoadingStateOptions {
  initialState?: LoadingState;
  timeout?: number;
}

/**
 * Composable for managing complex loading states in API operations
 * Supports idle, loading, success, error, and loadingMore states
 * Includes timeout handling for loading states
 * Provides utility methods for state transitions and async operations
 */
export const useLoadingState = (options: UseLoadingStateOptions = {}) => {
  const { initialState = "idle", timeout = 30000 } = options;

  const state: Ref<LoadingState> = ref(initialState);
  const timeoutId = ref<NodeJS.Timeout | null>(null);

  const isIdle = computed(() => state.value === "idle");
  const isLoading = computed(() => state.value === "loading");
  const isLoadingMore = computed(() => state.value === "loadingMore");
  const isSuccess = computed(() => state.value === "success");
  const isError = computed(() => state.value === "error");
  const isAnyLoading = computed(() => isLoading.value || isLoadingMore.value);

  const setState = (newState: LoadingState) => {
    state.value = newState;

    if (timeoutId.value) {
      clearTimeout(timeoutId.value);
      timeoutId.value = null;
    }

    if (newState === "loading" || newState === "loadingMore") {
      timeoutId.value = setTimeout(() => {
        if (state.value === newState) {
          state.value = "error";
          console.warn(`Loading state timeout after ${timeout}ms`);
        }
      }, timeout);
    }
  };

  const startLoading = () => setState("loading");
  const startLoadingMore = () => setState("loadingMore");
  const setSuccess = () => setState("success");
  const setError = () => setState("error");
  const setIdle = () => setState("idle");

  /**
   * Wraps an async operation with loading state management
   * Automatically sets loading state, handles success and error states
   * Can be used for both initial loading and loading more data
   * @param operation - The async operation to execute
   * @param loadingType - Type of loading state ("loading" or "loadingMore")
   * @return Promise<T> - Resolves with the result of the operation
   * @throws Error - Propagates any error from the operation
   */
  const withLoading = async <T>(
    operation: () => Promise<T>,
    loadingType: "loading" | "loadingMore" = "loading",
  ): Promise<T> => {
    try {
      setState(loadingType);
      const result = await operation();
      setSuccess();
      return result;
    } catch (error) {
      setError();
      throw error;
    }
  };

  const cleanup = () => {
    if (timeoutId.value) {
      clearTimeout(timeoutId.value);
      timeoutId.value = null;
    }
  };

  return {
    state: readonly(state),
    isIdle,
    isLoading,
    isLoadingMore,
    isSuccess,
    isError,
    isAnyLoading,

    setState,
    startLoading,
    startLoadingMore,
    setSuccess,
    setError,
    setIdle,
    withLoading,
    cleanup,
  };
};
