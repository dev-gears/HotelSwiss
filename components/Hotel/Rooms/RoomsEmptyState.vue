<template>
  <div class="flex flex-col items-center justify-center py-12 text-center">
    <div
      class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800"
    >
      <i class="pi pi-home text-2xl text-gray-400" />
    </div>
    <h3
      class="mb-2 font-robotoRegular text-lg font-medium text-gray-600 dark:text-gray-400"
    >
      {{ $t("Rooms.noRooms") }}
    </h3>
    <p class="font-robotoRegular text-sm text-gray-500 dark:text-gray-500">
      {{ $t("Rooms.noRoomsDescription") }}
    </p>
  </div>
</template>

<script setup lang="ts">
// Empty state component for when no rooms are available
</script>
