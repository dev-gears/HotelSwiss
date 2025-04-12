<template>
  <div class="container mx-auto px-3 py-6">
    <div
      class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <div
        v-for="i in 8"
        :key="i"
        class="mx-auto min-h-[400px] w-full max-w-[400px] rounded-xl bg-light p-4 dark:bg-dark-300"
      >
        <div class="flex flex-col gap-4">
          <Skeleton
            class="!h-[228px] !w-full rounded-xl"
            style="aspect-ratio: 16/9"
          />
          <div class="flex flex-col gap-2">
            <Skeleton width="70%" height="2rem" />
            <Skeleton width="100%" height="4rem" />
            <div class="flex gap-2">
              <Skeleton width="30%" height="2rem" />
              <Skeleton width="30%" height="2rem" />
              <Skeleton width="30%" height="2rem" />
            </div>
            <div class="flex items-center justify-between">
              <Skeleton width="30%" height="2rem" />
              <Skeleton width="40%" height="2.5rem" borderRadius="0.75rem" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
