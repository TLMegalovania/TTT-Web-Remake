<script setup lang="ts">
import { conn } from "@/logic/Connection";
import router from "@/router";
import {
  nicknameKey,
  type RoomInfo,
  RoomState,
  PlayerState,
  playerStateKey,
} from "@/Type";
import { inject, ref, type Ref } from "vue";

const nickname = inject<Ref<string>>(nicknameKey)!;
const playerState = inject<Ref<PlayerState>>(playerStateKey)!;
const rooms = ref<RoomInfo[]>();
conn.on("getRooms", (_rooms) => (rooms.value = _rooms));
const joinRoom = (id: string) => {
  conn.invoke("joinRoom", id).then((state: PlayerState) => {
    if (state != PlayerState.Online) {
      router.push(`/room/${id}`);
      playerState.value = state;
    }
  });
};
</script>

<template>
  <div class="px-7 py-2 w-screen grid grid-cols-3 gap-3">
    <h2 class="text-center text-2xl col-span-full">Hello, {{ nickname }}!</h2>
    <div class="text-center">Room</div>
    <div class="text-center">Host</div>
    <div class="text-center">State</div>
  </div>
  <div
    v-for="room in rooms"
    class="px-7 py-2 w-screen grid grid-cols-3 gap-5"
    @click="joinRoom(room.id)"
    :key="room.id"
  >
    <div class="p-3">{{ room.name }}</div>
    <div class="p-3">{{ room.host }}</div>
    <div class="p-3">{{ RoomState[room.state] }}</div>
  </div>
</template>
