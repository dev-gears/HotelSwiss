<template>
  <HotelLoadingSkeleton v-if="isLoading" />
  <div v-else>
    <HotelHero :imageUrl="hotel?.image!" :title="hotel?.title!" />
    <div class="mt-12 flex w-full flex-col gap-5 p-4">
      <CommonBlockHeader :title="hotel?.title" />
      <CommonBackdrop>
        <p class="text-lg">
          {{ hotel?.description }}
        </p>
      </CommonBackdrop>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHotelService } from "@/services/useHotelService";
import { useFetchData } from "@/composables/useFetchData";

definePageMeta({
  layout: "single",
});
const route = useRoute();

const { fetchHotelById, hotel } = useHotelService();
const { isLoading } = useFetchData(
  () => fetchHotelById(`${route.params.id}`),
  hotel,
);
</script>
