import { setDefaultAuthHeader } from "../utils/httpApi"
const mutations = {
    LOGIN (state, {userToken}) {
      if (!userToken) return
      state.trelloUserToken = userToken
      localStorage.trelloUserToken = userToken
      setDefaultAuthHeader(userToken)
    },
    LOGOUT (state) {
      state.trelloUserToken = null 
      delete localStorage.trelloUserToken
      setDefaultAuthHeader(null)
    }
}

export default mutations 