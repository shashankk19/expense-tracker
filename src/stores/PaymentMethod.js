import { defineStore } from 'pinia'

export const usePaymentStore = defineStore('PaymentMethod', {
  state: () => ({
    paymentMethods: ['cash'], // State is defined here
  }),

  actions: {
    addPaymentMethod(paymentMethod) {
      this.paymentMethods.push(paymentMethod) // Use 'this' to access state
    },
  },

  getters: {
    allPaymentMethods: (state) => state.paymentMethods, // Pass 'state' as an argument
  },
})
