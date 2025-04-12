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

          <NuxtLink :to="`/hotel/${hotel.id}`" class="block h-full w-full">
            <div v-ripple class="relative h-full w-full">
              <NuxtImg
                :placeholder="Global.PLACEHOLDER_IMAGE_URL"
                loading="lazy"
                class="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                :src="
                  getImageUrl(
                    hotel.images[0]?.renditions?.thumbnail ?? undefined,
                  )
                "
                :alt="t('Card.imageOf', { title: hotel.title })"
              />
            </div>
          </NuxtLink>

          <div
            class="bg-black/50 absolute bottom-3 left-3 z-[3] flex items-center rounded-full"
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
          <NuxtLink :to="`/hotel/${hotel.id}`">
            {{ hotel.title }}
          </NuxtLink>
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
              class="text-xs"
            />
            <Chip
              v-if="hotel.amenities.length > 3"
              :label="
                t('Card.plusMoreItems', { count: hotel.amenities.length - 3 })
              "
              class="bg-light-100 text-xs dark:bg-dark-100"
            />
          </div>
        </div>
      </div>

      <div class="mt-auto flex items-center justify-between px-4 pb-4">
        <div>
          <Badge
            v-if="hotel.paid"
            :value="t('Card.premium')"
            severity="success"
            class="mr-2"
          />
        </div>
        <Button
          :label="t('Common.viewDetails')"
          icon="pi pi-arrow-right"
          :pt="{
            root: 'bg-dark-200 text-light p-2 rounded-full',
            icon: 'text-light',
          }"
          iconPos="right"
          size="small"
          outlined
          class="p-button-rounded"
          @click="navigateToHotel"
        />
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
}>();

const {
  hotel,
  aspect = "default",
  showAmenities = false,
  showFavoriteOption = false,
} = props;
const router = useRouter();
const { getImageUrl } = useHotelImage();
const { t } = useI18n();

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
