<template>
  <div class="flex flex-col items-center">
    <CommonBlockHeader :title="props.name" />
    <div v-if="isLoading">
      <Loader />
    </div>
    <div
      class="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3"
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
