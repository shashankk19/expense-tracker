import { defineStore } from 'pinia'

export const useAuthStore = defineStore('AuthStore', {
  //state
  state: () => ({
    loggedUser: null,
    token: null,
  }),
  //getters

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
