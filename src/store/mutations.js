import { setDefaultAuthHeader } from "../utils/httpApi"

const mutations = {
    LOGIN (state, payload) {
      //console.log("mutations LOGIN ", payload);
      if (!payload) return
      state.trelloUserToken = payload
    },
    LOGOUT (state) {
      state.trelloUserToken = null 
      delete localStorage.trelloUserToken
      setDefaultAuthHeader(null)
    }
}

export default mutations 