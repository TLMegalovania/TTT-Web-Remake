<script setup lang="ts">
defineProps<{
  err: string | null;
}>();
</script>

<template>
  <div
    class="absolute inset-0 mt-0 p-2 text-center bg-gray-100 text-red-600 shadow mx-auto max-w-screen-sm min-h-fit"
    v-if="err"
  >
    {{ err }}
  </div>
</template>
