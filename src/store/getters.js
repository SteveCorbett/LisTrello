const getters = {
    isAuthenticated(state) {
      return !state.trelloUserToken
    }
  }
  
  export default getters