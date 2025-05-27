<template>
  <div
    class="container mx-auto mb-3 h-screen overflow-hidden bg-light-100 dark:bg-dark-100"
  >
    <!-- Hero image skeleton -->
    <div class="relative my-4 w-full">
      <Skeleton class="!h-[40vh] w-full rounded-md" />
    </div>
    <!-- Content area -->
    <div class="mt-5 p-4">
      <!-- Title -->
      <Skeleton class="mb-4 !h-10 w-3/5 rounded-md font-patuaOne" />

      <!-- Main content grid -->
      <div class="mb-6 md:grid md:grid-cols-[2fr,1fr] md:gap-6">
        <!-- Left column -->
        <div class="flex flex-col gap-6">
          <!-- Hotel content section -->
          <div class="rounded-md bg-primary/10 p-4 dark:bg-dark-200">
            <!-- Description area -->
            <div class="mb-4">
              <Skeleton class="mb-3 !h-4 w-full rounded-md" />
              <Skeleton class="mb-3 !h-4 w-full rounded-md" />
              <Skeleton class="mb-3 !h-4 w-4/5 rounded-md" />
            </div>
            <!-- 3-column info section -->
            <div
              class="border-gray-300 dark:border-gray-600 flex items-center justify-center rounded-lg border p-4"
            >
              <Skeleton class="!h-14 w-1/3 rounded-md" />
              <Skeleton class="mx-2 !h-14 w-1/3 rounded-md" />
              <Skeleton class="!h-14 w-1/3 rounded-md" />
            </div>
          </div>

          <!-- Amenities section -->
          <div>
            <Skeleton class="mb-4 !h-6 w-1/4 rounded-md" />
            <div class="flex flex-col gap-3">
              <!-- Multiple amenity rows -->
              <div class="flex items-center gap-3">
                <Skeleton class="!h-10 w-10 rounded-md" />
                <Skeleton class="!h-6 w-48 rounded-md" />
              </div>
              <div class="flex items-center gap-3">
                <Skeleton class="!h-10 w-10 rounded-md" />
                <Skeleton class="!h-6 w-40 rounded-md" />
              </div>
              <div class="flex items-center gap-3">
                <Skeleton class="!h-10 w-10 rounded-md" />
                <Skeleton class="!h-6 w-44 rounded-md" />
              </div>
              <div class="flex items-center gap-3">
                <Skeleton class="!h-10 w-10 rounded-md" />
                <Skeleton class="!h-6 w-36 rounded-md" />
              </div>
              <Skeleton class="mt-2 !h-12 w-32 rounded-md" />
            </div>
          </div>
        </div>

        <!-- Right column (contact form) - hidden on mobile -->
        <div class="max-md:hidden">
          <Skeleton class="sticky top-3 !h-[400px] w-full rounded-2xl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Skeleton from "@/components/Common/Display/Skeleton.vue";
</script>
