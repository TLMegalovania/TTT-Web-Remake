// enum PlayerState {
//   Offline,
//   Online,
//   NotReady,
//   Ready,
//   InGame,
// }

enum PlayerType {
  None,
  Host,
  Guest,
  Observer,
}

enum RoomState {
  Available,
  Full,
  InGame,
}

enum PieceType {
  Null,
  Black,
  White,
}

enum WinType {
  Null,
  Tie,
  Black,
  White,
}

type RoomInfo = {
  id: string;
  name: string;
  host: string;
  state: RoomState;
};

type RoomDetail = {
  name: string;
  host: string;
  guest?: string;
  ready: boolean;
  started: boolean;
};

type BoardInfo = {
  board: PieceType[];
  turn: PlayerType;
  result: WinType;
};

const nicknameKey = Symbol(),
  errMsgKey = Symbol();
// playerTypeKey = Symbol();
// roomInfoKey = Symbol();

export {
  //PlayerState,
  //playerStateKey,
  nicknameKey,
  RoomState,
  errMsgKey,
  PlayerType,
  PieceType,
  WinType,

  // playerTypeKey,
  // roomInfoKey,
};
export type { RoomInfo, RoomDetail, BoardInfo };
