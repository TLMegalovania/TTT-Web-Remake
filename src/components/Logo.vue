<script setup lang="ts">
import router from "@/router";
const back = () => {
  switch (router.currentRoute.value.name) {
    case "home":
      router.push("/");
      break;
    case "hall":
      router.push("/");
      break;
    case "room":
      router.push("/hall");
      break;
  }
};
</script>

<template>
  <div
    class="static top-0 p-3 grid h-20 hover:cursor-pointer gap-1 grid-rows-1 grid-cols-4 w-72"
    @click="back"
    title="back"
  >
    <img src="/favicon.ico" alt="tie-tac-toe" class="max-h-full col-span-1" />
    <h1 class="text-3xl col-span-3 text-center p-3">Tic Tac Toe</h1>
  </div>
</template>
