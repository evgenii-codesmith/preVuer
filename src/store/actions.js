export default {
  addComponent({ commit }) {
    commit('ADD_COMPONENT');
  },
  updateText({ commit }, payload) {
    commit('UPDATE_TEXT', payload);
  },
  drawBox({ commit }) {
    commit('DRAW_BOX');
  },
  getCurrentText({ commit }) {
    commit('GET_CURRENT_TEXT');
  },
  getComponents({ commit }) {
    commit('GET_COMPONENTS');
  },
  deleteComponent({ commit }, payload) {
    commit('DELETE_COMPONENT', payload);
  },
};