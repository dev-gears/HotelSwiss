<template>
  <header
    class="container mx-auto flex min-h-[40px] w-full flex-col items-center justify-center md:justify-between"
  >
    <div class="flex w-full items-center justify-between p-2">
      <span class="ml-2 text-2xl font-bold text-primary">Hotel Swiss</span>
      <Button
        icon="pi pi-user"
        class="text-secondary border bg-primary px-3 py-2"
        label="Login"
      />
    </div>
    <Search class="w-2/3" />
  </header>
</template>

<script setup lang="ts"></script>
