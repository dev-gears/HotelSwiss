<template>
  <div
    class="grid grid-cols-1 gap-4 bg-light-100 p-4 md:grid-cols-2 lg:grid-cols-3 lg:p-0"
  >
    <CommonBackButton class="fixed left-5 top-5" />
    <Image
      class="transition-all hover:brightness-75 lg:px-0 [&_img]:h-full [&_img]:w-full [&_img]:rounded [&_img]:object-cover"
      v-for="data in images"
      preview
      :src="backendUrl + data.original"
    />
  </div>
</template>

<script setup>
defineProps({
  images: {
    type: Array,
    required: true,
  },
});

const runtimeConfig = useRuntimeConfig();
const backendUrl = runtimeConfig.public.backendUrl;
</script>

<style>
.p-image-toolbar svg {
  @apply !text-light;
}
</style>
