import { createStore } from 'vuex';

const store = createStore({
  state: {
    isAuthenticated: !!localStorage.getItem('token'),
    user: null,
  },
  mutations: {
    login(state, userData) {
      state.isAuthenticated = true;
      state.user = userData;
      localStorage.setItem('token', userData.token);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('token');
    },
  },
  actions: {
    login({ commit }, userData) {
      commit('login', userData);
    },
    logout({ commit }) {
      commit('logout');
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    user: (state) => state.user,
  },

});

export default store;
