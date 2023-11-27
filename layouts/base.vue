<template>
  <div class="flex min-h-screen flex-col justify-between">
    <div>
      <Header />
      <div class="container mx-auto px-3">
        <Search />
      </div>
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts"></script>
