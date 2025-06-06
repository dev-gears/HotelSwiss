<template>
  <div
    class="group relative overflow-hidden rounded-xl border border-gray-200 bg-light transition-all duration-300 dark:border-gray-700 dark:bg-dark-200"
  >
    <!-- Room Image Section -->
    <div class="relative h-48 overflow-hidden">
      <div
        v-if="room.images && room.images.length > 0"
        class="relative h-full w-full cursor-pointer"
        @click="$emit('openGallery', room)"
      >
        <Image
          v-ripple
          :src="getImageUrl(room.images[0]?.url)"
          :alt="room.name"
          class="h-full w-full object-cover transition-all duration-300"
          :pt="{
            root: 'h-full w-full',
            image: 'h-full w-full object-cover',
          }"
        />
        <!-- Image Count Badge -->
        <div
          v-if="room.images.length > 1"
          class="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm"
        >
          <i class="pi pi-images text-xs"></i>
          {{ room.images.length }}
        </div>
        <!-- Gallery Overlay -->
        <div class="absolute inset-0 bg-black/0 transition-all duration-300">
          <div
            class="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300"
          >
            <Button
              v-ripple
              icon="pi pi-eye"
              :label="$t('Rooms.viewGallery')"
              class="bg-white/90 text-dark"
              size="small"
            />
          </div>
        </div>
      </div>
      <!-- Fallback for rooms without images -->
      <div
        v-else
        class="relative h-full bg-gradient-to-br from-primary/10 to-primary-200/20 dark:from-primary-200/10 dark:to-primary/20"
      >
        <div
          class="absolute inset-0 flex items-center justify-center text-primary-200/50 dark:text-primary-200/70"
        >
          <i class="pi pi-home text-4xl" />
        </div>
      </div>
      <!-- Occupancy Badge -->
      <div
        class="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-sm font-medium text-light shadow-lg"
      >
        <i class="pi pi-users mr-1" />
        {{ room.max_occupants }}
        {{ room.max_occupants === 1 ? $t("Rooms.guest") : $t("Rooms.guests") }}
      </div>
    </div>

    <!-- Room Content -->
    <div class="p-4">
      <div class="mb-3 flex items-start justify-between">
        <h3
          class="font-robotoRegular text-lg font-semibold text-dark transition-colors dark:text-light"
        >
          {{ room.name }}
        </h3>
        <Button
          v-ripple
          @click="$emit('selectRoom', room)"
          icon="pi pi-info-circle"
          class="ml-2 h-8 w-8 !bg-primary/10 !px-2 !py-4 text-primary dark:!bg-primary dark:text-light"
          :aria-label="$t('Rooms.viewDetails')"
        />
      </div>

      <!-- Quick Info -->
      <div class="mb-4">
        <div
          class="mb-2 flex items-center text-sm text-gray-600 dark:text-gray-400"
        >
          <i class="pi pi-users mr-2" />
          <span>
            {{ $t("Rooms.accommodates") }}
            {{ room.max_occupants }}
            {{
              room.max_occupants === 1 ? $t("Rooms.guest") : $t("Rooms.guests")
            }}
          </span>
        </div>

        <!-- Amenities Preview -->
        <div v-if="room.amenities.length > 0" class="mt-3">
          <div
            class="mb-2 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            <i class="pi pi-star mr-2 text-primary" />
            {{ $t("Rooms.amenities") }}
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <div
              v-for="amenity in resolveAmenities(room.amenities).slice(0, 3)"
              :key="amenity.id"
              class="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1 dark:bg-primary-200/10"
            >
              <img
                v-if="amenity.image?.url"
                :src="getImageUrl(amenity.image.url)"
                :alt="amenity.name"
                class="h-4 w-4 invert dark:invert-0"
              />
              <span class="text-sm text-primary dark:text-light">
                {{ amenity.name }}
              </span>
            </div>
            <button
              v-if="room.amenities.length > 3"
              @click="$emit('selectRoom', room)"
              class="text-xs text-primary dark:!text-light"
            >
              +{{ room.amenities.length - 3 }} more
            </button>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-2">
        <Button
          v-ripple
          @click="$emit('selectRoom', room)"
          :label="$t('Rooms.viewDetails')"
          icon="pi pi-eye"
          class="flex-1 bg-primary text-white"
          size="small"
        />
        <Button
          v-ripple
          v-if="room.images && room.images.length > 0"
          @click="$emit('openGallery', room)"
          icon="pi pi-images"
          class="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          size="small"
          :aria-label="$t('Rooms.viewGallery')"
        />
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
