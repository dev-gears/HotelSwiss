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
        class="flex h-20 min-w-[80px] max-w-[80px] items-center justify-center rounded-2xl border border-primary/20 bg-light bg-50 bg-center bg-no-repeat text-center font-robotoRegular text-sm text-primary-200"
        :style="`background-image: url('${backendUrl}${canton?.image?.renditions?.thumbnail}');`"
        @click="addOrRemoveCanton(canton, $event.target as HTMLElement)"
      >
        {{ canton?.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Canton } from "@/types/hotel";
import { ref, watchEffect } from "vue";

const emit = defineEmits(["update:modelValue"]);
const runtimeConfig = useRuntimeConfig();
const backendUrl = runtimeConfig.public.backendUrl;

const { cantons, modelValue } = defineProps<{
  cantons: Array<Canton>;
  modelValue: Array<Canton>;
}>();

const selectedCantons = ref(modelValue);

const addOrRemoveCanton = (canton: Canton, element: HTMLElement) => {
  element.classList.toggle("selected");

  if (selectedCantons.value.includes(canton)) {
    selectedCantons.value = selectedCantons.value.filter((c) => c !== canton);
  } else {
    selectedCantons.value = [...selectedCantons.value, canton];
  }
};

watchEffect(() => {
  emit("update:modelValue", selectedCantons.value);
});
</script>

<style>
.selected {
  @apply bg-primary text-light;
}
</style>
