<template>
  <div class="flex min-h-screen flex-col justify-between">
    <div>
      <Header />
      <Search />
      <div class="container mx-auto">
        <slot />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts"></script>
