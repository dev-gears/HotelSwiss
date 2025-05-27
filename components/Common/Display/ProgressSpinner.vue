<template>
  <PrimeProgressSpinner
    :strokeWidth="strokeWidth"
    :fill="fill"
    :animationDuration="animationDuration"
    :pt="ptProps"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import PrimeProgressSpinner from "primevue/progressspinner";

export interface ProgressSpinnerProps {
  strokeWidth?: string;
  fill?: string;
  animationDuration?: string;
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "warning" | "danger" | "info";
  customColor?: string;
}

const props = withDefaults(defineProps<ProgressSpinnerProps>(), {
  strokeWidth: "2",
  fill: "none",
  animationDuration: "2s",
  size: "medium",
  color: "primary",
  customColor: "",
});

const sizeClass = computed(() => {
  switch (props.size) {
    case "small":
      return "w-6 h-6";
    case "large":
      return "w-12 h-12";
    case "medium":
    default:
      return "w-8 h-8";
  }
});

const colorClass = computed(() => {
  if (props.customColor) {
    return `text-[${props.customColor}]`;
  }

  const colorMap = {
    primary: "text-primary",
    secondary: "text-primary-200 dark:text-light",
    warning: "text-warning",
    danger: "text-danger",
    info: "text-info",
  };

  return colorMap[props.color];
});

const ptProps = computed(() => {
  return {
    root: {
      class: ["inline-block animate-spin", sizeClass.value]
        .filter(Boolean)
        .join(" "),
    },
    spinner: {
      class: colorClass.value,
    },
  };
});
</script>
