// Global type declarations for HotelSwiss application
declare global {
  interface Window {
    cacheManager?: {
      clearCache: () => Promise<any>;
      getCacheStats: () => Promise<any>;
    };
  }
}

export {};
