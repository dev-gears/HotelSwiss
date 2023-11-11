<template>
  <div
    @click="updateSource"
    class="flex h-full cursor-pointer items-center justify-center rounded-md border-2 border-primary-300 transition duration-300 ease-in-out lg:w-4/5"
  >
    <Image
      class="image max-w-auto h-full rounded-md object-fill grayscale transition duration-300 ease-in-out"
      :class="
        selected ? 'scale-105 border-2 border-secondary-400 grayscale-0' : ''
      "
      :src="imageUrl"
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
.image {
  img {
    @apply h-full w-full rounded-md object-cover;
  }
}
</style>
