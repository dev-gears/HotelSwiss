<template>
  <div class="max-sm:px-4">
    <CommonBlockHeader :title="`Category:`" />
    <CommonGridSection :hotels="categorizedHotels" />
  </div>
</template>

<script setup lang="ts">
import { useHotelService } from "@/services/useHotelService";
import { useFetchData } from "@/composables/useFetchData";
import { useRoute } from "vue-router";
definePageMeta({
  layout: "archive",
});

const route = useRoute();
const { fetchHotelsByCategory, categorizedHotels } = useHotelService();
const { isLoading } = useFetchData(
  () => fetchHotelsByCategory(`${route.params.id}`),
  categorizedHotels,
  true,
);
</script>
