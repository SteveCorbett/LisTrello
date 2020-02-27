//import { setDefaultAuthHeader } from "../utils/httpApi";

const mutations = {
  LOGIN(state, payload) {
    //console.log("mutations LOGIN ", payload);
    if (!payload) return;
    state.trelloUserToken = payload;
  },
  LOGOUT(state) {
    state.trelloUserToken = null;
    delete localStorage.trelloUserToken;
  },
  SET_BOARDS(state, list) {
    if (!list) state.boards = [];
    else state.boards = list.map(board => board);
    console.log("state.boards :", state.boards);
  },
  SET_CURRENT_BOARD(state, board) {
    state.currentBoard = {
      id: board.id,
      name: board.name,
      url: board.url,
      dateLastActivity: board.dateLastActivity,
      lists: []
    };
  },
  SET_LISTS(state, list) {
    if (!list && state.currentBoard) state.currentBoard.lists = [];
    else {
      //state.lists = list.map(board => board);
      if (state.currentBoard)
        state.currentBoard.lists = list.map(board => board);
      //console.log("state.lists :", state.lists);
    }
  }
};

export default mutations;
