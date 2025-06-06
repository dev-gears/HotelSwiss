<template>
  <div class="container px-3">
    <div
      class="rounded-2xl bg-light p-6 shadow-md dark:bg-dark-100 dark:text-light"
    >
      <!-- Section Header -->
      <div class="mb-6 flex items-center justify-between">
        <div>
          <h2
            class="font-patuaOne text-2xl font-bold text-dark dark:text-light"
          >
            {{ $t("HotelAmenities.title") }}
          </h2>
          <p
            v-if="props.amenities && props.amenities.length > 0"
            class="mt-1 font-robotoRegular text-sm text-dark/60 dark:text-light/60"
          >
            {{
              $t("HotelAmenities.subtitle", {
                count: props.amenities.length,
              })
            }}
          </p>
        </div>
        <div
          v-if="props.amenities.length > 0"
          class="flex h-12 w-12 items-center justify-center rounded-full bg-primary"
        >
          <i class="pi pi-star text-xl text-light"></i>
        </div>
      </div>
      <!-- Amenities Grid -->
      <div v-if="props.amenities && props.amenities.length > 0">
        <!-- Compact tag-style layout -->
        <div class="mb-4 flex flex-wrap gap-2">
          <div
            v-for="(data, index) in visibleAmenities"
            :key="data.amenity.id"
            class="animate-item group flex cursor-default items-center gap-2 rounded-lg border border-light-200 bg-light px-3 py-2 font-robotoRegular text-sm text-dark-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm dark:border-dark-200 dark:!bg-primary dark:text-light dark:hover:border-primary-200/60"
            :style="{ animationDelay: `${index * 20}ms` }"
            v-tooltip.top="
              data.amenity?.name?.length > 18 ? data.amenity.name : null
            "
          >
            <img
              v-if="data.amenity?.image?.url"
              :src="backendUrl + data.amenity.image.url"
              :alt="data.amenity.name"
              class="h-3 w-3 opacity-70 invert transition-all duration-200 group-hover:opacity-100 dark:invert-0"
            />
            <i
              v-else
              class="pi pi-check text-xs text-primary opacity-70 transition-opacity duration-200 group-hover:opacity-100 dark:text-primary-200"
            ></i>
            <span
              class="max-w-[100px] truncate sm:max-w-[120px] md:max-w-[180px]"
            >
              {{ data.amenity?.name }}
            </span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap justify-center gap-3">
          <Button
            v-if="shouldShowLoadMoreButton"
            @click="loadMore"
            variant="outlined"
            size="small"
            :label="`${$t('Common.showMore')} (+${props.amenities.length - visibleAmenities.length})`"
            icon="pi pi-plus"
            class="border-primary/30 text-primary transition-all duration-200 hover:bg-primary hover:text-white dark:border-primary-200/30 dark:text-primary-200 dark:hover:bg-primary-200 dark:hover:text-dark"
          />

          <Button
            @click="showAllAmenitiesModal = true"
            variant="text"
            size="small"
            :label="$t('HotelAmenities.viewAllDetails')"
            icon="pi pi-list"
            class="text-primary transition-all duration-200 hover:bg-primary/5 dark:text-light dark:hover:bg-primary-200/5"
          />
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="py-12 text-center">
        <div
          class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-light-200 dark:bg-dark-200"
        >
          <i
            class="pi pi-star text-2xl text-primary/50 dark:text-primary-200/50"
          ></i>
        </div>
        <h3 class="mb-2 font-patuaOne text-xl text-dark dark:text-light">
          {{ $t("HotelAmenities.noAmenities.title") }}
        </h3>
        <p class="font-robotoRegular text-dark/60 dark:text-light/60">
          {{ $t("HotelAmenities.noAmenities.description") }}
        </p>
      </div>

      <!-- All Amenities Modal -->
      <Dialog
        v-model:visible="showAllAmenitiesModal"
        :header="$t('HotelAmenities.allAmenities')"
        modal
        :dismissableMask="true"
        :closeOnEscape="true"
        class="w-full max-w-4xl"
        :pt="{
          root: 'bg-light dark:bg-dark-100 rounded-xl shadow-xl border border-light-200 dark:border-dark-300',
          header:
            'bg-light dark:bg-dark-200 border-b border-light-200 dark:border-dark-300 px-6 py-4 rounded-t-xl',
          headerTitle: 'font-patuaOne text-xl text-dark dark:text-light',
          content:
            'bg-light dark:bg-dark-100 px-6 py-4 max-h-96 overflow-y-auto',
          closeButton:
            'text-dark/60 dark:text-light/60 hover:text-dark dark:hover:text-light transition-colors',
        }"
      >
        <div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          <div
            v-for="data in props.amenities"
            :key="data.amenity.id"
            class="flex items-center gap-3 rounded-lg border border-light-200 bg-light p-3 transition-all duration-200 hover:border-primary/30 dark:border-dark-300 dark:bg-dark-200 dark:hover:border-primary-200/30"
          >
            <div
              class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary-200/20"
            >
              <img
                v-if="data.amenity?.image?.url"
                :src="backendUrl + data.amenity.image.url"
                :alt="data.amenity.name"
                class="h-4 w-4 invert dark:invert-0"
              />
              <i
                v-else
                class="pi pi-check text-sm text-primary dark:text-primary-200"
              ></i>
            </div>
            <div class="flex-1">
              <h4
                class="font-robotoRegular font-medium text-dark dark:text-light"
              >
                {{ data.amenity?.name }}
              </h4>
              <p
                v-if="data.amenity?.description"
                class="mt-1 text-sm text-dark/60 dark:text-light/60"
              >
                {{ data.amenity.description }}
              </p>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Amenity } from "@/types/hotel";
import { useLoadMore } from "@/composables/useLoadMore";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import { ref } from "vue";

const runtimeConfig = useRuntimeConfig();
const backendUrl = runtimeConfig.public.backendUrl;

const props = defineProps<{
  amenities: Array<{
    amenity: Amenity;
  }>;
}>();

const {
  visibleItems: visibleAmenities,
  shouldShowLoadMoreButton,
  loadMore,
} = useLoadMore(props.amenities, 20); // Show 20 initially for compact layout

// Modal state
const showAllAmenitiesModal = ref(false);
</script>

<style scoped>
/* Animation keyframes */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-item {
  animation: slideInUp 0.3s ease-out both;
}
</style>
