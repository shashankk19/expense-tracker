import axios, { all } from 'axios'
import { defineStore } from 'pinia'

export const useExpenseStore = defineStore('ExpenseStore', {
  state: () => ({
    expenses: [],
  }),

  actions: {
    async fetchExpenses(id, token) {
      try {
        const response = await axios.get(`http://192.168.1.20:8090/expense/${id}/all`, {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization header
          },
        })
        this.expenses = response.data
      } catch (error) {
        console.error(error)
      } finally {
        console.log(this.expenses)
      }
    },
    saveExpense(expense) {
      this.expenses.push(expense)
    },
  },
  getters: {
    allExpenses: (state) => state.expenses,
    totalExpenses: (state) => {
      return state.expenses.reduce((acc, expense) => acc + expense.amount, 0)
    },
  },
})
