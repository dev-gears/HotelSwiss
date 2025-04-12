<template>
  <div class="card min-h-[500px]">
    <SkeletonLoadersGridSkeleton v-if="isInitialLoading" />
    <DataView
      v-else
      :value="safeHotels"
      :layout="layout"
      :paginator="false"
      :rows="12"
      :pt="{
        root: 'bg-light-100 dark:bg-dark-100 border-light dark:border-dark-100',
        header:
          'bg-light dark:bg-dark-300 border-light dark:border-dark-100 mb-4 shadow-card rounded-xl',
        content: 'bg-light-100 dark:bg-dark-100',
      }"
      dataKey="id"
      class="min-h-[400px]"
    >
      <template #header>
        <div class="flex min-h-[48px] w-full items-center justify-between">
          <div class="flex items-center gap-3">
            <Button
              type="button"
              :label="sortedBy ? sortedBy : $t('Common.sortBy')"
              @click="togglePopover"
              class="flex justify-between rounded-xl rounded-tr-none bg-light px-3 py-2 text-primary shadow focus:shadow"
              :icon="popoverVisible ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"
            />

            <Popover
              @hide="popoverVisible = false"
              @show="popoverVisible = true"
              ref="sortPopover"
              :pt="{
                root: 'rounded-xl !rounded-tr-none bg-light shadow',
                content:
                  'flex justify-between !rounded-xl !rounded-tr-none bg-light px-3 py-2 text-primary-200 shadow focus:shadow',
              }"
            >
              <div class="flex flex-col divide-y">
                <div
                  v-for="(option, index) in sortByOptions"
                  :key="option.label + index"
                  class="cursor-pointer !border-y-primary-100/15 p-2 transition-all hover:bg-light-100"
                  @click="changeSortBy(option)"
                >
                  {{ option.label }}
                </div>
              </div>
            </Popover>
          </div>
          <SelectButton
            v-model="layout"
            :options="layoutOptions"
            :allowEmpty="false"
            class="overflow-x-auto"
          >
            <template #option="{ option }">
              <i
                :class="[option === 'list' ? 'pi pi-bars' : 'pi pi-th-large']"
              />
            </template>
          </SelectButton>
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
            class="mx-auto min-h-[400px] w-full max-w-[400px]"
          />
        </div>
      </template>

      <template #list>
        <div v-if="isInitialLoading || loading" class="flex flex-col gap-4">
          <div
            v-for="i in 8"
            :key="i"
            class="flex min-h-[250px] flex-col gap-4 rounded-xl bg-light p-4 dark:bg-dark-300 sm:flex-row"
          >
            <Skeleton
              class="!h-[228px] !w-full rounded-xl sm:!w-[330px]"
              style="aspect-ratio: 16/9"
            />
            <div class="flex flex-1 flex-col justify-between gap-4">
              <div class="flex flex-col gap-2">
                <Skeleton width="60%" height="2rem" />
                <Skeleton width="100%" height="4rem" />
                <div class="flex gap-2">
                  <Skeleton width="20%" height="2rem" />
                  <Skeleton width="20%" height="2rem" />
                  <Skeleton width="20%" height="2rem" />
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex flex-col gap-1">
                  <Skeleton width="4rem" height="1rem" />
                  <Skeleton width="6rem" height="2rem" />
                </div>
                <Skeleton width="8rem" height="2.5rem" borderRadius="0.75rem" />
              </div>
            </div>
          </div>
        </div>
        <div v-else class="flex flex-col gap-4">
          <ListCard
            v-for="hotel in safeHotels"
            :key="hotel.id"
            :hotel="hotel"
          />
        </div>
      </template>
    </DataView>
    <div class="card mt-3 flex justify-center" v-if="loadingMore">
      <CommonLoader />
    </div>
    <div id="observed-item" ref="end"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from "vue";
import type { Hotel } from "@/types/hotel";
import Card from "@/components/Card/Card.vue";
import ListCard from "@/components/Card/ListCard.vue";
import Skeleton from "primevue/skeleton";
import Button from "primevue/button";
import Popover from "primevue/popover";

const props = defineProps<{
  hotels: Array<Hotel>;
  loading?: boolean;
  loadingMore?: boolean;
}>();

const isInitialLoading = ref(true);
const isClient = process.client;

// Create a computed property to ensure hotels is always an array even during SSR
const safeHotels = computed(() => {
  return Array.isArray(props.hotels) ? props.hotels : [];
});

// Update loading state when hotels are populated
watch(
  () => props.hotels,
  (newHotels) => {
    if (newHotels && newHotels.length > 0) {
      isInitialLoading.value = false;
    }
  },
  { immediate: true },
);

// Ensure loading is handled correctly during SSR
onMounted(() => {
  // If we have hotels data on mount, update the loading state
  if (safeHotels.value.length > 0) {
    isInitialLoading.value = false;
  }
});

const emit = defineEmits<{
  (e: "sort", params: { key: string; value: string }): void;
  (e: "loadMore"): void;
}>();

const layout = ref("grid");
const layoutOptions = ref(["list", "grid"]);

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
  if (!isClient) return; // Only bind observer on client-side

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

<style scoped>
.p-selectbutton .p-button {
  @apply border border-light-200 px-4 py-2.5 text-sm transition-all duration-200 first:rounded-l-xl last:rounded-r-xl hover:bg-light-200 focus:outline-none focus:ring-2 focus:ring-primary-200/50 dark:border-dark-200 dark:hover:bg-dark-200;
}

.p-selectbutton .p-button.p-highlight {
  @apply border-primary-200 bg-primary-200 text-light dark:bg-primary-200 dark:text-light;
}

.p-selectbutton .p-button:not(.p-highlight) {
  @apply bg-light-100 text-dark dark:bg-dark-300 dark:text-light;
}
</style>
