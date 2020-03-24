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
    //console.log("state.boards :", state.boards);
  },
  SET_CURRENT_BOARD(state, board) {
    if (!board) {
      state.currentBoard = {};
    } else {
      state.currentBoard = {
        id: board.id,
        name: board.name,
        url: board.url,
        dateLastActivity: board.dateLastActivity,
        lists: []
      };
    }
  },
  SET_IS_SUBMITTING_FORM(state, value) {
    sessionStorage.setItem("isSubmittingForm", value);
  },
  SET_LISTS(state, list) {
    if (!list) state.currentLists = [];
    else {
      state.currentLists = list.map(list => list);
      //console.log("state.lists :", state.lists);
    }
  }
};

export default mutations;
