import { ref } from "vue";
import type { Ref } from "vue";

export interface ApiError {
  message: string;
  statusCode?: number;
  details?: any;
}

/**
 * Composable for handling API errors in Vue applications
 * Provides structured error management with retry capabilities
 * Includes methods for handling, clearing, and retrying operations
 * Supports both API response errors and generic JavaScript errors
 */
export const useErrorHandler = () => {
  const error: Ref<ApiError | null> = ref(null);
  const isError = computed(() => !!error.value);

  /**
   * Handle API errors by extracting relevant information
   * Supports both response errors and generic errors
   * Sets the error state with structured details
   * @param err - The error object, can be an Axios error or a generic error
   * @returns void
   */
  const handleError = (err: any) => {
    console.error("API Error:", err);

    if (err.response) {
      error.value = {
        message: err.response._data?.message || "An API error occurred",
        statusCode: err.response.status,
        details: err.response._data,
      };
    } else if (err.message) {
      error.value = {
        message: err.message,
      };
    } else {
      error.value = {
        message: "An unknown error occurred",
      };
    }
  };

  /**
   * Clear the current error state
   * Resets the error to null
   * @returns void
   */
  const clearError = () => {
    error.value = null;
  };

  /**
   * Retry a function that returns a promise
   * Clears the current error state before retrying
   * Handles errors by calling handleError
   * @param fn - The function to retry, should return a promise
   * @returns Promise<any>
   */
  const retry = async (fn: () => Promise<any>) => {
    try {
      clearError();
      return await fn();
    } catch (err) {
      handleError(err);
      throw err;
    }
  };

  return {
    error: readonly(error),
    isError,
    handleError,
    clearError,
    retry,
  };
};
