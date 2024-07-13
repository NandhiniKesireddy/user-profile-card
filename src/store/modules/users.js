import axios from "axios";

const state = {
  userDetails: null,
  userPosts: [],
  error: null,
};

const mutations = {
  SET_USER_DETAILS(state, details) {
    state.userDetails = details;
  },
  SET_USER_POSTS(state, posts) {
    state.userPosts = posts;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  CLEAR_USER_DATA(state) {
    state.userDetails = null;
    state.userPosts = [];
    state.error = null;
  },
};

const actions = {
  async fetchUserDetails({ commit }, userId) {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      commit("SET_USER_DETAILS", response.data);
      commit("SET_ERROR", null);
    } catch (error) {
      commit("SET_ERROR", error);
      commit("SET_USER_DETAILS", null); // Clear user details in case of error
    }
  },
  async fetchUserPosts({ commit }, userId) {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );
      commit("SET_USER_POSTS", response.data);
      commit("SET_ERROR", null);
    } catch (error) {
      commit("SET_ERROR", error);
      commit("SET_USER_POSTS", []);
    }
  },
};

const getters = {
  userDetails: (state) => state.userDetails,
  userPosts: (state) => state.userPosts,
  error: (state) => state.error,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
