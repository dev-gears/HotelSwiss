<template>
  <div
    class="fixed bottom-0 z-[1001] w-full border-t-2 border-primary-100/40 bg-light dark:border-light/10 dark:bg-dark-100 sm:static md:mt-3 md:hidden"
  >
    <div class="container mx-auto flex items-center justify-between px-7 py-3">
      <div v-if="startPrice" class="flex flex-col justify-start">
        <p class="font-patuaOne text-xl text-primary-200">
          {{ $t("ContactFooter.from") }}: <span>{{ startPrice }}</span
          >$
        </p>
        <p
          class="font-robotoRegular text-base text-primary-200/50 dark:text-light/50"
        >
          {{ $t("ContactFooter.to") }}: <span>{{ endPrice }}$</span>
        </p>
      </div>
      <div v-else>
        <p class="text-dark dark:text-light">
          {{ $t("ContactFooter.priceNotAvailable") }}
        </p>
      </div>
      <div>
        <Button
          :pt="{
            root: '!rounded-xl !bg-primary dark:!bg-primary-200 !px-4 !py-2 !text-xl !text-light hover:!bg-primary-200 dark:hover:!bg-primary-300',
          }"
          @click="formVisible = true"
          :label="$t('ContactFooter.contactHotel')"
        />
      </div>
    </div>
  </div>
  <FormDialog
    v-model:visible="formVisible"
    :hotelId="hotelId"
    :hotelTitle="hotelTitle"
    :hotelEmail="hotelEmail"
    :rooms="rooms"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { PropType } from "vue";
import FormDialog from "../ContactForm/FormDialog.vue";
import Button from "primevue/button";
import type { Room } from "~/types/hotel";

defineProps({
  startPrice: String,
  endPrice: String,
  hotelTitle: String,
  hotelEmail: String,
  hotelId: [String, Number],
  rooms: {
    type: Array as PropType<Room[]>,
    default: () => [],
  },
});

const formVisible = ref(false);
</script>
