<template>
  <CommonHead
    :title="hotel?.title ?? 'Default Hotel Title'"
    :description="`Every info you need if staying at ${hotel?.title}`"
    :imageUrl="hotel?.images[0]?.url ?? 'default-image-url.jpg'"
    :url="`https://hotelswiss.ch/hotel/${hotel?.id}`"
  />

  <HotelSkeletonLoader v-if="pending" />
  <div v-else class="flex flex-col bg-light-100 max-sm:pb-32">
    <div class="flex flex-col md:gap-5">
      <HotelHero
        :images="hotel?.images"
        :hotelId="hotel?.id"
        :hotelTitle="hotel?.title"
      />
      <h1 class="container mx-auto hidden font-patuaOne text-2xl md:block">
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
            class="sticky top-3 rounded-2xl bg-light p-8 shadow-filters max-md:hidden"
          />
        </div>
      </div>
    </div>
    <HotelContactFooter
      :startPrice="hotel?.start_price"
      :endPrice="hotel?.end_price"
    />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import type { Hotel } from "~/types/hotel";

definePageMeta({
  layout: "single",
});

const route = useRoute();
const pending = ref(true);
const hotel = ref(null) as Ref<Hotel | null>;

try {
  const response = await useHotelApiData(`hotels/${route.params.id}`);
  hotel.value = response.data.value as Hotel;
} catch (error) {
  console.error(error);
} finally {
  pending.value = false;
}
</script>
