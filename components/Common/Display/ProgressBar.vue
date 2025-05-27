<template>
  <PrimeProgressBar
    :value="value"
    :mode="mode"
    :showValue="showValue"
    :indeterminate="indeterminate"
    :pt="ptProps"
    v-bind="$attrs"
  >
    <template v-if="$slots.default" #default>
      <slot></slot>
    </template>
  </PrimeProgressBar>
</template>

<script setup lang="ts">
import { computed } from "vue";
import PrimeProgressBar from "primevue/progressbar";

export interface ProgressBarProps {
  value?: number;
  mode?: "determinate" | "indeterminate";
  showValue?: boolean;
  indeterminate?: boolean;
  variant?: "primary" | "success" | "warning" | "danger" | "info";
  height?: "small" | "medium" | "large";
  format?: (value: number) => string;
}

const props = withDefaults(defineProps<ProgressBarProps>(), {
  value: 0,
  mode: "determinate",
  showValue: true,
  indeterminate: false,
  variant: "primary",
  height: "medium",
  format: (value: number) => `${value}%`,
});

const heightClass = computed(() => {
  switch (props.height) {
    case "small":
      return "h-1.5";
    case "large":
      return "h-4";
    case "medium":
    default:
      return "h-2.5";
  }
});

const variantClass = computed(() => {
  const variantMap = {
    primary: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
    info: "bg-info",
  };

  return variantMap[props.variant];
});

const ptProps = computed(() => {
  return {
    root: {
      class: [
        "relative overflow-hidden w-full bg-light-200 dark:bg-dark-300 rounded-full",
        heightClass.value,
      ]
        .filter(Boolean)
        .join(" "),
    },
    value: {
      class: [
        variantClass.value,
        "h-full transition-width duration-1000 ease-in-out",
        props.mode === "indeterminate" ? "progress-bar-indeterminate" : "",
      ]
        .filter(Boolean)
        .join(" "),
    },
    label: {
      class:
        "font-robotoRegular text-white text-xs absolute inset-0 flex justify-center items-center",
    },
  };
});
</script>

<style scoped>
.progress-bar-indeterminate {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 25%;
  background-color: inherit;
  animation: progress-indeterminate 2s linear infinite;
}

@keyframes progress-indeterminate {
  0% {
    left: -25%;
  }
  100% {
    left: 100%;
  }
}
</style>
