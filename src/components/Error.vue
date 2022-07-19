<script setup lang="ts">
defineProps<{
  err: string;
}>();
</script>

<template>
  <div
    class="absolute inset-0 p-1 text-center bg-gray-100 text-red-600 shadow shadow-gray-700 mx-auto w-52 h-fit"
  >
    {{ err }}
  </div>
</template>
