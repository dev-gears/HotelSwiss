<template>
  <div class="card mb-4 min-h-[500px]">
    <GridSkeleton v-if="isInitialLoading" />
    <DataView
      v-else
      :value="safeHotels"
      :layout="'grid'"
      :paginator="false"
      :rows="12"
      :pt="{
        root: 'bg-light-100 dark:bg-dark-100 border-light dark:border-dark-100',
        header:
          'bg-light dark:bg-dark-300 border-light dark:border-dark-100 mb-4 shadow-card rounded-xl p-3',
        content: 'bg-light-100 dark:bg-dark-100',
      }"
      dataKey="id"
      class="min-h-[400px]"
      variant="default"
    >
      <template #header>
        <div class="flex min-h-[48px] w-full items-center justify-between">
          <div class="flex items-center gap-3">
            <Button
              type="button"
              :label="sortedBy ? sortedBy : $t('Common.sortBy')"
              @click="togglePopover"
              variant="secondary"
              size="small"
              :icon="popoverVisible ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"
              iconPosition="right"
              rounded
            />

            <Popover
              @hide="popoverVisible = false"
              @show="popoverVisible = true"
              ref="sortPopover"
              :pt="{
                root: 'rounded-xl !rounded-tr-none bg-light shadow',
                content:
                  'flex justify-between !rounded-xl dark:!bg-dark-100 dark:text-light !rounded-tr-none bg-light px-3 py-2 text-primary-200 shadow focus:shadow',
              }"
              :position="'bottom'"
              rounded
            >
              <div class="flex flex-col divide-y">
                <div
                  v-for="(option, index) in sortByOptions"
                  :key="option.label + index"
                  class="cursor-pointer !border-y-primary-100/15 p-2 transition-all hover:bg-light-100 dark:hover:!bg-dark-300"
                  @click="changeSortBy(option)"
                >
                  {{ option.label }}
                </div>
              </div>
            </Popover>
          </div>
        </div>
      </template>

      <template #grid>
        <div
          v-if="isInitialLoading || loading"
          class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <div
            v-for="i in 8"
            :key="i"
            class="mx-auto min-h-[400px] w-full max-w-[400px] rounded-xl bg-light p-4 dark:bg-dark-300"
          >
            <div class="flex flex-col gap-4">
              <Skeleton
                class="!h-[228px] !w-full rounded-xl"
                style="aspect-ratio: 16/9"
              />
              <div class="flex flex-col gap-2">
                <Skeleton width="70%" height="2rem" />
                <Skeleton width="100%" height="4rem" />
                <div class="flex gap-2">
                  <Skeleton width="30%" height="2rem" />
                  <Skeleton width="30%" height="2rem" />
                  <Skeleton width="30%" height="2rem" />
                </div>
                <div class="flex items-center justify-between">
                  <Skeleton width="30%" height="2rem" />
                  <Skeleton
                    width="40%"
                    height="2.5rem"
                    borderRadius="0.75rem"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <Card
            v-for="hotel in safeHotels"
            :key="hotel.id"
            :hotel="hotel"
            :showAmenities="true"
            class="mx-auto w-full max-w-[400px]"
          />
        </div>
      </template>
      <template #empty>
        <div
          class="flex min-h-[400px] flex-col items-center justify-center gap-6 p-8"
        >
          <div
            class="bg-primary-50 dark:bg-primary-900/20 flex h-24 w-24 items-center justify-center rounded-full"
          >
            <svg
              class="dark:text-primary-300 h-12 w-12 text-primary-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div class="text-center">
            <h2
              class="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100"
            >
              {{ $t("Common.noResults") }}
            </h2>
            <p class="max-w-md text-gray-600 dark:text-gray-400">
              {{ $t("Common.noResultsDescription") }}
            </p>
          </div>

          <div class="mt-4 text-center">
            <p
              class="mb-4 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {{ $t("Common.tryTheseSuggestions") }}
            </p>
            <div class="flex flex-wrap justify-center gap-2">
              <span
                class="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {{ $t("Common.adjustFilters") }}
              </span>
              <span
                class="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {{ $t("Common.tryDifferentKeywords") }}
              </span>
              <span
                class="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {{ $t("Common.expandSearchArea") }}
              </span>
            </div>
          </div>
        </div>
      </template>
    </DataView>
    <div class="card my-3 flex justify-center" v-if="loadingMore">
      <Loader />
    </div>
    <div id="observed-item" ref="end"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from "vue";
import type { Hotel } from "@/types/hotel";
import Card from "@/components/Card/Card.vue";

import Button from "primevue/button";
import Popover from "primevue/popover";
import Skeleton from "primevue/skeleton";
import DataView from "primevue/dataview";
import Loader from "@/components/Common/Loader.vue";
import GridSkeleton from "@/components/SkeletonLoaders/GridSkeleton.vue";

const props = defineProps<{
  hotels: Array<Hotel>;
  loading?: boolean;
  loadingMore?: boolean;
}>();

const isInitialLoading = ref(true);
const isClient = process.client;

const safeHotels = computed(() => {
  return Array.isArray(props.hotels) ? props.hotels : [];
});

watch(
  [() => props.hotels, () => props.loading],
  ([newHotels, loading], [oldHotels, oldLoading]) => {
    if (loading === true && oldLoading === false) {
      isInitialLoading.value = true;
    }

    if ((newHotels && newHotels.length > 0) || loading === false) {
      isInitialLoading.value = false;
    }
  },
  { immediate: true },
);

onMounted(() => {
  if (safeHotels.value.length > 0 || props.loading === false) {
    isInitialLoading.value = false;
  }
});

const emit = defineEmits<{
  (e: "sort", params: { key: string; value: string }): void;
  (e: "loadMore"): void;
}>();

const { t } = useI18n();

type SearchParamOption = {
  paramKey: string;
  paramValue: string;
  label: string;
};

const sortByOptions = [
  {
    paramKey: "ordering",
    paramValue: "recommended",
    label: t("Common.recommended"),
  },
  {
    paramKey: "ordering",
    paramValue: "price",
    label: t("Common.priceLowToHigh"),
  },
  {
    paramKey: "ordering",
    paramValue: "-price",
    label: t("Common.priceHighToLow"),
  },
  {
    paramKey: "ordering",
    paramValue: "stars",
    label: t("Common.ratingLowToHigh"),
  },
  {
    paramKey: "ordering",
    paramValue: "-stars",
    label: t("Common.ratingHighToLow"),
  },
];

const sortedBy = ref<string | null>(null);
const sortPopover = ref();
const popoverVisible = ref(false);

const togglePopover = (event: Event) => {
  sortPopover.value?.toggle(event);
};

const changeSortBy = (option: SearchParamOption) => {
  sortedBy.value = option.label;
  sortPopover.value?.hide();
  emit("sort", { key: option.paramKey, value: option.paramValue });
};

const end = ref<HTMLElement | null>(null);

let observer: IntersectionObserver | null = null;

const bindObserver = (el: HTMLElement) => {
  if (!isClient) return;

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !props.loading && !props.loadingMore) {
        emit("loadMore");
      }
    },
    {
      rootMargin: "300px",
    },
  );
  observer.observe(el);
};

const unbindObserver = () => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
};

onMounted(() => {
  if (end.value) {
    bindObserver(end.value);
  }
});

onUnmounted(() => {
  unbindObserver();
});
</script>
