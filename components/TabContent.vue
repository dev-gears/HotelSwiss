<template>
  <div>
    <h2 class="mb-3 border-b-2 text-[2rem]">{{ props.name }}</h2>
    <div v-if="isLoading">
      <Loader />
    </div>
    <div
      class="flex flex-col gap-2 md:grid md:grid-cols-2 lg:grid-cols-3"
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

const props = defineProps<{ id: string; name: string }>();
const { fetchHotelsByCategory, categorizedHotels } = useHotelService();
const hotels = ref<Hotel[]>([]);
const isLoading = ref(true);

onMounted(() => {
  fetchHotelsByCategory(props.id)
    .then(() => {
      hotels.value = categorizedHotels.value;
    })
    .finally(() => {
      isLoading.value = false;
    });
});
</script>
