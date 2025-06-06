<template>
  <header class="flex min-h-[40px] w-full bg-primary dark:bg-dark-300">
    <div class="container mx-auto flex items-center justify-between p-3">
      <NuxtLink href="/" v-ripple>
        <img
          src="~/assets/images/minimal-logo.svg"
          alt="Website logo"
          class="h-8"
        />
      </NuxtLink>

      <!-- Desktop Navigation -->
      <div class="hidden lg:block">
        <NavigationMenu />
      </div>

      <div class="flex items-center gap-4">
        <!-- Mobile Navigation -->
        <div class="lg:hidden">
          <NavigationMenu />
        </div>

        <CommonThemeToggle />
        <LanguageSwitcher />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// Components are auto-imported by Nuxt
</script>
