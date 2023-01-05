export function getters() {
  return {
    isAuthenticated(state) {
      return state.trelloUserToken != null;
    },
    trelloUserToken(state) {
      return state.trelloUserToken;
    },
    boards(state) {
      return state.boards;
    },
    currentLists(state) {
      return state.currentLists;
    },
    getBoardForId: (state) => (id) => {
      const results = state.boards.filter(function (board) {
        return board.id === id;
      });
      return results.length == 0 ? null : results[0];
    },
  };
}
