<template>
  <div
    @click="updateSource"
    class="flex w-full cursor-pointer items-center justify-center rounded-md grayscale transition duration-300 ease-in-out lg:w-4/5"
    :class="selected ? 'scale-110 grayscale-0' : ''"
  >
    <div
      :style="`background-image: url(${imageUrl});`"
      class="image visible rounded-md bg-cover bg-no-repeat transition duration-300 ease-in-out"
    ></div>
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

    .image {
      @apply my-1 h-[70px] w-full rounded object-cover;
    }
  }
}
</style>
