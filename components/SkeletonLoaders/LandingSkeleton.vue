<template>
  <div class="container mx-auto h-[60vh] px-3 py-6">
    <Skeleton
      height="5rem"
      width="100%"
      borderRadius="12px"
      animation="wave"
      class="mb-6"
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
    <div class="flex h-5/6 items-center justify-center gap-6">
      <Skeleton
        height="100%"
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
      <Skeleton
        height="100%"
        width="100%"
        borderRadius="12px"
        animation="wave"
        class="max-md:hidden"
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
      <Skeleton
        height="100%"
        width="100%"
        borderRadius="12px"
        animation="wave"
        class="max-lg:hidden"
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
      <Skeleton
        height="100%"
        width="100%"
        borderRadius="12px"
        animation="wave"
        class="max-sm:hidden"
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

    <div class="mt-6 flex h-20 gap-6">
      <Skeleton
        height="100%"
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
      <Skeleton
        height="100%"
        width="100%"
        borderRadius="12px"
        animation="wave"
        class="max-md:hidden"
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
      <Skeleton
        height="100%"
        width="100%"
        borderRadius="12px"
        animation="wave"
        class="max-lg:hidden"
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
      <Skeleton
        height="100%"
        width="100%"
        borderRadius="12px"
        animation="wave"
        class="max-sm:hidden"
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
