<template>
  <div>
    <h2 class="mb-3 border-b-2 text-[2rem]">{{ props.name }}</h2>
    <div v-if="isLoading">
      <Loader />
    </div>
    <div
      class="flex grid-cols-3 flex-col gap-2 lg:grid"
      v-else-if="hotels.length"
    >
      <Card v-for="hotel in hotels" :hotel="hotel" />
    </div>
    <div v-else>No hotels found</div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted } from "vue";
import { useHotelService } from "@/services/dataProvider";
import { Hotel } from "@/types/hotel";

const props = defineProps<{ slug: string; name: string }>();
const { fetchHotelsByCategory, categorizedHotels } = useHotelService();
const hotels = ref<Hotel[]>([]);
const isLoading = ref(true);

onMounted(() => {
  fetchHotelsByCategory(props.slug)
    .then(() => {
      hotels.value = categorizedHotels.value;
    })
    .finally(() => {
      isLoading.value = false;
    });
});
</script>
