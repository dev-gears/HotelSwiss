<template>
  <div
    class="group rounded-xl border border-gray-200 bg-light p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-md dark:border-gray-700 dark:bg-dark-200 dark:hover:border-primary-200/30"
  >
    <div class="flex gap-4">
      <!-- Room Image Thumbnail -->
      <div class="flex-shrink-0">
        <div
          v-if="room.value.images && room.value.images.length > 0"
          class="relative h-20 w-20 cursor-pointer overflow-hidden rounded-lg"
          @click="$emit('openGallery', room)"
        >
          <Image
            :src="getImageUrl(room.value.images[0]?.url)"
            :alt="room.value.name"
            class="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
            :pt="{
              root: 'h-full w-full',
              image: 'h-full w-full object-cover',
            }"
          />
          <div
            v-if="room.value.images.length > 1"
            class="absolute bottom-1 right-1 rounded bg-black/60 px-1 text-xs text-white"
          >
            {{ room.value.images.length }}
          </div>
        </div>
        <div
          v-else
          class="flex h-20 w-20 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary-200/10"
        >
          <i class="pi pi-home text-xl text-primary dark:text-primary-200" />
        </div>
      </div>

      <!-- Room Content -->
      <div class="flex flex-1 items-center justify-between">
        <div class="flex-1">
          <h3
            class="font-robotoRegular text-lg font-semibold text-dark transition-colors group-hover:text-primary dark:text-light dark:group-hover:text-primary-200"
          >
            {{ room.value.name }}
          </h3>
          <div
            class="mt-1 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400"
          >
            <span class="flex items-center gap-1">
              <i class="pi pi-users" />
              {{ room.value.max_occupants }}
              {{
                room.value.max_occupants === 1
                  ? $t("Rooms.guest")
                  : $t("Rooms.guests")
              }}
            </span>
            <span
              v-if="room.value.amenities.length > 0"
              class="flex items-center gap-1"
            >
              <i class="pi pi-star text-primary" />
              {{
                resolveAmenities(room.value.amenities)
                  .slice(0, 2)
                  .map((a: any) => a?.name)
                  .filter(Boolean)
                  .join(", ")
              }}
              <span
                v-if="room.value.amenities.length > 2"
                class="text-gray-500"
              >
                +{{ room.value.amenities.length - 2 }} more
              </span>
            </span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-2">
          <Button
            @click="$emit('selectRoom', room)"
            :label="$t('Rooms.viewDetails')"
            icon="pi pi-eye"
            class="bg-primary px-4 py-2 text-white hover:bg-primary-200"
          />
          <Button
            v-if="room.value.images && room.value.images.length > 0"
            @click="$emit('openGallery', room)"
            icon="pi pi-images"
            class="bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            size="small"
            :aria-label="$t('Rooms.viewGallery')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Room } from "@/types/hotel";
import Button from "primevue/button";
import { useHotelImage } from "#imports";
import { useAmenityResolver } from "@/composables/useAmenityResolver";

interface Props {
  room: Room;
}

interface Emits {
  (e: "selectRoom", room: Room): void;
  (e: "openGallery", room: Room): void;
}

defineProps<Props>();
defineEmits<Emits>();

const { getImageUrl } = useHotelImage();
const { resolveAmenities } = useAmenityResolver();
</script>
