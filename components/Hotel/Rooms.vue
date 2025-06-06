<template>
  <div class="container px-3">
    <div
      class="rounded-2xl bg-light p-6 shadow-md dark:bg-dark-100 dark:text-light"
    >
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
        <div
          v-if="rooms && rooms.length > 0"
          class="hidden items-center gap-2 md:flex"
        >
          <Button
            @click="toggleView"
            :icon="isGridView ? 'pi pi-list' : 'pi pi-th-large'"
            variant="secondary"
            size="small"
            :label="isGridView ? $t('Rooms.listView') : $t('Rooms.gridView')"
            class="bg-primary px-4 py-2 text-sm"
          />
        </div>
      </div>

      <div v-if="rooms && rooms.length > 0">
        <div
          v-if="isGridView"
          class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          <div
            v-for="room in visibleRooms"
            :key="room.id"
            class="group relative overflow-hidden rounded-xl border border-gray-200 bg-light transition-all duration-300 hover:border-primary/30 hover:shadow-lg dark:border-gray-700 dark:bg-dark-200 dark:hover:border-primary-200/30"
          >
            <div
              class="relative h-48 bg-gradient-to-br from-primary/10 to-primary-200/20 dark:from-primary-200/10 dark:to-primary/20"
            >
              <div
                class="absolute inset-0 flex items-center justify-center text-primary-200/50 dark:text-primary-200/70"
              >
                <i class="pi pi-home text-4xl" />
              </div>

              <div
                class="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-sm font-medium text-light"
              >
                <i class="pi pi-users mr-1" />
                {{ room.value.max_occupants }}
                {{
                  room.value.max_occupants === 1
                    ? $t("Rooms.guest")
                    : $t("Rooms.guests")
                }}
              </div>
            </div>

            <div class="p-4">
              <h3
                class="mb-2 font-robotoRegular text-lg font-semibold text-dark transition-colors group-hover:text-primary dark:text-light dark:group-hover:text-primary-200"
              >
                {{ room.value.name }}
              </h3>

              <div class="mb-4">
                <div
                  class="mb-2 flex items-center text-sm text-gray-600 dark:text-gray-400"
                >
                  <i class="pi pi-users mr-2" />
                  <span>
                    {{ $t("Rooms.accommodates") }}
                    {{ room.value.max_occupants }}
                    {{
                      room.value.max_occupants === 1
                        ? $t("Rooms.guest")
                        : $t("Rooms.guests")
                    }}
                  </span>
                </div>

                <div v-if="room.value.amenities.length > 0" class="mt-3">
                  <div
                    class="mb-2 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    <i class="pi pi-star mr-2 text-primary" />
                    {{ $t("Rooms.amenities") }}
                  </div>
                  <div class="flex flex-wrap items-center gap-2">
                    <div
                      v-for="amenity in resolveAmenities(
                        room.value.amenities,
                      ).slice(0, 3)"
                      :key="amenity.id"
                      class="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1 dark:bg-primary-200/10"
                    >
                      <img
                        v-if="amenity.image?.url"
                        :src="getImageUrl(amenity.image.url)"
                        :alt="amenity.name"
                        class="h-4 w-4 invert dark:invert-0"
                      />
                      <span class="text-sm text-primary dark:text-primary-200">
                        {{ amenity.name }}
                      </span>
                    </div>
                    <span
                      v-if="room.value.amenities.length > 3"
                      class="text-xs text-gray-500 dark:text-gray-400"
                    >
                      +{{ room.value.amenities.length - 3 }} more
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="room in visibleRooms"
            :key="room.id"
            class="group rounded-xl border border-gray-200 bg-light p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-md dark:border-gray-700 dark:bg-dark-200 dark:hover:border-primary-200/30"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div
                  class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary-200/10"
                >
                  <i class="pi pi-home text-primary dark:text-primary-200" />
                </div>

                <div>
                  <h3
                    class="font-robotoRegular text-lg font-semibold text-dark transition-colors group-hover:text-primary dark:text-light dark:group-hover:text-primary-200"
                  >
                    {{ room.value.name }}
                  </h3>
                  <div
                    class="mt-1 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400"
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
                          .map((a: any) => a?.name)
                          .filter(Boolean)
                          .join(", ")
                      }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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

      <div
        v-else
        class="flex flex-col items-center justify-center py-12 text-center"
      >
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { Room } from "@/types/hotel";
import Button from "primevue/button";
import { useHotelImage } from "#imports";
import { useAmenityResolver } from "@/composables/useAmenityResolver";

interface Props {
  rooms: Room[];
}

const props = withDefaults(defineProps<Props>(), {
  rooms: () => [],
});

const { getImageUrl } = useHotelImage();
const { resolveAmenities } = useAmenityResolver();

const isGridView = ref(true);
const showRoomModal = ref(false);
const selectedRoom = ref<Room | null>(null);
const visibleCount = ref(6);

const visibleRooms = computed(() => {
  return props.rooms.slice(0, visibleCount.value);
});

const shouldShowLoadMore = computed(() => {
  return props.rooms.length > visibleCount.value;
});

const toggleView = () => {
  isGridView.value = !isGridView.value;
};

const selectRoom = (room: Room) => {
  selectedRoom.value = room;
  showRoomModal.value = true;
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
