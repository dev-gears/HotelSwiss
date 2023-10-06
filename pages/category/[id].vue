<template>
  <div>Category page {{ route.params.id }}</div>
</template>

<script setup lang="ts">
import { useHotelService } from "services/dataProvider";
const route = useRoute();
</script>
