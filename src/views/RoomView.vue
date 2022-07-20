<script setup lang="ts">
import {
  errMsgKey,
  PieceType,
  PlayerType,
  WinType,
  type BoardInfo,
  type RoomDetail,
} from "@/Type";
import { inject, ref, type Ref, onUnmounted, shallowRef } from "vue";
import { conn } from "@/logic/Connection";
import router from "@/router";

onUnmounted(() => {
  conn.off("gotRoom");
  conn.off("gotBoard");
  conn.off("joinedRoom");
  conn.off("deletedRoom");
  conn.invoke("leaveRoom");
});

const props = defineProps<{
  id: string;
}>();
const errMsg = inject<Ref<string | undefined>>(errMsgKey)!;
const playerType = ref(PlayerType.None);

conn.invoke("joinRoom", props.id);
conn.on("joinedRoom", (t: PlayerType) => {
  playerType.value = t;
  if (t == PlayerType.None) {
    router.push("/hall");
    errMsg.value = "The room doesn't exist.";
  }
});
conn.on("deletedRoom", () => router.push("/hall"));

const roomDetail = ref<RoomDetail>();
const turn = ref(PlayerType.None);
const startOrJoin = () => {
  if (playerType.value != PlayerType.Observer) {
    conn.invoke("startGame");
    ready.value = !ready.value;
  } else {
    conn.invoke("joinRoom", props.id);
  }
};
conn.on("gotRoom", (detail: RoomDetail) => {
  roomDetail.value = detail;
});

const board = shallowRef<PieceType[]>();
const result = ref(WinType.Null);
const go = (index: number) => {
  conn.invoke("go", index);
};
conn.on("gotBoard", (b: BoardInfo) => {
  board.value = b.Board;
  turn.value =
    b.Turn == PieceType.Black
      ? PlayerType.Host
      : b.Turn == PieceType.White
      ? PlayerType.Guest
      : PlayerType.None;
  result.value = b.Result;
  ready.value = false;
  console.log(
    !(roomDetail.value?.P1Ready && roomDetail.value.P2Ready) ||
      playerType != turn
  );
});

const ready = ref(false);
</script>

<template>
  <div class="grid px-6 grid-rows-4 grid-cols-4">
    <div
      class="col-start-1 col-span-1 text-gray-800 text-lg shadow-md shadow-slate-200"
    >
      {{ roomDetail?.P1Ready ? "⚫" : "" }} Black: {{ roomDetail?.Player1 }}
    </div>
    <div
      class="col-start-3 col-span-1 text-gray-200 text-lg shadow-md shadow-slate-800"
    >
      {{ roomDetail?.P2Ready ? "⚪" : "" }} White: {{ roomDetail?.Player2 }}
    </div>
    <button
      v-if="
        !(
          (roomDetail?.P1Ready && roomDetail.P2Ready) ||
          (playerType == PlayerType.Observer &&
            roomDetail?.Player1 != '' &&
            roomDetail?.Player2 != '')
        )
      "
      class="col-span-1 text-center p-1 bg-pink-300 hover:bg-pink-600 transition-colors"
      @click="startOrJoin"
    >
      {{
        playerType == PlayerType.Observer ? "Join" : ready ? "Unready" : "Ready"
      }}
    </button>
    <div
      class="row-span-3 col-span-3 grid grid-cols-5 grid-rows-5 divide-x divide-y divide-gray-400"
    >
      <button
        v-for="(piece, index) in board"
        class="text-center p-1 text-base cursor-pointer"
        :disabled="
          !(roomDetail?.P1Ready && roomDetail.P2Ready) ||
          playerType != turn ||
          piece != PieceType.Null
        "
        @click="go(index)"
      >
        {{
          piece == PieceType.Black ? "⚫" : piece == PieceType.White ? "⚪" : ""
        }}
      </button>
    </div>
    <div
      class="row-span-3 text-center text-lg font-bold p-5"
      v-if="roomDetail?.P1Ready && roomDetail.P2Ready"
    >
      Now<br />{{
        turn == PlayerType.Host ? "⚫" : turn == PlayerType.Guest ? "⚪" : ""
      }}
    </div>
    <div
      class="row-span-3 text-center text-lg font-bold p-5"
      v-else-if="result != WinType.Null"
    >
      {{
        result == WinType.Flee
          ? roomDetail?.Player1 == ""
            ? "⚫"
            : roomDetail?.Player2 == ""
            ? "⚪"
            : ""
          : result == WinType.Black
          ? "⚫"
          : result == WinType.White
          ? "⚪"
          : ""
      }}
      <br />
      {{
        result == WinType.Tie ? "Tie" : result == WinType.Flee ? "Flee" : "Win"
      }}
    </div>
  </div>
</template>
