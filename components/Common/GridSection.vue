<template>
  <div class="flex flex-col items-center justify-center gap-6">
    <div
      class="flex w-full flex-col gap-4 md:grid md:grid-cols-3 lg:grid-cols-4"
    >
      <Card
        v-for="hotel in hotels"
        :key="hotel.id"
        :hotel="hotel"
        :showAmenities="true"
        class="w-[-webkit-fill-available]"
      />
    </div>
    <div class="card flex justify-center" v-if="state.loading">
      <CommonLoader />
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
      const data = (await $hotelApi(state.nextUrl)) as {
        results: Hotel[];
        next: string | null;
      };
      state.hotels.push(...data.results);
      state.nextUrl = data.next;
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
      rootMargin: "300px",
    },
  );
  observer.observe(end.value!);
});

onUnmounted(() => {
  observer?.disconnect();
});
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
