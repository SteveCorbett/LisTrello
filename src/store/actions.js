import { boards, board } from "../utils/httpApi";

const localStorageUserToken = "lisTrelloHash";

const actions = {
  LOGIN({ commit }, token) {
    localStorage.setItem(localStorageUserToken, token);
    commit("LOGIN", token);
  },
  LOGOUT({ commit }) {
    commit("LOGOUT");
    localStorage.removeItem(localStorageUserToken);
  },
  LOADTOKEN({ commit }) {
    var trelloUserToken = localStorage.getItem(localStorageUserToken);
    commit("LOGIN", trelloUserToken);
  },
  GET_BOARDS({ commit }) {
    commit("SET_BOARDS", null);
    commit("SET_LISTS", null);
    return boards.get().then(data => {
      console.log("GET_BOARDS", data);
      data.forEach(board => {
        board.descLines = board.desc.split("\n");
      });
      commit("SET_BOARDS", data);
    });
  },
  CLEAR_CURRENT_BOARD({ commit }) {
    commit("SET_CURRENT_BOARD", null);
    commit("SET_LISTS", null);
  },
  GET_LISTS_FOR_BOARD({ commit }, boardId) {
    const inputBoard = this.getters["getBoardForId"](boardId);
    console.log("GET_LISTS_FOR_BOARD", inputBoard);
    commit("SET_CURRENT_BOARD", inputBoard);
    commit("SET_LISTS", null);
    return board.getLists(boardId).then(data => {
      data.forEach(list => {
        list.cards.forEach(card => {
          card.descLines = card.desc.split("\n");
        });
      });
      commit("SET_LISTS", data);
    });
  },
  IS_SUBMITTING_FORM({ commit }, value) {
    commit("SET_IS_SUBMITTING_FORM", value);
  }
};

export default actions;
