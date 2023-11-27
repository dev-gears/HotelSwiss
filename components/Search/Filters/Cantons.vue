<template>
  <div class="flex flex-wrap">
    <div v-for="canton in cantons" class="h-16 w-1/4 p-1 text-center text-xs">
      <div
        :style="{ 'background-image': `url(${canton.image})` }"
        class="flex h-full w-full items-center justify-center border border-primary"
      >
        {{ canton.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const cantons = [
  {
    id: 1,
    name: "Valais",
    image:
      "<https://static.vecteezy.com/system/resources/previews/026/266/804/non_2x/switzerland-map-swiss-map-3d-color-map-vector.jpg>",
  },
  {
    id: 2,
    name: "Vaud",
    image:
      "https://static.vecteezy.com/system/resources/previews/026/266/804/non_2x/switzerland-map-swiss-map-3d-color-map-vector.jpg",
  },
  {
    id: 3,
    name: "Geneva",
    image:
      "https://static.vecteezy.com/system/resources/previews/026/266/804/non_2x/switzerland-map-swiss-map-3d-color-map-vector.jpg",
  },
  {
    id: 4,
    name: "Bern",
    image:
      "https://static.vecteezy.com/system/resources/previews/026/266/804/non_2x/switzerland-map-swiss-map-3d-color-map-vector.jpg",
  },
  {
    id: 5,
    name: "Zurich",
    image:
      "https://static.vecteezy.com/system/resources/previews/026/266/804/non_2x/switzerland-map-swiss-map-3d-color-map-vector.jpg",
  },
  {
    id: 6,
    name: "Graubünden",
    image:
      "https://static.vecteezy.com/system/resources/previews/026/266/804/non_2x/switzerland-map-swiss-map-3d-color-map-vector.jpg",
  },
  {
    id: 7,
    name: "Ticino",
    image:
      "https://static.vecteezy.com/system/resources/previews/026/266/804/non_2x/switzerland-map-swiss-map-3d-color-map-vector.jpg",
  },
  {
    id: 8,
    name: "Lucerne",
    image:
      "https://static.vecteezy.com/system/resources/previews/026/266/804/non_2x/switzerland-map-swiss-map-3d-color-map-vector.jpg",
  },
  {
    id: 9,
    name: "Basel-Stadt",
    image:
      "https://static.vecteezy.com/system/resources/previews/026/266/804/non_2x/switzerland-map-swiss-map-3d-color-map-vector.jpg",
  },
  {
    id: 10,
    name: "Aargau",
    image:
      "https://static.vecteezy.com/system/resources/previews/026/266/804/non_2x/switzerland-map-swiss-map-3d-color-map-vector.jpg",
  },
  {
    id: 11,
    name: "St. Gallen",
    image:
      "https://static.vecteezy.com/system/resources/previews/026/266/804/non_2x/switzerland-map-swiss-map-3d-color-map-vector.jpg",
  },
  {
    id: 12,
    name: "Thurgau",
    image:
      "https://static.vecteezy.com/system/resources/previews/026/266/804/non_2x/switzerland-map-swiss-map-3d-color-map-vector.jpg",
  },
  {
    id: 13,
    name: "Grisons",
    image:
      "https://static.vecteezy.com/system/resources/previews/026/266/804/non_2x/switzerland-map-swiss-map-3d-color-map-vector.jpg",
  },
  {
    id: 14,
    name: "Neuchâtel",
    image:
      "https://static.vecteezy.com/system/resources/previews/026/266/804/non_2x/switzerland-map-swiss-map-3d-color-map-vector.jpg",
  },
  {
    id: 15,
    name: "Schwyz",
    image:
      "https://static.vecteezy.com/system/resources/previews/026/266/804/non_2x/switzerland-map-swiss-map-3d-color-map-vector.jpg",
  },
  {
    id: 16,
    name: "Solothurn",
    image:
      "https://static.vecteezy.com/system/resources/previews/026/266/804/non_2x/switzerland-map-swiss-map-3d-color-map-vector.jpg",
  },
  {
    id: 17,
    name: "Zug",
    image:
      "https://static.vecteezy.com/system/resources/previews/026/266/804/non_2x/switzerland-map-swiss-map-3d-color-map-vector.jpg",
  },
  {
    id: 18,
    name: "Fribourg",
    image:
      "https://static.vecteezy.com/system/resources/previews/026/266/804/non_2x/switzerland-map-swiss-map-3d-color-map-vector.jpg",
  },
  {
    id: 19,
    name: "Appenzell Ausserrhoden",
    image:
      "https://static.vecteezy.com/system/resources/previews/026/266/804/non_2x/switzerland-map-swiss-map-3d-color-map-vector.jpg",
  },
];
</script>
