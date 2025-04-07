<template>
  <div class="container mx-auto px-3 py-6">
    <div class="mb-6 flex w-full justify-end">
      <Skeleton
        height="3rem"
        width="8rem"
        borderRadius="12px"
        animation="wave"
        :pt="{
          root: {
            class: [
              'bg-light-100 dark:bg-dark-200',
              'shadow-md dark:shadow-primary-200/20',
              'relative overflow-hidden',
            ],
          },
        }"
      />
    </div>
    <div
      class="grid h-full grid-cols-1 items-center justify-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <template v-for="n in 8" :key="n">
        <Skeleton
          height="228px"
          width="100%"
          borderRadius="12px"
          animation="wave"
          :pt="{
            root: {
              class: [
                'bg-light-100 dark:bg-dark-200',
                'shadow-md dark:shadow-primary-200/20',
                'relative overflow-hidden',
              ],
            },
          }"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
// Skeleton is auto-imported from PrimeVue
</script>

<style scoped>
:deep(.p-skeleton::after) {
  background: linear-gradient(
    90deg,
    transparent,
    rgb(36, 104, 83, 0.4),
    transparent
  );
}

:deep(.dark .p-skeleton::after) {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(99, 102, 241, 0.2),
    transparent
  );
}
</style>
