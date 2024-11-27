<template>
  <Button
    @click="$router.back()"
    icon="pi pi-chevron-left"
    :pt="{
      root: 'text-light z-20 flex h-10 w-10 items-center justify-center !rounded-md !rounded-tr-none !bg-primary/90 !px-3 !py-4 !shadow-primary',
      icon: 'text-light',
    }"
  />
</template>

<script setup lang="ts"></script>
