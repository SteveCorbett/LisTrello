import { setDefaultAuthHeader } from "../utils/httpApi";
//import { auth, board, card } from '../utils/httpApi'

const localStorageUserToken = "lisTrelloHash"

const actions = {
  LOGIN({ commit }, token) {
    //console.log("Action LOGIN: " + token);
    localStorage.setItem(localStorageUserToken, token);
    setDefaultAuthHeader(token);
    commit("LOGIN", token);
  },
  LOADTOKEN({ commit }) {
    var trelloUserToken = localStorage.getItem(localStorageUserToken);
      
    if (trelloUserToken) {
      //console.log("Action LOADTOKEN: " + trelloUserToken);
      setDefaultAuthHeader(trelloUserToken);
      commit("LOGIN", trelloUserToken);
    }
  }
};

export default actions;
