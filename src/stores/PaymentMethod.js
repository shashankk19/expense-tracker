import axios from 'axios'
import { defineStore } from 'pinia'

export const usePaymentStore = defineStore('PaymentMethod', {
  state: () => ({
    paymentMethods: [], // State is defined here
  }),

  actions: {
    addPaymentMethod(paymentMethod) {
      this.paymentMethods.push(paymentMethod) // Use 'this' to access state
    },
    async fetchPaymentMethods(id, token) {
      // Fetch payment methods from API
      console.log(id)
      try {
        const response = await axios.get(`http://192.168.1.20:8090/paymentMethods/${id}/all`, {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization header
          },
        })
        this.paymentMethods = response.data
      } catch (error) {
        console.error(error)
      } finally {
        console.log(this.paymentMethods)
      }
    },
  },

  getters: {
    allPaymentMethods: (state) => state.paymentMethods, // Pass 'state' as an argument
  },
})
