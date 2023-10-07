<template>
  <div>Single Hotel {{ route.params.id }}</div>
  <HotelHero :imageUrl="hotel?.image!" :title="hotel?.name!" />
</template>

<script setup lang="ts">
import { useHotelService } from "@/services/dataProvider";
const route = useRoute();

const { fetchHotelById, hotel } = useHotelService();
onMounted(() => {
  fetchHotelById(`${route.params.id}`);
});
</script>
