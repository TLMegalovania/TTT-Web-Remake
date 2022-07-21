<script setup lang="ts">
import { conn } from "@/logic/Connection";
import router from "@/router";
import { nicknameKey, type RoomInfo, RoomState } from "@/Type";
import { inject, onUnmounted, shallowRef, type Ref } from "vue";

const nickname = inject<Ref<string>>(nicknameKey)!;
const rooms = shallowRef<RoomInfo[]>();
conn.on("gotRooms", (_rooms) => (rooms.value = _rooms));
onUnmounted(() => {
  conn.off("gotRooms");
});
const joinRoom = (id: number) => {
  router.push(`/room/${id}`);
};
</script>

<template>
  <div class="px-7 py-2 w-screen grid grid-cols-4 gap-3">
    <h2 class="text-center text-2xl col-span-full">Hello, {{ nickname }}!</h2>
    <div class="text-center">Room</div>
    <div class="text-center">Player1</div>
    <div class="text-center">Player2</div>
    <div class="text-center">State</div>
  </div>
  <div
    v-for="(room, id) in rooms"
    class="px-7 py-2 w-screen grid grid-cols-4 gap-5 hover:shadow-md transition-shadow"
    @click="joinRoom(id)"
  >
    <div class="p-3 text-center">{{ id }}</div>
    <div class="p-3 text-center">{{ room.Player1 }}</div>
    <div class="p-3 text-center">{{ room.Player2 }}</div>
    <div class="p-3 text-center">{{ RoomState[room.State] }}</div>
  </div>
</template>
