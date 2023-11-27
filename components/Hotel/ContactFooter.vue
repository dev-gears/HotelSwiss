<template>
  <div
    class="bg-light container fixed bottom-0 flex w-full items-center justify-between border-t-2 border-primary-100/40 px-7 py-4"
  >
    <div v-if="startPrice" class="flex flex-col justify-start">
      <p class="font-patuaOne text-base text-primary-200">
        From: <span>{{ startPrice }}</span
        >$
      </p>
      <p class="font-patuaOne text-base text-primary-200">
        To: <span>{{ endPrice }}$</span>
      </p>
    </div>
    <div v-else>
      <p>Price not available</p>
    </div>
    <div>
      <Button class="text-light rounded-md bg-primary px-2 py-1 text-2xl"
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
