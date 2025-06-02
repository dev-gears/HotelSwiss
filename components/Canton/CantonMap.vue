<template>
  <div v-if="canton" class="rounded-lg bg-light p-6 shadow-md dark:bg-dark-300">
    <h2 class="mb-6 font-patuaOne text-2xl font-bold text-dark dark:text-light">
      {{ $t("Canton.map.title") }}
    </h2>
    <div
      class="relative h-80 overflow-hidden rounded-lg shadow-md dark:shadow-dark-200/20"
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
        :zoom="cantonZoom"
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
          <LPopup>{{ searchedLocationLabel }}</LPopup>
        </LMarker>
      </LMap>
    </div>

    <!-- Map Info -->
    <div class="mt-4 rounded bg-light-100 p-3 dark:bg-dark-200">
      <p class="font-robotoRegular text-sm text-gray-600 dark:text-gray-400">
        <i class="pi pi-info-circle mr-2" />
        {{ $t("Canton.map.info") }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { Canton } from "@/types/hotel";
import Loader from "@/components/Common/Loader.vue";

const props = defineProps<{
  canton?: Canton;
}>();

type LatLng = [number, number];

// Default location (center of Switzerland) as fallback
const searchedLocation = ref<LatLng>([46.8182, 8.2275]);
const searchedLocationLabel = ref("");
const isLoading = ref(true);

// Compute zoom level based on canton (cantons are larger areas than specific addresses)
const cantonZoom = computed(() => 9); // Slightly zoomed out to show canton area

/**
 * Fetches coordinates from a canton name using the OpenStreetMapProvider from leaflet-geosearch.
 * @param cantonName - The canton name to search for.
 * @returns A promise that resolves to an object containing the latitude, longitude, and label of the location,
 *          or null if no location is found or an error occurs.
 */
const fetchCoordinatesFromCanton = async (
  cantonName: string,
): Promise<{ lat: number; lon: number; label: string } | null> => {
  try {
    const { OpenStreetMapProvider } = await import("leaflet-geosearch");
    const searchProvider = new OpenStreetMapProvider();

    // Search for canton in Switzerland context
    const searchQuery = `${cantonName}, Switzerland`;
    const results = await searchProvider.search({ query: searchQuery });

    if (results.length === 0) {
      // Fallback: try searching just the canton name
      const fallbackResults = await searchProvider.search({
        query: cantonName,
      });
      if (fallbackResults.length === 0) return null;

      const { x: lon, y: lat, label } = fallbackResults[0];
      return { lat, lon, label };
    }

    const { x: lon, y: lat, label } = results[0];
    return { lat, lon, label };
  } catch (err) {
    console.error("Error fetching canton coordinates:", err);
    return null;
  }
};

/**
 * Sets the map search parameters by fetching coordinates for the provided canton
 * and updating the searchedLocation and searchedLocationLabel refs.
 */
const setMapSearchParams = async (): Promise<void> => {
  if (!props.canton?.name) {
    isLoading.value = false;
    return;
  }

  try {
    const location = await fetchCoordinatesFromCanton(props.canton.name);
    if (location) {
      const { lat, lon, label } = location;
      searchedLocation.value = [lat, lon];
      searchedLocationLabel.value = label;
    } else {
      console.log(
        "Canton location not found, using default Switzerland center",
      );
      searchedLocationLabel.value = props.canton.name;
    }
  } catch (err) {
    console.error("Error setting map search parameters:", err);
    searchedLocationLabel.value = props.canton.name;
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
