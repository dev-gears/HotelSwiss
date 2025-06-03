<template>
  <div class="container mx-auto flex flex-col gap-6">
    <!-- Hero Section Skeleton -->
    <div
      class="relative w-full rounded-lg bg-light p-6 shadow-md dark:bg-dark-100"
    >
      <div class="flex flex-col items-center justify-center text-center">
        <!-- Title and subtitle -->
        <Skeleton class="mb-4 !h-12 w-3/5 rounded-md" />
        <Skeleton class="mb-6 !h-6 w-4/5 rounded-md" />

        <!-- Background image skeleton -->
        <div class="relative h-60 w-full overflow-hidden rounded-lg">
          <Skeleton class="!h-full !w-full" />
        </div>
      </div>
    </div>

    <!-- Description Section Skeleton -->
    <div class="rounded-lg bg-light p-6 shadow-md dark:bg-dark-100">
      <Skeleton class="mb-4 !h-8 w-1/3 rounded-md" />
      <div class="flex flex-col gap-3">
        <Skeleton class="!h-4 w-full rounded-md" />
        <Skeleton class="!h-4 w-full rounded-md" />
        <Skeleton class="!h-4 w-4/5 rounded-md" />
        <Skeleton class="!h-4 w-3/5 rounded-md" />
      </div>
    </div>

    <!-- Map Section Skeleton (Only for Canton page) -->
    <div
      v-if="showMap"
      class="rounded-lg bg-light p-6 shadow-md dark:bg-dark-100"
    >
      <Skeleton class="mb-4 !h-8 w-1/4 rounded-md" />
      <div class="relative h-80 overflow-hidden rounded-lg">
        <div
          class="flex h-full w-full items-center justify-center bg-light-200 dark:bg-dark-200"
        >
          <div class="text-center">
            <i class="pi pi-map mb-4 text-4xl text-primary" />
            <p class="font-robotoRegular text-gray-600 dark:text-gray-400">
              {{ $t("Common.loading") }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Hotels Section Skeleton -->
    <div class="rounded-lg bg-light p-6 shadow-md dark:bg-dark-100">
      <div class="mb-6 flex items-center justify-between">
        <Skeleton class="!h-8 w-1/3 rounded-md" />
        <Skeleton class="!h-5 w-1/6 rounded-md" />
      </div>

      <!-- Hotel Grid Skeleton -->
      <div
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <div
          v-for="i in 8"
          :key="i"
          class="h-[400px] rounded-lg p-3 shadow-md dark:bg-dark-300"
        >
          <div class="flex h-full flex-col gap-3">
            <Skeleton class="!h-48 !w-full rounded-lg" />
            <Skeleton class="!h-7 w-4/5 rounded-md" />
            <Skeleton class="!h-4 w-full rounded-md" />
            <Skeleton class="!h-4 w-2/3 rounded-md" />
            <div class="mt-auto flex items-center justify-between">
              <Skeleton class="!h-6 w-1/3 rounded-md" />
              <Skeleton class="!h-10 w-1/3 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      <!-- Load More Button Skeleton -->
      <div class="mt-8 flex justify-center">
        <Skeleton class="!h-12 w-40 rounded-full" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Skeleton from "@/components/Common/Display/Skeleton.vue";

defineProps({
  showMap: {
    type: Boolean,
    default: false,
  },
});
</script>
