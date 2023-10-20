<template>
  <div
    @click="updateSource"
    class="flex items-center justify-center rounded-md grayscale transition duration-300 ease-in-out"
    :class="selected ? 'scale-110 shadow-2xl grayscale-0' : ''"
  >
    <img
      class="visible rounded-md object-cover"
      :src="imageUrl"
      alt="carousel image of a hotel"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  imageUrl: String,
  imageAlt: String,
  clickHandler: Function as PropType<(src: string) => void>,
  selected: Boolean,
});

const updateSource = () => {
  if (props.clickHandler && props.imageUrl) {
    props.clickHandler(props.imageUrl);
  }
};
</script>

<style>
.thumbnail-carousel {
  .p-carousel-item {
    @apply flex items-center justify-center rounded-md;

    img {
      @apply my-1 h-[70px] w-full rounded object-cover;
    }
  }
}
</style>
