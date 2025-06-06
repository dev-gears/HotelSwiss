<template>
  <div class="px-3">
    <div class="flex flex-col gap-3">
      <h2 class="font-robotoRegular text-xl text-primary-200 dark:text-light">
        {{ $t("Content.whereYouWillBe") }}
      </h2>
      <div
        class="relative mx-auto h-60 w-full rounded-lg shadow-md dark:shadow-dark-200/20 md:h-80"
      >
        <!-- Loading Overlay -->
        <div
          v-if="isLoading"
          class="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-light-200/80 dark:bg-dark-200/80"
        >
          <div class="text-center">
            <Loader />
            <p
              class="mt-3 font-robotoRegular text-sm text-gray-600 dark:text-gray-400"
            >
              {{ $t("Common.loadingMap") || "Loading map..." }}
            </p>
          </div>
        </div>

        <LMap
          ref="map"
          :zoom="10"
          :center="searchedLocation"
          :use-global-leaflet="false"
          @ready="onMapReady"
          class="h-full w-full rounded-lg"
        >
          <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
          />
          <LMarker
            v-if="searchedLocation"
            :lat-lng="searchedLocation"
            :draggable="false"
          >
            <LIcon iconUrl="/map-pin.svg" :iconSize="[32, 37]"></LIcon>
            <LPopup> {{ searchedLocationLabel }}</LPopup>
          </LMarker>
        </LMap>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Loader from "@/components/Common/Loader.vue";

const props = defineProps<{
  address: string;
}>();

type LatLng = [number, number];

const searchedLocation = ref<LatLng>([47.21322, -1.559482]);
const searchedLocationLabel = ref("");
const isLoading = ref(true);

/**
 * Fetches coordinates from a given address using the OpenStreetMapProvider from leaflet-geosearch.
 * @param address - The address to search for.
 * @returns A promise that resolves to an object containing the latitude, longitude, and label of the location,
 *          or null if no location is found or an error occurs.
 */
const fetchCoordinatesFromAddress = async (
  address: string,
): Promise<{ lat: number; lon: number; label: string } | null> => {
  try {
    const { OpenStreetMapProvider } = await import("leaflet-geosearch");
    const searchProvider = new OpenStreetMapProvider();
    const results = await searchProvider.search({ query: address });
    if (results.length === 0) return null;
    const { x: lon, y: lat, label } = results[0];
    return { lat, lon, label };
  } catch (err) {
    console.error(err);
    return null;
  }
};

/**
 * Sets the map search parameters by fetching coordinates for the provided address
 * and updating the searchedLocation and searchedLocationLabel refs.
 */
const setMapSearchParams = async (): Promise<void> => {
  try {
    const location = await fetchCoordinatesFromAddress(props.address);
    if (location) {
      const { lat, lon, label } = location;
      searchedLocation.value = [lat, lon];
      searchedLocationLabel.value = label;
    } else {
      console.log("Location not found.");
    }
  } catch (err) {
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

/**
 * Called when the map is ready. Sets the map search parameters if the code is running in a client environment.
 * This is necessary because the OpenStreetMapProvider from leaflet-geosearch requires the window object,
 * which is only available in the client environment.
 */
const onMapReady = () => {
  if (import.meta.client) {
    setMapSearchParams();
  }
};
</script>
