<template>
  <div class="card"></div>
</template>

<script setup>
defineProps({
  images: {
    type: Array,
    required: true,
  },
});

const responsiveOptions = ref([
  {
    breakpoint: "1300px",
    numVisible: 4,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
  },
]);
</script>
