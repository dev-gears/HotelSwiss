<template>
  <div class="skeleton-loader container mx-auto h-[50vh] p-4">
    <div
      class="mb-4 h-1/6 animate-shimmer rounded-md bg-shimmer-gradient bg-200%"
    ></div>
    <div class="flex h-5/6 items-center justify-center gap-4">
      <div
        class="h-full w-full animate-shimmer rounded-md bg-shimmer-gradient bg-200%"
      ></div>
      <div
        class="h-full w-full animate-shimmer rounded-md bg-shimmer-gradient bg-200% max-md:hidden"
      ></div>
      <div
        class="h-full w-full animate-shimmer rounded-md bg-shimmer-gradient bg-200% max-lg:hidden"
      ></div>
      <div
        class="h-full w-full animate-shimmer rounded-md bg-shimmer-gradient bg-200% max-sm:hidden"
      ></div>
    </div>

    <div class="my-4 flex h-1/6">
      <div
        class="h-full w-full animate-shimmer rounded-md bg-shimmer-gradient bg-200%"
      ></div>
      <div
        class="h-full w-full animate-shimmer rounded-md bg-shimmer-gradient bg-200% max-md:hidden"
      ></div>
      <div
        class="h-full w-full animate-shimmer rounded-md bg-shimmer-gradient bg-200% max-lg:hidden"
      ></div>
      <div
        class="h-full w-full animate-shimmer rounded-md bg-shimmer-gradient bg-200% max-sm:hidden"
      ></div>
    </div>
  </div>
</template>
