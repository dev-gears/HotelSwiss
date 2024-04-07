<template>
  <div class="flex flex-col items-center justify-center gap-6">
    <div class="flex flex-col gap-4 md:grid md:grid-cols-3 lg:grid-cols-4">
      <Card
        v-for="(hotel, index) in hotels"
        :key="hotel.id"
        :hotel="hotel"
        :showAmenities="true"
      />
      <div ref="end"></div>
    </div>
    <ProgressSpinner v-if="state.loading" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, reactive } from "vue";
import type { Hotel } from "@/types/hotel";
const props = defineProps<{
  hotels: Array<Hotel>;
  nextUrl: string | null;
}>();

const state = reactive({
  hotels: props.hotels,
  nextUrl: props.nextUrl,
  loading: false,
});

const end = ref<HTMLElement | null>(null);

let observer: IntersectionObserver | null = null;

/**
 * Fetch more hotels when the end of the list is reached
 * @returns {Promise<void>}
 */
const fetchMoreHotels = async (): Promise<void> => {
  if (state.nextUrl && !state.loading) {
    state.loading = true;
    try {
      const data = await $hotelApi(state.nextUrl);
      state.hotels.push(...data.results);
      state.nextUrl = data.nextUrl;
    } catch (error) {
      console.error(error);
    } finally {
      state.loading = false;
    }
  }
};

/**
 * Intersection observer to fetch more hotels
 * when the end of the list is reached
 */
onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && state.nextUrl) {
        fetchMoreHotels();
      }
    },
    {
      rootMargin: "100px",
    },
  );

  if (end.value) {
    observer.observe(end.value);
  }
});

/**
 * Disconnect the observer when the component is unmounted
 */
onUnmounted(() => {
  if (observer) observer.disconnect();
});

/**
 * Watch for changes in the nextUrl prop
 * Update the nextUrl in the state
 */
watch(
  () => props.nextUrl,
  (newUrl) => {
    state.nextUrl = newUrl;
  },
);
</script>

<style scoped>
@keyframes slidedown-icon {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(20px);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
