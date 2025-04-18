<template>
  <CommonHead
    :title="hotel?.title ?? 'Default Hotel Title'"
    :description="`Every info you need if staying at ${hotel?.title}`"
    :imageUrl="hotel?.images[0]?.url ?? 'default-image-url.jpg'"
    :url="`https://hotelswiss.ch/hotel/${hotel?.id}`"
  />

  <HotelSkeletonLoader v-if="pending" />
  <div v-else class="flex flex-col bg-light-100 dark:bg-dark-100 max-sm:pb-32">
    <div class="flex flex-col md:gap-5">
      <HotelHero
        :images="hotel?.images"
        :hotelId="hotel?.id"
        :hotelTitle="hotel?.title"
        @openImageModal="openImageModal"
      />
      <h1
        class="container mx-auto hidden font-patuaOne text-2xl text-dark dark:text-light md:block"
      >
        {{ hotel?.title }}
      </h1>
      <div class="container mx-auto mb-6 grid-cols-[2fr,1fr] gap-6 md:grid">
        <div>
          <HotelContent v-if="hotel" :hotel="hotel" />
          <HotelAmenities
            v-if="hotel?.amenities?.length"
            :amenities="hotel?.amenities"
            class="pt-3"
          />
          <HotelSocialNetworks
            v-if="hotel?.social_links"
            :socialLinks="hotel?.social_links"
            class="pt-3"
          />
          <HotelRooms
            v-if="hotel?.rooms?.length"
            :rooms="hotel?.rooms"
            class="pt-3"
          />
          <Map
            :address="`${hotel?.address}, ${hotel?.zip} ${hotel?.city}`"
            class="pt-3"
          />
        </div>
        <div>
          <ContactForm
            class="sticky top-3 rounded-2xl bg-light p-8 shadow-filters dark:bg-dark-200 dark:shadow-dark-200/20 max-md:hidden"
          />
        </div>
      </div>
    </div>
    <HotelContactFooter
      :startPrice="hotel?.start_price"
      :endPrice="hotel?.end_price"
    />
  </div>
  <GalleryDrawer
    :visible="showImageModal"
    :images="hotel?.images ?? null"
    @update:visible="showImageModal = $event"
  />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useHotelStore } from "@/store/hotelStore";
import type { Hotel } from "@/types/hotel";
import GalleryDrawer from "@/components/Hotel/Hero/Gallery.vue";
import { useHotelData } from "~/utils/api";

definePageMeta({
  layout: "single",
});

const route = useRoute();
const hotelStore = useHotelStore();
const showImageModal = ref(false);

// Use the type-safe composable for reactive data fetching
const { data: hotel, pending } = useHotelData(
  Array.isArray(route.params.id) ? route.params.id[0] : route.params.id,
);

// Watch for hotel data changes to update the store
watch(
  hotel,
  (newHotel) => {
    if (newHotel) {
      hotelStore.setHotel(newHotel);
      hotelStore.setImages(newHotel.images);
    }
  },
  { immediate: true },
);

const openImageModal = () => {
  showImageModal.value = true;
};
</script>
