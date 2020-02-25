import { setDefaultAuthHeader } from "../utils/httpApi";

const mutations = {
  LOGIN(state, payload) {
    //console.log("mutations LOGIN ", payload);
    if (!payload) return;
    state.trelloUserToken = payload;
  },
  LOGOUT(state) {
    state.trelloUserToken = null;
    delete localStorage.trelloUserToken;
    setDefaultAuthHeader(null);
  },
  SET_BOARDS(state, list) {
    if (!list) state.boards = [];
    else state.boards = list.map(board => board);
    //console.log("state.boards :", state.boards);
  },
  SET_LISTS(state, list) {
    if (!list) state.lists = [];
    else {
      state.lists = list.map(board => board);
      console.log("state.lists :", state.lists);
    }
  }
};

export default mutations;
