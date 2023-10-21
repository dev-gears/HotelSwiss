<template>
  <div class="relative w-full">
    <Image
      preview
      :src="imageSource"
      class="hero-image h-96 w-full lg:h-[500px]"
    />
    <ClientOnly>
      <ThumbnailSlider
        :images="images"
        :currentImageUrl="imageSource"
        :updateImageSource="updateImageSource"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import ThumbnailSlider from "./ThumbnailSlider.vue";

defineProps({
  imageUrl: {
    type: String,
  },
  title: {
    type: String,
  },
});

const images = [
  {
    itemImageSrc:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/ed/95/07/limak-eurasia-luxury.jpg?w=700&h=-1&s=1",
    alt: "Description for image 1",
    thumbnailImageSrc:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/ed/95/07/limak-eurasia-luxury.jpg?w=700&h=-1&s=1",
  },
  {
    itemImageSrc:
      "https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg",
    alt: "Description for image 2",
    thumbnailImageSrc:
      "https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg",
  },
  {
    itemImageSrc:
      "https://static.leonardo-hotels.com/image/leonardohotelbucharestcitycenter_room_comfortdouble2_2022_4000x2600_7e18f254bc75491965d36cc312e8111f_1200x780_mobile_3.jpeg",
    alt: "Description for image 3",
    thumbnailImageSrc:
      "https://static.leonardo-hotels.com/image/leonardohotelbucharestcitycenter_room_comfortdouble2_2022_4000x2600_7e18f254bc75491965d36cc312e8111f_1200x780_mobile_3.jpeg",
  },
  {
    itemImageSrc:
      "https://image-tc.galaxy.tf/wijpeg-6rc902e9t312jljywldrat8xl/york-pool-dusk-ok.jpg",
    alt: "Description for image 4",
    thumbnailImageSrc:
      "https://image-tc.galaxy.tf/wijpeg-6rc902e9t312jljywldrat8xl/york-pool-dusk-ok.jpg",
  },
];

const imageSource = ref(images[0].itemImageSrc);

const updateImageSource = (image: string) => {
  imageSource.value = image;
};
</script>

<style>
.hero-image {
  img {
    @apply h-96 w-full rounded-b-3xl object-cover shadow-md shadow-primary-500 lg:h-full lg:rounded-b-xl;
  }
}
.p-image-toolbar svg {
  @apply !text-secondary-600;
}
</style>
