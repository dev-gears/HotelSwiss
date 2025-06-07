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
            <!-- Enhanced Sort Button -->
            <div class="relative">
              <Button
                type="button"
                @click="togglePopover"
                @keydown.enter="togglePopover"
                @keydown.space.prevent="togglePopover"
                variant="secondary"
                size="small"
                rounded
                :aria-expanded="popoverVisible"
                :aria-haspopup="true"
                :aria-label="
                  $t('Common.sortBy') + (sortedBy ? ': ' + sortedBy : '')
                "
                :pt="{
                  root: 'group relative bg-light dark:bg-dark-300 border border-primary-100/20 dark:border-dark-200 hover:border-primary-200/40 dark:hover:border-primary-300/40 hover:shadow-md transition-all duration-200 px-4 py-2.5 focus:ring-2 focus:ring-primary-300/50 focus:outline-none',
                  label:
                    'font-medium text-gray-700 dark:text-light group-hover:text-primary-300 transition-colors',
                }"
                class="sort-button min-w-[140px] justify-between"
              >
                <template #default>
                  <div class="flex items-center gap-2">
                    <i
                      v-if="!sortLoading"
                      class="pi pi-sort-alt text-sm opacity-70 transition-opacity group-hover:opacity-100"
                    ></i>
                    <i
                      v-else
                      class="pi pi-spin pi-spinner text-sm opacity-70"
                    ></i>
                    <span class="text-sm">
                      {{ sortedBy || $t("Common.sortBy") }}
                    </span>
                  </div>
                  <i
                    :class="[
                      'pi text-xs transition-transform duration-200',
                      popoverVisible
                        ? 'pi-chevron-up rotate-0'
                        : 'pi-chevron-down',
                    ]"
                  ></i>
                </template>
              </Button>
              <!-- Sort indicator badge -->
              <div
                v-if="sortedBy"
                class="bg-primary-300 active-sort-indicator absolute -right-1 -top-1 h-2 w-2 rounded-full"
                :aria-hidden="true"
              ></div>
            </div>
            <!-- Enhanced Popover -->
            <Popover
              @hide="popoverVisible = false"
              @show="popoverVisible = true"
              ref="sortPopover"
              :pt="{
                root: 'rounded-xl bg-light dark:bg-dark-100 shadow-xl border border-primary-100/10 dark:border-dark-200 mt-2 sort-popover',
                content: 'p-0 rounded-xl overflow-hidden',
              }"
              :position="'bottom-start'"
            >
              <div class="min-w-[200px] max-w-[280px] sm:max-w-none">
                <!-- Popover Header -->
                <div
                  class="from-primary-50 dark:from-primary-900/20 dark:to-primary-800/20 border-b border-primary-100/20 bg-gradient-to-r to-primary-100/50 px-4 py-3 dark:border-dark-200"
                >
                  <div class="flex items-center gap-2">
                    <i class="pi pi-sort-alt text-primary-300 text-sm"></i>
                    <span
                      class="text-sm font-medium text-gray-800 dark:text-light"
                    >
                      {{ $t("Common.sortBy") }}
                    </span>
                  </div>
                </div>
                <!-- Sort Options -->
                <div class="py-2" role="menu" :aria-label="$t('Common.sortBy')">
                  <div
                    v-for="(option, index) in sortByOptions"
                    :key="option.label + index"
                    class="hover:bg-primary-50/50 sort-option focus:bg-primary-50/50 group relative flex cursor-pointer items-center gap-3 px-4 py-3 transition-all duration-150 focus:outline-none dark:hover:bg-dark-300/70 dark:focus:bg-dark-300/70"
                    :class="{
                      'bg-primary-50 dark:bg-primary-900/20 border-primary-300 border-l-2':
                        sortedBy === option.label,
                    }"
                    role="menuitem"
                    :tabindex="0"
                    :aria-selected="sortedBy === option.label"
                    @click="changeSortBy(option)"
                    @keydown.enter="changeSortBy(option)"
                    @keydown.space.prevent="changeSortBy(option)"
                  >
                    <!-- Sort Icon based on type -->
                    <div
                      class="flex h-4 w-4 flex-shrink-0 items-center justify-center"
                    >
                      <i
                        :class="[
                          'text-xs transition-colors',
                          sortedBy === option.label
                            ? 'text-primary-400 pi pi-check'
                            : getSortIcon(option.paramValue) +
                              ' group-hover:text-primary-300 text-gray-400',
                        ]"
                      ></i>
                    </div>

                    <!-- Option Label -->
                    <span
                      class="flex-1 text-sm font-medium transition-colors"
                      :class="[
                        sortedBy === option.label
                          ? 'text-primary-400 dark:text-primary-300'
                          : 'group-hover:text-primary-300 text-gray-700 dark:text-light',
                      ]"
                    >
                      {{ option.label }}
                    </span>
                    <!-- Active indicator -->
                    <div
                      v-if="sortedBy === option.label"
                      class="bg-primary-400 h-2 w-2 rounded-full"
                      :class="{
                        'active-sort-indicator': sortedBy === option.label,
                      }"
                    ></div>
                  </div>
                </div>
                <!-- Clear Sort Option -->
                <div
                  v-if="sortedBy"
                  class="border-t border-primary-100/20 px-4 py-3 dark:border-dark-200"
                >
                  <button
                    @click="clearSort"
                    @keydown.enter="clearSort"
                    @keydown.space.prevent="clearSort"
                    class="hover:text-primary-300 focus:text-primary-300 focus:ring-primary-300/50 flex items-center gap-2 rounded px-1 py-1 text-xs text-gray-500 transition-colors focus:outline-none focus:ring-1 dark:text-gray-400"
                    :aria-label="$t('Common.clearSort')"
                  >
                    <i class="pi pi-times text-xs"></i>
                    <span>{{ $t("Common.clearSort") }}</span>
                  </button>
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
    <!-- Load More Button (when useLoadMoreButton is true) -->
    <div
      v-if="useLoadMoreButton && hasMore && !loading && !loadingMore"
      class="mt-6 flex justify-center"
    >
      <Button
        @click="emit('loadMore')"
        :label="$t('Common.loadMore')"
        :pt="{
          root: 'px-4 py-2 text-light bg-primary dark:hover:bg-dark-200 border-light dark:border-dark-100',
        }"
        size="large"
        icon="pi pi-chevron-down"
        iconPosition="right"
        rounded
      />
    </div>

    <!-- Intersection Observer Element (when useLoadMoreButton is false) -->
    <div v-if="!useLoadMoreButton" id="observed-item" ref="end"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from "vue";
import type { Hotel, HotelArray } from "@/types/hotel";
import Card from "@/components/Card/Card.vue";

import Button from "primevue/button";
import Popover from "primevue/popover";
import Skeleton from "primevue/skeleton";
import DataView from "primevue/dataview";
import Loader from "@/components/Common/Loader.vue";
import GridSkeleton from "@/components/SkeletonLoaders/GridSkeleton.vue";

const props = withDefaults(
  defineProps<{
    hotels: HotelArray;
    loading?: boolean;
    loadingMore?: boolean;
    useLoadMoreButton?: boolean;
    hasMore?: boolean;
  }>(),
  {
    useLoadMoreButton: true,
    hasMore: false,
  },
);

const isInitialLoading = ref(true);
const isClient = import.meta.client;

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
const sortLoading = ref(false);

const togglePopover = (event: Event) => {
  sortPopover.value?.toggle(event);
};

const changeSortBy = (option: SearchParamOption) => {
  sortLoading.value = true;
  sortedBy.value = option.label;
  sortPopover.value?.hide();
  emit("sort", { key: option.paramKey, value: option.paramValue });

  setTimeout(() => {
    sortLoading.value = false;
  }, 300);
};

const clearSort = () => {
  sortLoading.value = true;
  sortedBy.value = null;
  sortPopover.value?.hide();
  emit("sort", { key: "ordering", value: "recommended" });

  setTimeout(() => {
    sortLoading.value = false;
  }, 300);
};

const getSortIcon = (paramValue: string): string => {
  const iconMap: Record<string, string> = {
    recommended: "pi pi-star",
    price: "pi pi-arrow-up",
    "-price": "pi pi-arrow-down",
    stars: "pi pi-sort-amount-up",
    "-stars": "pi pi-sort-amount-down",
  };
  return iconMap[paramValue] || "pi pi-sort";
};

const end = ref<HTMLElement | null>(null);

let observer: IntersectionObserver | null = null;

const bindObserver = (el: HTMLElement) => {
  if (!isClient || props.useLoadMoreButton) return;

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
  if (end.value && !props.useLoadMoreButton) {
    bindObserver(end.value);
  }
});

onUnmounted(() => {
  unbindObserver();
});
</script>

<style scoped>
/* Enhanced sorting animations and transitions */
.sort-button-enter-active,
.sort-button-leave-active {
  transition: all 0.2s ease-out;
}

.sort-button-enter-from,
.sort-button-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* Popover slide-in animation */
:deep(.p-popover) {
  animation: slideInDown 0.2s ease-out;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Smooth hover transitions for sort options */
.sort-option {
  position: relative;
  overflow: hidden;
}

.sort-option::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(var(--primary-300), 0.1),
    transparent
  );
  transition: left 0.5s;
}

.sort-option:hover::before {
  left: 100%;
}

/* Active sort indicator pulse */
@keyframes activePulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

.active-sort-indicator {
  animation: activePulse 2s infinite;
}

/* Mobile-optimized spacing */
@media (max-width: 640px) {
  .sort-button {
    min-width: 120px;
  }

  .sort-popover {
    min-width: 180px;
  }
}
</style>
