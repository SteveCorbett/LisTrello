import { auth, board, card } from '../utils/httpApi'

const actions = {
  LOGIN({ commit }, { email, password }) {
    return auth.login(email, password)
      .then(({ accessToken }) => commit('LOGIN', { accessToken }))
  },
  FETCH_BOARD_LIST ({commit}) {
    return board.fetch()
      .then(data => commit('SET_BOARD_LIST', data))
  },
  FETCH_BOARD ({commit}, id) {
    return board.fetch(id)
      .then(data => commit('SET_BOARD', data))
  },
  FETCH_CARD ({commit}, id) {
    return card.fetch(id)
      .then(({item}) => commit('SET_CARD', item))
  },
}

export default actions 