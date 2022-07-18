<script setup lang="ts">
import { provide, ref } from "vue";
import { RouterView } from "vue-router";
import { nicknameKey, PlayerState, playerStateKey } from "./Type";
import Logo from "./components/Logo.vue";
const playerState = ref(PlayerState.Offline);
provide(playerStateKey, playerState);
const nickname = ref("Noob");
provide(nicknameKey, nickname);
</script>

<template>
  <div class="bg-slate-400 h-screen">
    <Logo />
    <RouterView />
  </div>
</template>
