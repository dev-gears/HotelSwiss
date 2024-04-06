<template>
  <NuxtLink class="fallback-background" :to="`/hotel/${hotelId}`">
    <img
      ref="imageRef"
      @error="handleError"
      class="h-full w-full rounded-br-[60px] object-cover shadow-cardImage"
      :src="backendUrl + imageUrl"
      :alt="`Image of ${title}`"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  hotelId: number;
  imageUrl: string;
  title: string;
  backendUrl: string;
}>();

const imageUrl = ref(props.imageUrl);
const imageRef = ref<HTMLImageElement | null>(null);

const handleError = () => {
  imageRef.value?.setAttribute("src", "/placeholder.jpg");
  imageRef.value?.classList.add("object-contain");
  imageRef.value?.classList.remove("object-cover");
};
</script>
