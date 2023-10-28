<template>
  <div class="max-sm:px-4">
    <CommonBlockHeader :title="`Category: ${categoryName}`" />
    <CommonGridSection :hotels="categorizedHotels" />
  </div>
</template>

<script setup lang="ts">
import { useHotelService } from "@/services/useHotelService";
definePageMeta({
  layout: "archive",
});

const { fetchHotelsByCategory, categorizedHotels } = useHotelService();
const route = useRoute();
const categoryName = ref("");
onMounted(async () => {
  await fetchHotelsByCategory(`${route.params.id}`);
  categoryName.value = categorizedHotels.value[0].category.name;
});
</script>
services/useHotelServices
