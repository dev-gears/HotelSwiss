<template>
  <header class="flex min-h-[40px] w-full bg-primary">
    <div class="container mx-auto flex items-center justify-between p-3">
      <NuxtLink to="/" v-ripple>
        <img
          src="~/assets/images/minimal-logo.svg"
          alt="Website logo"
          class="h-8"
        />
      </NuxtLink>
      <div class="flex items-center gap-4">
        <CommonThemeToggle />
        <LanguageSwitcher />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import CommonThemeToggle from "~/components/Common/ThemeToggle.vue";
</script>
