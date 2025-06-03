import { ref, computed } from "vue";

export interface RequestConfig {
  retries?: number;
  retryDelay?: number;
  debounceMs?: number;
  abortOnUnmount?: boolean;
}

/**
 * Composable for optimized API requests with retry logic and request deduplication
 * Supports debouncing, aborting requests, and deduplication
 * Provides a clean API for making requests
 * Handles automatic retries and aborting requests on component unmount
 */
export const useOptimizedRequest = (config: RequestConfig = {}) => {
  const {
    retries = 3,
    retryDelay = 1000,
    debounceMs = 300,
    abortOnUnmount = true,
  } = config;

  const activeRequests = ref(new Map<string, Promise<any>>());
  const abortControllers = ref(new Map<string, AbortController>());
  const debounceTimers = ref(new Map<string, NodeJS.Timeout>());

  /**
   * Create a unique key for request deduplication
   */
  const createRequestKey = (url: string, params?: Record<string, any>) => {
    return `${url}:${JSON.stringify(params || {})}`;
  };

  /**
   * Execute request with retry logic
   * @param requestFn - Function that returns a promise for the request
   * @param currentRetry - Current retry count
   * @returns Promise resolving to the request result
   */
  const executeWithRetry = async <T>(
    requestFn: () => Promise<T>,
    currentRetry = 0,
  ): Promise<T> => {
    try {
      return await requestFn();
    } catch (error) {
      if (currentRetry < retries) {
        await new Promise((resolve) =>
          setTimeout(resolve, retryDelay * (currentRetry + 1)),
        );
        return executeWithRetry(requestFn, currentRetry + 1);
      }
      throw error;
    }
  };

  /**
   * Debounced request execution
   * This function ensures that multiple requests with the same key
   * are not executed simultaneously, but rather wait for the debounce period
   * before executing the last one.
   * @param key - Unique key for the request
   * @param requestFn - Function that returns a promise for the request
   * @returns Promise resolving to the request result
   */
  const debouncedRequest = <T>(
    key: string,
    requestFn: () => Promise<T>,
  ): Promise<T> => {
    return new Promise((resolve, reject) => {
      const existingTimer = debounceTimers.value.get(key);
      if (existingTimer) {
        clearTimeout(existingTimer);
      }

      const timer = setTimeout(async () => {
        try {
          const result = await executeWithRetry(requestFn);
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          debounceTimers.value.delete(key);
        }
      }, debounceMs);

      debounceTimers.value.set(key, timer);
    });
  };

  /**
   * Main request function with deduplication and optimization
   * This function handles request deduplication,
   * debouncing, and automatic retries.
   * @param url - The API endpoint URL
   * @param requestFn - Function that returns a promise for the request
   * @param params - Optional parameters for the request
   * @param options - Options for deduplication and debouncing
   * @returns Promise resolving to the request result
   */
  const optimizedRequest = async <T>(
    url: string,
    requestFn: () => Promise<T>,
    params?: Record<string, any>,
    options: { deduplicate?: boolean; debounce?: boolean } = {},
  ): Promise<T> => {
    const { deduplicate = true, debounce = false } = options;
    const key = createRequestKey(url, params);

    if (deduplicate && activeRequests.value.has(key)) {
      return activeRequests.value.get(key)!;
    }

    const abortController = new AbortController();
    abortControllers.value.set(key, abortController);

    const requestWithAbort = () => {
      if (abortController.signal.aborted) {
        throw new Error("Request aborted");
      }
      return requestFn();
    };

    const requestPromise = debounce
      ? debouncedRequest(key, requestWithAbort)
      : executeWithRetry(requestWithAbort);

    if (deduplicate) {
      activeRequests.value.set(key, requestPromise);
    }

    try {
      const result = await requestPromise;
      return result;
    } finally {
      activeRequests.value.delete(key);
      abortControllers.value.delete(key);
    }
  };

  /**
   * Abort specific request
   * This function allows you to abort a specific request
   * using its unique key.
   * @param url - The API endpoint URL
   * @param params - Optional parameters for the request
   * @return void
   */
  const abortRequest = (url: string, params?: Record<string, any>) => {
    const key = createRequestKey(url, params);
    const controller = abortControllers.value.get(key);
    if (controller) {
      controller.abort();
      abortControllers.value.delete(key);
      activeRequests.value.delete(key);
    }
  };

  /**
   * Abort all active requests
   * This function aborts all currently active requests,
   * clearing both the active requests map and the abort controllers.
   * It also clears any active debounce timers.
   * @return void
   */
  const abortAllRequests = () => {
    abortControllers.value.forEach((controller) => controller.abort());
    abortControllers.value.clear();
    activeRequests.value.clear();
    debounceTimers.value.forEach((timer) => clearTimeout(timer));
    debounceTimers.value.clear();
  };

  const cleanup = () => {
    if (abortOnUnmount) {
      abortAllRequests();
    }
  };

  return {
    optimizedRequest,
    abortRequest,
    abortAllRequests,
    cleanup,
    activeRequestCount: computed(() => activeRequests.value.size),
  };
};
