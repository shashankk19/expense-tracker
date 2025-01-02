<template>
  <div>
    <v-card
      v-for="expense in expenseStore.expenses"
      :key="expense.id"
      class="expense-item margin-top-10"
    >
      <v-card-title>{{ expense.title }}</v-card-title>
      <v-card-text>
        <p>Date: {{ expense.date }}</p>
        <p>Amount: {{ expense.amount }}</p>
        <p>Category: {{ expense.category }}</p>
        <p>Payment Method: {{ expense.paymentMethod }}</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useExpenseStore } from '../stores/ExpenseStore.js'
import { useAuthStore } from '@/stores/Auth.js'

const expenseStore = useExpenseStore()
const authStore = useAuthStore()

onMounted(async () => {
  try {
    await expenseStore.fetchExpenses(authStore.currentUserId, authStore.authToken)
  } catch (error) {
    console.log(error)
  }
})
</script>

<style>
.expense-item {
  padding: 1rem;
  border: 1px solid #ddd;
  margin-bottom: 0.5rem;
  border-radius: 5px;
  background-color: #f9f9f9;
}
</style>
