const getters = {
  isAuthenticated(state) {
    return !state.trelloUserToken;
  },
  trelloUserToken(state) {
    //console.log("getters: trelloUserToken", state);
    return state.trelloUserToken;
  },
  boards(state) {
    return state.boards;
  }
};

export default getters;
