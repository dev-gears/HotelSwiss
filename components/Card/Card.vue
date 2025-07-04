<template>
  <div v-if="hotel" class="group relative h-full w-full rounded-lg shadow-card">
    <div
      class="flex h-full flex-col overflow-hidden rounded-lg bg-primary shadow-md transition-all duration-200 hover:shadow-lg dark:bg-dark-200"
    >
      <div class="relative">
        <div
          :class="getAspectRatioClass(aspect)"
          class="relative w-full overflow-hidden"
        >
          <Badge
            :value="priceRangeText"
            severity="info"
            class="absolute right-3 top-3 z-[3] px-3 py-2 text-sm font-medium opacity-90"
          />

          <Button
            v-if="showFavoriteOption"
            icon="pi pi-heart"
            class="p-button-rounded p-button-text p-button-sm absolute left-3 top-3 z-10"
            :class="isFavorite ? 'text-red-500' : 'text-white'"
            @click="toggleFavorite"
          />
          <NuxtLink :to="`/hotel/${hotel.id}`" class="block h-full w-full">            <div v-ripple class="relative h-full w-full rounded-br-2xl">
              <NuxtImg
                :placeholder="Global.PLACEHOLDER_IMAGE_URL"
                :loading="isLCPCandidate ? 'eager' : 'lazy'"
                :fetchpriority="isLCPCandidate ? 'high' : 'auto'"
                preset="card"
                class="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                :src="getHotelImageSrc(hotel)"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                :alt="t('Card.imageOf', { title: hotel.title })"
              />
            </div>
          </NuxtLink>

          <div
            class="absolute bottom-3 left-3 z-[3] flex items-center rounded-full bg-black/50"
          >
            <Rating
              v-model="starRating"
              :cancel="false"
              :readonly="true"
              class="flex"
              :pt="{
                root: 'flex items-center bg-[rgba(0,0,0,0.5)] dark:bg-[rgba(255,255,255,0.5)] px-2 py-1 rounded-full',
                onIcon: 'pi pi-star text-light dark:text-dark-200',
              }"
              :stars="5"
            />
          </div>
        </div>
      </div>

      <div class="p-4">
        <h3
          class="mb-2 line-clamp-2 h-14 text-lg font-semibold text-light transition-colors hover:text-primary"
        >
          <a :href="`/hotel/${hotel.id}`">
            {{ hotel.title }}
          </a>
        </h3>

        <div class="mb-3 flex items-center text-sm text-light">
          <i class="pi pi-map-marker mr-2"></i>
          <span class="truncate">{{ hotel.city }}, {{ hotel.address }}</span>
        </div>
        <div v-if="showAmenities && hotel.amenities.length > 0" class="mt-3">
          <Divider class="my-2" />
          <div class="flex flex-wrap gap-2">
            <Chip
              v-for="(item, index) in hotel.amenities.slice(0, 3)"
              :key="index"
              :label="item.amenity.name"
              class="bg-light-100 text-xs text-dark-100 dark:bg-dark-300 dark:text-light"
            >
              <img
                :src="getImageUrl(String(item?.amenity?.image?.url))"
                :alt="item.amenity.name"
                class="h-4 w-4 invert dark:invert-0"
                v-tooltip.top="item.amenity.name"
              />
            </Chip>

            <Chip
              v-if="hotel.amenities.length > 3"
              :label="
                t('Card.plusMoreItems', { count: hotel.amenities.length - 3 })
              "
              class="bg-light-100 text-xs text-dark-100 dark:bg-dark-300 dark:text-light"
              v-tooltip.top="
                t('Card.additionalAmenities', {
                  count: hotel.amenities.length - 3,
                })
              "
            />
          </div>
        </div>
      </div>
      <div
        class="mt-auto flex items-center justify-between px-4 pb-4"
        v-if="hotel.paid"
      >
        <div>
          <Badge
            :value="t('Card.verified')"
            severity="success"
            class="bg-light-100 text-sm font-semibold text-dark-100 dark:bg-primary dark:text-light"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Hotel } from "@/types/hotel";
import { ref, computed } from "vue";
import Badge from "primevue/badge";
import Button from "primevue/button";
import Chip from "primevue/chip";
import Divider from "primevue/divider";
import Rating from "primevue/rating";
import { Global } from "@/enums/Global";
import { useI18n } from "vue-i18n";

const props = defineProps<{
  hotel: Hotel;
  aspect?: string;
  showAmenities?: boolean;
  showFavoriteOption?: boolean;
  isLCPCandidate?: boolean;
}>();

const {
  hotel,
  aspect = "default",
  showAmenities = false,
  showFavoriteOption = false,
  isLCPCandidate = false,
} = props;
const router = useRouter();
const { getImageUrl } = useHotelImage();
const { t } = useI18n();

// Safe image source getter to prevent type errors
const getHotelImageSrc = (hotel: Hotel) => {
  try {
    // Handle case where images might be an array (runtime) vs string (type definition)
    const images = Array.isArray(hotel.images) ? hotel.images : [];
    if (images.length > 0 && images[0]?.renditions?.thumbnail) {
      return getImageUrl(images[0].renditions.thumbnail);
    }
    if (images.length > 0 && images[0]?.url) {
      return getImageUrl(images[0].url);
    }
    return Global.PLACEHOLDER_IMAGE_URL;
  } catch (error) {
    console.warn("Error getting hotel image:", error);
    return Global.PLACEHOLDER_IMAGE_URL;
  }
};

// Generate optimized srcset for card images - simplified to prevent bundling issues
const generateCardSrcset = (image: any) => {
  try {
    if (!image?.renditions) return "";
    
    const runtimeConfig = useRuntimeConfig();
    const baseUrl = runtimeConfig.public.backendUrl || "";
    
    // Simple fallback to prevent complex operations during SSR
    if (image.renditions.thumbnail) {
      return `${baseUrl}${image.renditions.thumbnail}`;
    }
    
    return "";
  } catch (error) {
    console.warn("Srcset generation failed:", error);
    return "";
  }
};

const starRating = ref(hotel.stars);

const priceRangeText = computed(() => {
  if (hotel.start_price && hotel.end_price) {
    return t("Card.priceRange", {
      start: hotel.start_price,
      end: hotel.end_price,
    });
  } else if (hotel.start_price) {
    return t("Card.priceFrom", { price: hotel.start_price });
  } else if (hotel.end_price) {
    return t("Card.priceUpTo", { price: hotel.end_price });
  }
  return t("Card.priceOnRequest");
});

const isFavorite = ref(false);
const toggleFavorite = (event: Event) => {
  event.preventDefault();
  event.stopPropagation();
  isFavorite.value = !isFavorite.value;
};

const navigateToHotel = () => {
  router.push(`/hotel/${hotel.id}`);
};

/**
 * Get aspect ratio class based on the aspect prop
 * @param {string} aspect - Aspect ratio
 * @returns {string} Aspect ratio class
 */
const getAspectRatioClass = (aspect: string): string => {
  const aspectClassMap: Record<string, string> = {
    default: "aspect-[4/3]",
    square: "aspect-square",
    wide: "aspect-[16/9]",
  };

  return aspectClassMap[aspect] || aspectClassMap["default"];
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
