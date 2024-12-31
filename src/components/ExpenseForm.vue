<template>
  <v-form @submit.prevent="addExpense">
    <!-- Name -->
    <v-text-field
      v-model="expense.name"
      label="Name"
      placeholder="Enter expense name"
      outlined
      required
    />

    <!-- Amount -->
    <v-text-field
      v-model="expense.amount"
      label="Amount"
      placeholder="Enter amount"
      type="number"
      outlined
      required
    />

    <!-- Date -->
    <v-menu
      v-model="dateMenu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="slide-x-reverse-transition"
    >
      <template #activator="{ on, attrs }">
        <v-text-field
          v-model="expense.date"
          label="Date"
          placeholder="Select date"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
          outlined
          required
        />
      </template>
      <v-date-picker v-model="expense.date" @input="dateMenu = false" />
    </v-menu>

    <!-- Category -->
    <v-text-field
      v-model="expense.category"
      label="Category"
      placeholder="Enter category"
      outlined
      required
    />

    <!-- Payment Method -->
    <v-text-field
      v-model="expense.paymentMethod"
      label="Payment Method"
      placeholder="Enter payment method"
      outlined
      required
    />

    <!-- Add Expense Button -->
    <v-btn @click.prevent="addExpense" color="primary" large block> Add Expense </v-btn>
  </v-form>

  <ExpenseList :expenseList="expenseList" />
</template>

<script setup>
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import ExpenseList from './ExpenseList.vue'
const expenseList = ref([])
const expense = ref({
  id: 0,
  name: '',
  amount: 0,
  date: '',
  category: '',
  paymentMethod: '',
})

const addExpense = () => {
  expense.value.id = uuidv4()
  expenseList.value.push({ ...expense.value })
  expense.value = {
    id: 0,
    name: '',
    amount: 0,
    date: '',
    category: '',
    paymentMethod: '',
  }
  localStorage.setItem('expenseList', JSON.stringify(expenseList.value))
  console.log(expenseList.value)
}
</script>

<style></style>
