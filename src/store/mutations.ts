import { Board } from "@/models/Board";
import { List } from "./../models/List";
import { State } from "./state";

export const mutations = {
  LOGIN(state: State, payload: string) {
    state.trelloUserToken = payload;
  },
  LOGOUT(state: State) {
    state.trelloUserToken = null;
    delete localStorage.trelloUserToken;
  },
  SET_BOARDS(state: State, boards?: Board[]) {
    if (!boards) state.boards = [];
    // else state.boards = list.map((board) => board);
    else state.boards = boards;
  },
  SET_CURRENT_BOARD(state: State, board: Board) {
    if (!board) {
      state.currentBoard = null;
    } else {
      state.currentBoard = Object.assign({}, board);
      state.currentBoard.lists = [];
    }
  },
  SET_IS_SUBMITTING_FORM(state: State, value: string) {
    sessionStorage.setItem("isSubmittingForm", value);
  },
  SET_LISTS(state: State, list: List[]) {
    if (!list) state.currentLists = [];
    else {
      // state.currentLists = list.map((list) => list);
      state.currentLists = list;
    }
  },
};
