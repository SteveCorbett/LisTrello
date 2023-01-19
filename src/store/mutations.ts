import { Organization } from "./../models/Organization";
import { User } from "./../models/User";
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
  SET_CURRENT_LISTS(state: State, list: List[]) {
    if (!list) state.currentLists = [];
    else {
      state.currentLists = list;
    }
  },
  SET_CURRENT_ORGANIZATION(state: State, value: Organization) {
    state.currentOrganisation = value;
  },
  SET_ORGANIZATIONS(state: State, value: Organization[]) {
    state.organizations = value;
  },
  SET_SHOWING_TITLE(
    state: State,
    value: { showTitle: boolean; drawerWidth: number }
  ) {
    state.drawer = Object.assign({}, state.drawer, value);
  },
  SET_USER(state: State, value: User) {
    state.user = value;
  },
};
