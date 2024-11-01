import { createStore } from 'vuex';

const store = createStore({
  state: {
    isAuthenticated: !!localStorage.getItem('token'), // Check if token exists
    user: null, // Initialize user data
  },
  mutations: {
    login(state, userData) {
      state.isAuthenticated = true; // Set authenticated state
      state.user = userData; // Store user data
      localStorage.setItem('token', userData.token); // Store token
    },
    logout(state) {
      state.isAuthenticated = false; // Reset authenticated state
      state.user = null; // Clear user data
      localStorage.removeItem('token'); // Remove token on logout
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
