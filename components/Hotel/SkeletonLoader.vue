<template>
  <div class="skeleton-loader container mx-auto h-screen">
    <div
      class="relative mb-4 h-[40%] w-full animate-shimmer rounded-md bg-shimmer-gradient bg-200%"
    >
      <div
        class="absolute -bottom-20 right-5 z-10 mb-4 flex gap-2 max-sm:w-[100px] max-sm:flex-col sm:space-x-0 md:w-1/2"
      >
        <div
          class="h-24 w-full animate-shimmer rounded-md bg-shimmer-gradient bg-200%"
        ></div>
        <div
          class="h-24 w-full animate-shimmer rounded-md bg-shimmer-gradient bg-200%"
        ></div>
        <div
          class="h-24 w-full animate-shimmer rounded-md bg-shimmer-gradient bg-200%"
        ></div>
      </div>
    </div>
    <div class="mt-5 grid p-4 md:mt-20">
      <div
        class="mb-4 h-20 w-3/5 animate-shimmer rounded-md bg-shimmer-gradient bg-200%"
      ></div>

      <div
        class="mb-2 h-64 w-full animate-shimmer rounded-md bg-shimmer-gradient bg-200%"
      ></div>
    </div>
  </div>
</template>
