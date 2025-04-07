<template>
  <div class="container px-3">
    <div
      class="border-b border-primary-100/40 bg-light-100 pb-8 pt-3 dark:border-light/10 dark:bg-dark-100"
    >
      <div class="flex flex-col flex-wrap gap-3">
        <h2 class="font-robotoRegular text-xl text-primary-200">
          {{ $t("Rooms.title") }}:
        </h2>
        <div class="flex items-center gap-3 px-3 max-md:justify-center">
          <div
            v-for="room in rooms"
            class="rounded-xl border border-primary-100/30 bg-light p-3 text-dark transition-colors hover:border-primary-200 dark:border-light/10 dark:bg-dark-200 dark:text-light dark:hover:border-primary-200"
          >
            {{ room.value.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Room } from "@/types/hotel";
defineProps({
  rooms: Array<Room>,
});
</script>

<style scoped></style>
