<template>
  <div class="container px-3">
    <div class="border-b border-primary-100/40 bg-light-100 pb-8 pt-3">
      <div class="flex flex-col flex-wrap gap-3">
        <h2 class="font-robotoRegular text-xl text-primary-200">
          {{ $t("Rooms.title") }}:
        </h2>
        <div class="flex items-center px-3 max-md:justify-center">
          <div
            v-for="room in rooms"
            class="rounded-xl border border-primary-100 p-3"
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
