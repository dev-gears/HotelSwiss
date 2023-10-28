<template>
  <div class="skeleton-loader container mx-auto h-[40%] p-4">
    <div
      class="bg-shimmer-gradient bg-200% animate-shimmer mb-4 h-1/5 rounded-md"
    ></div>
    <div class="flex h-4/5 items-center justify-center gap-4">
      <div
        class="bg-shimmer-gradient bg-200% animate-shimmer h-full w-full rounded-md"
      ></div>
      <div
        class="bg-shimmer-gradient bg-200% animate-shimmer h-full w-full rounded-md max-sm:hidden"
      ></div>
      <div
        class="bg-shimmer-gradient bg-200% animate-shimmer h-full w-full rounded-md max-sm:hidden"
      ></div>
    </div>
  </div>
</template>
