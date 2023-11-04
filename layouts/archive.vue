<template>
  <div class="flex min-h-screen flex-col justify-between">
    <div>
      <Header />
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts"></script>
