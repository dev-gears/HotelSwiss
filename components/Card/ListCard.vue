<template>
  <div
    v-if="hotel"
    class="flex flex-col gap-4 rounded-xl bg-light p-4 shadow-card transition-all duration-300 hover:shadow-lg dark:bg-dark-300 dark:shadow-dark-200/20 sm:flex-row"
  >
    <div
      class="relative aspect-default w-full overflow-hidden rounded-xl sm:h-[200px] sm:w-auto"
    >
      <NuxtImg
        :placeholder="Global.PLACEHOLDER_IMAGE_URL"
        loading="lazy"
        class="h-full w-full object-cover"
        :src="getImageUrl(hotel.images[0]?.renditions?.thumbnail ?? undefined)"
        :alt="t('Card.imageOf', { title: hotel.title })"
      />
      <div class="absolute bottom-2 left-2">
        <CommonStars :stars="hotel.stars" />
      </div>
    </div>
    <div class="flex flex-1 flex-col justify-between gap-4">
      <div class="flex flex-col gap-2">
        <h3
          class="text-xl font-bold text-dark transition-colors duration-300 dark:text-light"
        >
          {{ hotel.title }}
        </h3>
        <p
          v-if="hotel.description"
          class="line-clamp-2 text-sm text-dark/70 transition-colors duration-300 dark:text-light/70"
        >
          {{ hotel.description }}
        </p>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="amenity in hotel.amenities?.slice(0, 3)"
            :key="amenity.amenity.id"
            class="flex items-center gap-2 rounded-lg bg-light-100 px-2 py-1 text-sm text-dark transition-colors duration-300 dark:bg-dark-100 dark:text-light"
          >
            <NuxtImg
              :placeholder="Global.PLACEHOLDER_IMAGE_URL"
              loading="lazy"
              :src="getImageUrl(amenity.amenity.image?.url ?? undefined)"
              :alt="amenity.amenity.name"
              class="h-4 w-4"
              v-show="true"
            />
            {{ amenity.amenity.name }}
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex flex-col">
          <span
            class="text-sm text-dark/70 transition-colors duration-300 dark:text-light/70"
          >
            {{ t("Common.from") }}
          </span>
          <span
            class="text-xl font-bold text-dark transition-colors duration-300 dark:text-light"
          >
            {{ hotel.start_price }}$
          </span>
        </div>
        <NuxtLink
          :to="{ path: `/hotel/${hotel.id}` }"
          class="dark:hover:bg-primary-300 rounded-xl bg-primary px-4 py-2 text-light transition-all duration-300 hover:bg-primary-200 dark:bg-primary-200"
        >
          {{ t("Common.viewDetails") }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Hotel } from "@/types/hotel";
import { Global } from "@/enums/Global";
import { useI18n } from "vue-i18n";

defineProps<{
  hotel: Hotel;
}>();

const { t } = useI18n();
const { getImageUrl } = useHotelImage();
</script>
