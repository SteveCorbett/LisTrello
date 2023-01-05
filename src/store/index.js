import { createStore, useStore } from "vuex";
import { actions } from "./actions";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { state } from "./state";

// export const key = Symbol();
console.log("Creating store");
export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {},
});

// export function getStore() {
//   return {
//     store: useStore(key),
//   };
// }
