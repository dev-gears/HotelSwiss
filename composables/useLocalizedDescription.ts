import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { Hotel, Canton } from "@/types/hotel";

/**
 * Composable for getting localized descriptions based on current language
 * Falls back to default description if translation is not available
 */
export const useLocalizedDescription = () => {
  const { locale } = useI18n();

  /**
   * Get the appropriate description field based on current locale
   * @param item - Hotel or Canton object with description fields
   * @returns The localized description or fallback to default
   */
  const getLocalizedDescription = computed(() => {
    return (item: Hotel | Canton): string => {
      if (!item) return "";

      const currentLocale = locale.value as string;

      let localizedDescription: string | undefined;

      switch (currentLocale) {
        case "de":
          localizedDescription = item.description_de;
          break;
        case "fr":
          localizedDescription = item.description_fr;
          break;
        case "en":
          localizedDescription = item.description_en_us;
          break;
        case "it":
          localizedDescription = undefined;
          break;
        default:
          localizedDescription = undefined;
          break;
      }

      return localizedDescription && localizedDescription.trim() !== ""
        ? localizedDescription
        : item.description || "";
    };
  });

  /**
   * Get localized description for a hotel
   * @param hotel - Hotel object
   * @returns Reactive computed description
   */
  const getHotelDescription = (hotel: Hotel) => {
    return computed(() => getLocalizedDescription.value(hotel));
  };

  /**
   * Get localized description for a canton
   * @param canton - Canton object
   * @returns Reactive computed description
   */
  const getCantonDescription = (canton: Canton) => {
    return computed(() => getLocalizedDescription.value(canton));
  };

  return {
    getLocalizedDescription,
    getHotelDescription,
    getCantonDescription,
  };
};
