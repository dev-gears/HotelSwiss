<template>
  <CommonHead
    :title="hotel?.title ?? 'Default Hotel Title'"
    :description="`Discover ${hotel?.title} in Switzerland. View photos, amenities, and location information for your perfect stay.`"
    :imageUrl="hotel?.images[0]?.url ?? 'default-image-url.jpg'"
    :url="`/hotel/${hotel?.id}`"
    :keywords="`${hotel?.title}, Switzerland hotel, luxury accommodation, ${hotel?.city || ''} hotel`"
    :structuredDataType="'hotel'"
    :structuredDataProps="{
      name: hotel?.title,
      address: {
        '@type': 'PostalAddress',
        streetAddress: hotel?.address,
        addressLocality: hotel?.city,
        addressRegion: hotel?.canton?.name,
        addressCountry: 'Switzerland',
      },
      priceRange: getPriceRangeSymbol(
        hotel?.start_price ? parseInt(hotel?.start_price) : undefined,
      ),
      starRating: hotel?.stars,
      telephone: hotel?.telephone,
    }"
  />

  <HotelSkeleton v-if="pending" />
  <div v-else class="flex flex-col bg-light-100 dark:bg-primary max-sm:pb-32">
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
          <ClientOnly>
            <Map
              :address="`${hotel?.address}, ${hotel?.zip} ${hotel?.city}`"
              class="pt-3"
            />
            <template #fallback>
              <div class="px-3 pt-3">
                <div class="flex flex-col gap-3">
                  <h2
                    class="font-robotoRegular text-xl text-primary-200 dark:text-light"
                  >
                    {{ $t("Content.whereYouWillBe") }}
                  </h2>
                  <div
                    class="mx-auto flex h-60 w-full items-center justify-center rounded-lg bg-gray-100 dark:bg-dark-200 md:h-80"
                  >
                    <div class="text-gray-500 dark:text-gray-400">
                      {{ $t("Common.loading") || "Loading map..." }}
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </ClientOnly>
        </div>
        <div>
          <ContactForm
            class="sticky top-3 rounded-2xl bg-light p-8 shadow-filters dark:bg-dark-200 dark:shadow-dark-200/20 max-md:hidden"
            :hotelId="hotel?.id"
            :hotelTitle="hotel?.title"
            :hotelEmail="hotel?.email"
            :rooms="hotel?.rooms"
          />
        </div>
      </div>
    </div>
    <HotelContactFooter
      :startPrice="hotel?.start_price"
      :endPrice="hotel?.end_price"
      :hotelTitle="hotel?.title"
      :hotelEmail="hotel?.email"
      :hotelId="hotel?.id"
      :rooms="hotel?.rooms"
    />
  </div>
  <GalleryDrawer
    :visible="showImageModal"
    :images="hotel?.images ?? null"
    @update:visible="showImageModal = $event"
    class="transition-colors"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import GalleryDrawer from "@/components/Hotel/Hero/Gallery.vue";
import { useHotel } from "~/composables/useApi";
import HotelSkeleton from "~/components/SkeletonLoaders/HotelSkeleton.vue";

definePageMeta({
  layout: "single",
});

const route = useRoute();
const showImageModal = ref(false);
const { data: hotel, pending } = await useHotel(
  Array.isArray(route.params.id) ? route.params.id[0] : route.params.id,
);

const openImageModal = () => {
  showImageModal.value = true;
};

// Function to convert price to price range symbols for structured data
const getPriceRangeSymbol = (price?: number) => {
  if (!price) return "$$";

  if (price < 100) return "$";
  if (price < 300) return "$$";
  if (price < 600) return "$$$";
  return "$$$$";
};
</script>
