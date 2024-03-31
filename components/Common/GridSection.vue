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

const fetchMoreHotels = async () => {
  if (state.nextUrl && !state.loading) {
    state.loading = true;
    const { data: newData } = await useHotelApiData(state.nextUrl);

    state.hotels.push(...newData.value.results);
    state.nextUrl = newData.value.nextUrl;
    state.loading = false;
  }
};

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

onUnmounted(() => {
  if (observer) observer.disconnect();
});

watch(
  () => props.nextUrl,
  (newUrl) => {
    state.nextUrl = newUrl;
  },
);
</script>
