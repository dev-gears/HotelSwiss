export const useGTM = () => {
  const nuxtApp = useNuxtApp();

  // Hotel-specific tracking functions
  const trackHotelView = (hotel: {
    id: string;
    name: string;
    location?: string;
    category?: string;
  }) => {
    if (nuxtApp.$trackEvent) {
      (nuxtApp.$trackEvent as Function)("view_hotel", {
        hotel_id: hotel.id,
        hotel_name: hotel.name,
        hotel_location: hotel.location || "",
        hotel_category: hotel.category || "",
        value: 1,
      });
    }
  };

  const trackHotelSearch = (searchParams: {
    search_term?: string;
    location?: string;
    category?: string;
    filters?: Record<string, any>;
  }) => {
    if (nuxtApp.$trackEvent) {
      (nuxtApp.$trackEvent as Function)("search_hotels", {
        search_term: searchParams.search_term || "",
        search_location: searchParams.location || "",
        search_category: searchParams.category || "",
        search_filters: searchParams.filters || {},
        value: 1,
      });
    }
  };

  const trackContactFormSubmission = (formData: {
    hotel_id?: string;
    form_type: string;
    hotel_name?: string;
  }) => {
    if (nuxtApp.$trackEvent) {
      (nuxtApp.$trackEvent as Function)("contact_form_submission", {
        form_type: formData.form_type,
        hotel_id: formData.hotel_id || "",
        hotel_name: formData.hotel_name || "",
        value: 1,
      });
    }
  };

  const trackLanguageChange = (language: string) => {
    if (nuxtApp.$trackEvent) {
      (nuxtApp.$trackEvent as Function)("language_change", {
        new_language: language,
        value: 1,
      });
    }
  };

  const trackCategoryFilter = (category: string) => {
    if (nuxtApp.$trackEvent) {
      (nuxtApp.$trackEvent as Function)("category_filter", {
        category_name: category,
        value: 1,
      });
    }
  };

  const trackCantonView = (canton: string) => {
    if (nuxtApp.$trackEvent) {
      (nuxtApp.$trackEvent as Function)("canton_view", {
        canton_name: canton,
        value: 1,
      });
    }
  };

  return {
    // Core GTM functions
    trackEvent: nuxtApp.$trackEvent as Function,
    trackPageView: nuxtApp.$trackPageView as Function,
    gtag: nuxtApp.$gtag as Function,

    // Hotel-specific functions
    trackHotelView,
    trackHotelSearch,
    trackContactFormSubmission,
    trackLanguageChange,
    trackCategoryFilter,
    trackCantonView,
  };
};
