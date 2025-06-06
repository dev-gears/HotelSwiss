<template>
  <div class="container px-3">
    <div
      class="rounded-2xl bg-light p-6 shadow-md dark:bg-dark-100 dark:text-light"
    >
      <!-- Header Section -->
      <div class="mb-6 flex items-center justify-between">
        <div>
          <h2
            class="font-patuaOne text-2xl font-bold text-dark dark:text-light"
          >
            {{ $t("Rooms.title") }}
          </h2>
          <p
            v-if="rooms && rooms.length > 0"
            class="mt-1 font-robotoRegular text-sm text-gray-600 dark:text-gray-400"
          >
            {{
              $t("Rooms.subtitle", {
                count: rooms.length,
              })
            }}
          </p>
        </div>
      </div>

      <!-- Rooms Content -->
      <div v-if="rooms && rooms.length > 0">
        <!-- Grid View -->
        <div
          v-if="isGridView"
          class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          <RoomGridItem
            v-for="room in visibleRooms"
            :key="room.id"
            :room="room"
            @select-room="selectRoom"
            @open-gallery="openRoomGallery"
          />
        </div>

        <!-- List View -->
        <div v-else class="space-y-4">
          <RoomListItem
            v-for="room in visibleRooms"
            :key="room.id"
            :room="room"
            @select-room="selectRoom"
            @open-gallery="openRoomGallery"
          />
        </div>

        <!-- Load More Button -->
        <div v-if="shouldShowLoadMore" class="mt-6 text-center">
          <Button
            @click="loadMoreRooms"
            :label="$t('Common.loadMore')"
            variant="secondary"
            icon="pi pi-plus"
            class="mx-auto"
          />
        </div>
      </div>
      <!-- Empty State -->
      <RoomsEmptyState v-else />

      <!-- Room Detail Modal -->
      <RoomDetailModal
        v-model:visible="showRoomModal"
        :room="selectedRoom"
        @open-gallery="openRoomGallery"
        @proceed-to-contact="proceedToContact"
      />

      <!-- Room Images Gallery -->
      <HotelHeroGallery
        v-model:visible="showRoomGallery"
        :images="roomGalleryImages"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { Room, Image } from "@/types/hotel";
import Button from "primevue/button";
import { useHotelImage } from "#imports";
import HotelHeroGallery from "@/components/Hotel/Hero/Gallery.vue";
import useDeviceType from "@/composables/useDeviceType";
import RoomGridItem from "@/components/Hotel/Rooms/RoomGridItem.vue";
import RoomListItem from "@/components/Hotel/Rooms/RoomListItem.vue";
import RoomDetailModal from "@/components/Hotel/Rooms/RoomDetailModal.vue";
import RoomsEmptyState from "@/components/Hotel/Rooms/RoomsEmptyState.vue";

interface Props {
  rooms: Room[];
}

const props = withDefaults(defineProps<Props>(), {
  rooms: () => [],
});

const { getImageUrl } = useHotelImage();
const { deviceType } = useDeviceType();

// Show list view on desktop (laptop+), grid view on mobile/tablet
const isGridView = computed(() => {
  return deviceType.value === "mobile" || deviceType.value === "tablet";
});

// State management
const showRoomModal = ref(false);
const showRoomGallery = ref(false);
const selectedRoom = ref<Room | null>(null);
const visibleCount = ref(6);

// Computed properties
const visibleRooms = computed(() => {
  return props.rooms.slice(0, visibleCount.value);
});

const shouldShowLoadMore = computed(() => {
  return props.rooms.length > visibleCount.value;
});

// Room gallery images for the selected room
const roomGalleryImages = computed((): Image[] => {
  if (!selectedRoom.value?.images) return [];

  return selectedRoom.value.images.map((image: Image) => ({
    id: image.id || Math.random(),
    title: image.title || selectedRoom.value!.name,
    url: getImageUrl(image.url),
    width: image.width || 800,
    height: image.height || 600,
    renditions: {
      thumbnail: image.renditions?.thumbnail
        ? getImageUrl(image.renditions.thumbnail)
        : getImageUrl(image.url),
      medium: image.renditions?.medium
        ? getImageUrl(image.renditions.medium)
        : getImageUrl(image.url),
      large: image.renditions?.large
        ? getImageUrl(image.renditions.large)
        : getImageUrl(image.url),
    },
  }));
});

// Event handlers
const selectRoom = (room: Room) => {
  selectedRoom.value = room;
  showRoomModal.value = true;
};

const openRoomGallery = (room: Room) => {
  selectedRoom.value = room;
  showRoomGallery.value = true;
};

const loadMoreRooms = () => {
  visibleCount.value = Math.min(visibleCount.value + 6, props.rooms.length);
};

const proceedToContact = () => {
  showRoomModal.value = false;

  const contactForm = document.querySelector("[data-contact-form]");
  if (contactForm) {
    contactForm.scrollIntoView({ behavior: "smooth" });
  }
};
</script>
