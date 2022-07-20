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
  Flee,
}

type RoomInfo = {
  id: string;
  name: string;
  player1: string;
  player2: string;
  state: RoomState;
};

type RoomDetail = {
  name: string;
  player1: string;
  player2: string;
  p1Ready: boolean;
  p2Ready: boolean;
};

type BoardInfo = {
  board: PieceType[];
  turn: PlayerType;
  result: WinType;
};

const nicknameKey = Symbol(),
  errMsgKey = Symbol();

export { nicknameKey, RoomState, errMsgKey, PlayerType, PieceType, WinType };
export type { RoomInfo, RoomDetail, BoardInfo };
