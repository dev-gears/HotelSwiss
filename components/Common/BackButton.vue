<template>
  <Button
    @click="$router.back()"
    icon="pi pi-chevron-left"
    :pt="{
      root: 'text-light z-20 flex h-10 w-10 items-center justify-center !rounded-md !rounded-tr-none !bg-primary/90 dark:!bg-primary-100/90 !px-3 !py-4 !shadow-primary dark:!shadow-primary-100',
      icon: 'text-light dark:text-light/90',
    }"
  />
</template>

<script setup lang="ts"></script>
