// Declare global dataLayer type
declare global {
  interface Window {
    dataLayer: any[];
  }
}

export default defineNuxtPlugin(() => {
  const router = useRouter();
  const config = useRuntimeConfig();

  // Ensure dataLayer exists
  if (import.meta.client) {
    window.dataLayer = window.dataLayer || [];
  }

  // GTM helper functions
  const gtag = (...args: any[]) => {
    if (import.meta.client && config.public.gtmId) {
      window.dataLayer?.push(args);
    }
  };

  const trackEvent = (
    eventName: string,
    parameters: Record<string, any> = {},
  ) => {
    if (import.meta.client && config.public.gtmId) {
      window.dataLayer?.push({
        event: eventName,
        ...parameters,
      });
    }
  };

  const trackPageView = (pagePath?: string) => {
    if (import.meta.client && config.public.gtmId) {
      window.dataLayer?.push({
        event: "page_view",
        page_location: window.location.href,
        page_path: pagePath || router.currentRoute.value.path,
        page_title: document.title,
      });
    }
  };

  // Track route changes
  if (import.meta.client && config.public.gtmId) {
    router.afterEach((to) => {
      nextTick(() => {
        trackPageView(to.path);
      });
    });
  }

  return {
    provide: {
      gtag,
      trackEvent,
      trackPageView,
    },
  };
});
