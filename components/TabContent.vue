<template>
  <div class="flex flex-col items-center">
    <CommonBlockHeader :title="props.name" />
    <div v-if="isLoading">
      <Loader />
    </div>
    <div
      class="flex grid-cols-2 flex-col gap-4 md:grid md:grid-cols-3 lg:grid-cols-4"
      v-else-if="hotels.length"
    >
      <CardGridCard v-for="hotel in hotels" :hotel="hotel" />
    </div>
    <div v-else>No hotels found</div>

    <Button
      icon="pi pi-refresh"
      class="mx-auto mt-3 border px-3 py-2"
      label="Load more"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useHotelService } from "@/services/useHotelService";
import { Hotel } from "@/types/hotel";

const props = defineProps<{ id: string; name: string }>();
const { fetchHotelsByCategory, categorizedHotels } = useHotelService();
const hotels = ref<Hotel[]>([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    isLoading.value = true;
    await fetchHotelsByCategory(props.id);
    hotels.value = categorizedHotels.value;
  } catch (error) {
    console.error(
      "An error occurred while fetching hotels by category:",
      error,
    );
  } finally {
    isLoading.value = false;
  }
});
</script>
