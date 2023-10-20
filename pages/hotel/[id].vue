<template>
  <div class="">
    <HotelHero :imageUrl="hotel?.image!" :title="hotel?.name!" />
    <div class="mt-12 flex w-full flex-col gap-5 p-4">
      <CommonBlockHeader :title="hotel?.name" />
      <CommonBackdrop>
        <p class="text-lg">
          {{ hotel?.description }}
        </p>
      </CommonBackdrop>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHotelService } from "@/services/dataProvider";

definePageMeta({
  layout: "single",
});
const route = useRoute();

const { fetchHotelById, hotel } = useHotelService();
onMounted(async () => {
  await fetchHotelById(`${route.params.id}`);
});
</script>
