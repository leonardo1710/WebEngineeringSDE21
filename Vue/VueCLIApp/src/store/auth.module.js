import { userService } from "@/services";

const state = {
  errors: null,
  user: {},
  isAuthenticated: false
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  }
};

const actions = {
  login(context, credentials) {
    return new Promise(resolve => {
      userService.login(credentials)
          .then(response => {
              context.commit("setAuth", response.data.message);
              resolve(response.data.message);
          })
          .catch(response =>{
            console.log(response);
            context.commit("setError", response.data.errors);
          })
    });
  },
  logout(context) {
    context.commit("destroyAuth");
  }
};

const mutations = {
  setError(state, error) {
    state.errors = error;
  },
  setAuth(state, user) {
    state.isAuthenticated = true;
    state.user = user;
    state.errors = {};
  },
  destroyAuth(state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
