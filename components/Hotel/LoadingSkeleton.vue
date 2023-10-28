<template>
  <div class="skeleton-loader container mx-auto h-screen">
    <!-- Main image skeleton -->
    <div
      class="bg-shimmer-gradient bg-200% animate-shimmer mb-4 h-[40%] w-full rounded-md"
    ></div>

    <div class="p-4">
      <!-- Carousel image skeletons -->
      <div class="mb-4 flex space-x-2 sm:flex-col sm:space-x-0 sm:space-y-2">
        <div
          class="bg-shimmer-gradient bg-200% animate-shimmer h-24 w-1/4 rounded-md"
        ></div>
        <div
          class="bg-shimmer-gradient bg-200% animate-shimmer h-24 w-1/4 rounded-md"
        ></div>
        <div
          class="bg-shimmer-gradient bg-200% animate-shimmer h-24 w-1/4 rounded-md"
        ></div>
      </div>

      <!-- Title skeleton -->
      <div
        class="bg-shimmer-gradient bg-200% animate-shimmer mb-4 h-6 w-3/4 rounded-md"
      ></div>

      <!-- Description skeleton -->
      <div
        class="bg-shimmer-gradient bg-200% animate-shimmer mb-2 h-32 w-full rounded-md"
      ></div>
    </div>
  </div>
</template>
