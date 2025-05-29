<template>
  <Chip
    removable
    :label="label"
    :class="chipClass"
    @remove="$emit('remove')"
    :pt="chipPt"
  />
</template>

<script setup lang="ts">
import Chip from "primevue/chip";

interface Props {
  label: string;
  variant?: "primary" | "secondary" | "emerald" | "danger";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
});

defineEmits<{
  remove: [];
}>();

const chipClass = computed(() => {
  const baseClass = "modern-chip";
  const variantClasses = {
    primary: "primary-chip",
    secondary: "secondary-chip",
    emerald: "emerald-chip",
    danger: "danger-chip",
  };
  return `${baseClass} ${variantClasses[props.variant]}`;
});

const chipPt = computed(() => {
  const variants = {
    primary: {
      root: "!bg-primary/10 !border-primary/30 hover:!bg-primary/18 dark:!bg-primary-200/25 dark:!border-primary-200/50 dark:hover:!bg-primary-200/35 !text-primary dark:!text-light !rounded-full !px-3 !py-1.5 !text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md",
      removeIcon:
        "!text-primary hover:!text-primary-100 dark:!text-light dark:hover:!text-light/80 !ml-2 transition-colors",
    },
    secondary: {
      root: "!bg-primary-200/10 !border-primary-200/30 hover:!bg-primary-200/18 dark:!bg-primary/25 dark:!border-primary/50 dark:hover:!bg-primary/35 !text-primary-200 dark:!text-light !rounded-full !px-3 !py-1.5 !text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md",
      removeIcon:
        "!text-primary-200 hover:!text-primary dark:!text-light dark:hover:!text-light/80 !ml-2 transition-colors",
    },
    emerald: {
      root: "!bg-primary/8 !border-primary/25 hover:!bg-primary/15 dark:!bg-primary-200/20 dark:!border-primary-200/40 dark:hover:!bg-primary-200/30 !text-primary dark:!text-light !rounded-full !px-3 !py-1.5 !text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md",
      removeIcon:
        "!text-primary hover:!text-primary-100 dark:!text-light dark:hover:!text-light/80 !ml-2 transition-colors",
    },
    danger: {
      root: "!bg-danger/10 !border-danger/30 hover:!bg-danger/18 dark:!bg-red-400/25 dark:!border-red-400/50 dark:hover:!bg-red-400/35 !text-danger dark:!text-red-400 !rounded-full !px-3 !py-1.5 !text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md",
      removeIcon:
        "!text-danger hover:!text-red-600 dark:!text-red-400 dark:hover:!text-red-300 !ml-2 transition-colors",
    },
  };

  return variants[props.variant];
});
</script>

<style lang="pcss" scoped>
/* Modern Chip Base Styles */
:deep(.modern-chip) {
  @apply cursor-pointer border transition-all duration-200 ease-in-out;
  transform: scale(1);
}

:deep(.modern-chip:hover) {
  transform: scale(1.02);
}

/* Chip Remove Animation */
:deep(.modern-chip.p-chip-removable) {
  animation: chipEnter 0.2s ease-out;
}

@keyframes chipEnter {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Responsive improvements */
@media (max-width: 640px) {
  :deep(.modern-chip) {
    @apply text-xs;
  }
}
</style>
