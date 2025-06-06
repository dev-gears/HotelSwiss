<template>
  <Dialog
    :visible="visible"
    :draggable="false"
    :dismissable-mask="true"
    :modal="true"
    class="mx-4"
    :style="{ width: '95vw', maxWidth: '900px' }"
    :header="room?.value?.name || 'Room Details'"
    :pt="{
      root: 'rounded-xl overflow-hidden',
      header: 'bg-primary text-white p-4',
      content: 'p-0',
      footer: 'p-4 bg-gray-50 dark:bg-dark-200',
    }"
    @update:visible="$emit('update:visible', $event)"
  >
    <div v-if="room" class="max-h-[70vh] overflow-y-auto">
      <!-- Room Images Gallery -->
      <div
        v-if="room.value.images && room.value.images.length > 0"
        class="relative"
      >
        <div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
          <div
            v-for="(image, index) in room.value.images.slice(0, 4)"
            :key="index"
            class="group relative cursor-pointer overflow-hidden rounded-lg"
            @click="$emit('openGallery', room)"
          >
            <Image
              :src="getImageUrl(image.url)"
              :alt="`${room.value.name} - Image ${index + 1}`"
              class="h-48 w-full object-cover transition-all duration-300 group-hover:scale-105"
              :pt="{
                root: 'h-48 w-full',
                image: 'h-full w-full object-cover',
              }"
            />
            <div
              class="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/20"
            >
              <div
                class="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100"
              >
                <i class="pi pi-search-plus text-2xl text-white"></i>
              </div>
            </div>
          </div>
        </div>
        <Button
          v-if="room.value.images.length > 4"
          @click="$emit('openGallery', room)"
          :label="`View all ${room.value.images.length} photos`"
          icon="pi pi-images"
          class="mx-4 mb-4 w-full bg-primary text-white"
        />
      </div>

      <!-- Room Details -->
      <div class="p-4">
        <!-- Occupancy Info -->
        <div class="mb-6 rounded-lg bg-primary/5 p-4 dark:bg-primary-200/5">
          <div class="flex items-center gap-3">
            <div class="rounded-full bg-primary p-2">
              <i class="pi pi-users text-white"></i>
            </div>
            <div>
              <h4 class="font-semibold text-dark dark:text-light">
                {{ $t("Rooms.accommodates") }}
              </h4>
              <p class="text-gray-600 dark:text-gray-400">
                {{ room.value.max_occupants }}
                {{
                  room.value.max_occupants === 1
                    ? $t("Rooms.guest")
                    : $t("Rooms.guests")
                }}
              </p>
            </div>
          </div>
        </div>

        <!-- Full Amenities List -->
        <div v-if="room.value.amenities.length > 0" class="mb-6">
          <h4
            class="mb-4 flex items-center gap-2 text-lg font-semibold text-dark dark:text-light"
          >
            <i class="pi pi-star text-primary"></i>
            {{ $t("Rooms.amenities") }}
          </h4>
          <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div
              v-for="amenity in resolveAmenities(room.value.amenities)"
              :key="amenity.id"
              class="flex items-center gap-3 rounded-lg bg-light p-3 dark:bg-dark-200"
            >
              <div class="flex-shrink-0">
                <img
                  v-if="amenity.image?.url"
                  :src="getImageUrl(amenity.image.url)"
                  :alt="amenity.name"
                  class="h-6 w-6 invert dark:invert-0"
                />
                <i v-else class="pi pi-check-circle text-primary"></i>
              </div>
              <div class="flex-1">
                <h5 class="font-medium text-dark dark:!text-light">
                  {{ amenity.name }}
                </h5>
                <p
                  v-if="amenity.description"
                  class="text-sm text-gray-600 dark:text-gray-400"
                >
                  {{ amenity.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end gap-2">
        <Button
          @click="$emit('update:visible', false)"
          :label="$t('Common.close')"
          icon="pi pi-times"
          class="bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        />
        <Button
          @click="$emit('proceedToContact')"
          :label="$t('Rooms.contactHotel')"
          icon="pi pi-envelope"
          class="bg-primary px-4 py-2 text-white hover:bg-primary-200"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import type { Room } from "@/types/hotel";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import { useHotelImage } from "#imports";
import { useAmenityResolver } from "@/composables/useAmenityResolver";

interface Props {
  visible: boolean;
  room: Room | null;
}

interface Emits {
  (e: "update:visible", value: boolean): void;
  (e: "openGallery", room: Room): void;
  (e: "proceedToContact"): void;
}

defineProps<Props>();
defineEmits<Emits>();

const { getImageUrl } = useHotelImage();
const { resolveAmenities } = useAmenityResolver();
</script>
