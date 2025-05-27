<template>
  <div
    v-ripple
    class="z-40 hidden h-full w-9 items-center justify-center rounded-xl bg-primary shadow dark:bg-dark-200 lg:flex"
  >
    <div
      class="flex w-5 items-center justify-center rounded"
      :class="{ 'prev-slide-button': direction }"
    >
      <Image
        :src="`/icons/${direction}-arrow.svg`"
        :alt="`${direction} arrow`"
        class="dark:opacity-80"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  direction: {
    type: String as () => "prev" | "next",
    required: true,
    validator: (value: string) => ["prev", "next"].includes(value),
  },
});
</script>
