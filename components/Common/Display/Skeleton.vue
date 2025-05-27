<template>
  <PrimeSkeleton
    :width="width"
    :height="height"
    :borderRadius="borderRadius"
    :size="size"
    :shape="shape"
    :animation="animation"
    :pt="ptProps"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import PrimeSkeleton from "primevue/skeleton";

export interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  size?: string;
  shape?: "rectangle" | "circle";
  animation?: "wave" | "none";
  className?: string;
}

const props = withDefaults(defineProps<SkeletonProps>(), {
  width: "100%",
  height: "1rem",
  borderRadius: "0.25rem",
  shape: "rectangle",
  animation: "wave",
  className: "",
});

const ptProps = computed(() => {
  const baseClasses = "bg-light-200 dark:bg-dark-300";

  const animationClasses =
    props.animation === "wave" ? "skeleton-animation-wave" : "";

  return {
    root: {
      class: [
        baseClasses,
        animationClasses,
        props.className,
        props.shape === "circle" ? "rounded-full" : "",
      ]
        .filter(Boolean)
        .join(" "),
    },
  };
});
</script>

<style scoped>
.skeleton-animation-wave {
  position: relative;
  overflow: hidden;
}

.skeleton-animation-wave::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

:deep(.dark) .skeleton-animation-wave::after {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.05) 20%,
    rgba(255, 255, 255, 0.1) 60%,
    rgba(255, 255, 255, 0) 100%
  );
}
</style>
