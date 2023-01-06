import { Board } from "@/models/Board";
import { List } from "@/models/List";
import { ActionContext } from "vuex";
import { boards, board } from "../utils/httpApi";
import { State } from "./state";

const localStorageUserToken = "lisTrelloHash";

export const actions = {
  LOGIN({ commit }: ActionContext<State, State>, token: string) {
    localStorage.setItem(localStorageUserToken, token);
    commit("LOGIN", token);
  },
  LOGOUT({ commit }: ActionContext<State, State>) {
    commit("LOGOUT");
    localStorage.removeItem(localStorageUserToken);
  },
  LOADTOKEN({ commit }: ActionContext<State, State>) {
    var trelloUserToken = localStorage.getItem(localStorageUserToken);
    commit("LOGIN", trelloUserToken);
  },
  GET_BOARDS({ commit }: ActionContext<State, State>) {
    commit("SET_BOARDS", null);
    commit("SET_LISTS", null);
    boards.get().then((data: Board[]) => {
      data.forEach((board) => {
        board.descLines = board.desc.split("\n");
      });
      commit("SET_BOARDS", data);
    });
  },
  CLEAR_CURRENT_BOARD({ commit }: ActionContext<State, State>) {
    commit("SET_CURRENT_BOARD", null);
    commit("SET_LISTS", null);
  },
  GET_LISTS_FOR_BOARD(
    { commit, getters }: ActionContext<State, State>,
    boardId: string
  ) {
    const inputBoard = getters["getBoardForId"](boardId);
    commit("SET_CURRENT_BOARD", inputBoard);
    commit("SET_LISTS", null);
    board.getLists(boardId).then((data: List[]) => {
      data.forEach((list) => {
        list.cards.forEach((card) => {
          card.descLines = card.desc.split("\n");
        });
      });
      commit("SET_LISTS", data);
    });
  },
  IS_SUBMITTING_FORM({ commit }: ActionContext<State, State>, value: string) {
    commit("SET_IS_SUBMITTING_FORM", value);
  },
};
