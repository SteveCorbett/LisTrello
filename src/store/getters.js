const getters = {
    isAuthenticated(state) {
      return !state.trelloUserToken
    },
    trelloUserToken(state) {
      //console.log("getters: trelloUserToken", state);
      return state.trelloUserToken
    }
  }
  
  export default getters