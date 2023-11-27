<template>
  <div
    class="container fixed bottom-0 flex w-full items-center justify-between border-t-2 bg-lightBackground px-7 py-4"
  >
    <div v-if="startPrice" class="flex flex-col justify-start">
      <p class="font-patuaOne text-base">
        From: <span>{{ startPrice }}</span
        >$
      </p>
      <p class="font-patuaOne text-base">
        To: <span>{{ endPrice }}$</span>
      </p>
    </div>
    <div v-else>
      <p>Price not available</p>
    </div>
    <div>
      <Button
        class="rounded-md bg-primary-300 px-2 py-1 text-2xl text-secondary"
        >Contact Hotel</Button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  startPrice: String,
  endPrice: String,
});
</script>
