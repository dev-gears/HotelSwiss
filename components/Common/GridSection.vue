<template>
  <div class="flex flex-col gap-4 md:grid md:grid-cols-3 lg:grid-cols-4">
    <Card
      v-for="(hotel, index) in hotels"
      :key="hotel.id"
      :hotel="hotel"
      :showAmenities="true"
    />
    <div v-if="false" ref="end"></div>
    <!-- v-if value - bindIntersection after API change -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import { Hotel } from "types/hotel";

const { hotels, nextUrl } = defineProps<{
  hotels: Array<Hotel>;
  nextUrl: string | null;
  bindIntersection: boolean;
}>();

let observer: IntersectionObserver | null = null;
const end = ref(null);

onMounted(() => {
  if (!nextUrl) return;
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && nextUrl) {
      const { data: hotels, pending } = useHotelApiData(nextUrl);
    }
  });

  if (end?.value) {
    observer.observe(end.value);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

watch(hotels, () => {
  if (observer) {
    observer.disconnect();
  }

  if (end.value) {
    observer?.observe(end.value);
  }
});
</script>
