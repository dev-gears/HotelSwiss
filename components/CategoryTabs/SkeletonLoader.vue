<template>
  <div class="skeleton-loader container mx-auto h-96 p-4 md:h-[500px]">
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
  </div>
</template>
