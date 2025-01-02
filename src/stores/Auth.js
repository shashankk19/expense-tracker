import { defineStore } from 'pinia'

export const useAuthStore = defineStore('AuthStore', {
  //state
  state: () => ({
    loggedUser: {},
    token: null,
  }),
  //getters
  getters: {
    isLogged: (state) => !!state.loggedUser,
    currentUserId: (state) => state.loggedUser.id,
    authToken: (state) => state.token,
  },
  //actions
  actions: {
    setUser(user) {
      this.loggedUser = user
    },
    setToken(token) {
      this.token = token
    },
  },
})
