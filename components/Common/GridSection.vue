<template>
  <div>
    <SkeletonLoadersGridSkeleton v-if="state.gridLoading" :items="8" />
    <div v-else class="flex flex-col items-center justify-center gap-4">
      <div class="card flex w-full justify-end">
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
      <div
        class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <Card
          v-for="hotel in state.hotels"
          :key="hotel.id"
          :hotel="hotel"
          :showAmenities="true"
          class="mx-auto w-full max-w-[400px]"
        />
      </div>
      <div class="card flex justify-center" v-if="state.paginationLoading">
        <CommonLoader />
      </div>
    </div>
    <div id="observed-item" ref="end"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, reactive } from "vue";
import type { Hotel } from "@/types/hotel";
import Card from "@/components/Card/Card.vue";

const props = defineProps<{
  hotels: Array<Hotel>;
  initialRequestUrl: string | null;
  nextUrl: string | null;
}>();

const state = reactive({
  hotels: props.hotels,
  nextUrl: props.nextUrl,
  paginationLoading: false,
  gridLoading: false,
});

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

/**
 * Toggle the visibility of the popover
 */
const togglePopover = (event: Event) => {
  sortPopover.value?.toggle(event);
};

/**
 * Handle sort option selection
 */
const changeSortBy = (option: SearchParamOption) => {
  sortedBy.value = option.label;
  sortPopover.value?.hide();

  fetchSortedHotels(option.paramKey, option.paramValue);
};

/**
 * Fetch hotels based on the selected search params
 */
const fetchSortedHotels = async (
  paramKey: string,
  paramValue: string,
): Promise<void> => {
  try {
    unbindObserver(end.value!);
    state.gridLoading = true;

    const params = new URLSearchParams({
      [paramKey]: paramValue,
    });
    const data = (await $hotelApi(
      `${props.initialRequestUrl}?${params.toString()}`,
    )) as {
      results: Hotel[];
      next: string | null;
    };

    state.hotels = data.results;
    state.nextUrl = data.next;
  } catch (error) {
    console.error("Error fetching sorted hotels:", error);
  } finally {
    bindObserver(end.value!);
    state.gridLoading = false;
  }
};

const end = ref<HTMLElement | null>(null);

let observer: IntersectionObserver | null = null;

/**
 * Fetch more hotels when the end of the list is reached
 */
const fetchMoreHotels = async (): Promise<void> => {
  if (state.nextUrl && !state.paginationLoading) {
    state.paginationLoading = true;
    try {
      const data = (await $hotelApi(state.nextUrl)) as {
        results: Hotel[];
        next: string | null;
      };

      state.hotels.push(...data.results);
      state.nextUrl = data.next;
    } catch (error) {
      console.error("Error fetching more hotels:", error);
    } finally {
      state.paginationLoading = false;
    }
  }
};

const bindObserver = (el: HTMLElement) => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && state.nextUrl) {
        fetchMoreHotels();
      }
    },
    {
      rootMargin: "300px",
    },
  );
  observer.observe(el);
};

const unbindObserver = (el: HTMLElement) => {
  observer?.disconnect();

  observer = null;
};

/**
 * Intersection observer to fetch more hotels
 * when the end of the list is reached
 */
onMounted(() => {
  bindObserver(end.value!);
});

onUnmounted(() => {
  unbindObserver(end.value!);
});
</script>

<style scoped>
.hover\:bg-emphasis:hover {
  background-color: var(--primary-bg-hover);
}
.min-w-48 {
  min-width: 12rem;
}
</style>
