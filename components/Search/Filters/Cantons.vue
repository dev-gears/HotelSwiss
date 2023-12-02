<template>
  <div class="py-6">
    <h3 class="font-robotoRegular text-xl text-primary-200">Cantons</h3>
    <p class="font-robotoRegular text-sm text-primary-200">
      Lorem ipsum dolor sit amet consectetur. Id non pellentesque pellentesque.
    </p>
    <div class="flex flex-wrap items-start justify-start gap-2.5 pt-5">
      <div
        v-for="canton in cantons"
        :key="'canton' + canton?.id"
        :class="backgroundColor"
        class="flex h-20 min-w-[80px] max-w-[80px] items-center justify-center rounded-2xl border border-primary/20 bg-contain bg-center bg-no-repeat text-center"
        :style="`background-image: url('${backendUrl}${canton?.image?.renditions?.thumbnail}');`"
      >
        <span class="font font-robotoRegular text-sm text-primary-200">
          {{ canton?.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Canton } from "@/types/hotel";

const runtimeConfig = useRuntimeConfig();
const backendUrl = runtimeConfig.public.backendUrl;

const { cantons } = defineProps<{
  cantons: Array<Canton>;
}>();
let backgroundColor = "bg-light-100";

const selectCanton = (canton: Canton) => {
  console.log(canton);
};
</script>
