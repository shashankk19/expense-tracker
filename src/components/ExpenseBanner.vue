<template>
  <v-card class="mx-auto" max-width="">
    <v-card-text>
      <v-row>
        <v-col cols="12" md="3">
          <v-sheet class="pa-4" color="primary" dark>
            <v-row>
              <v-col cols="6">
                <v-icon size="48">mdi-currency-usd</v-icon>
              </v-col>

              <v-col cols="6">
                <v-list-item-title class="text-h5"> Expenses</v-list-item-title>
                <v-list-item-subtitle class="text-h6">${{ totalExpenses }}</v-list-item-subtitle>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>

        <v-col cols="12" md="3">
          <v-sheet class="pa-4" color="secondary" dark>
            <v-row>
              <v-col cols="6">
                <v-icon size="48">mdi-currency-usd</v-icon>
              </v-col>

              <v-col cols="6">
                <v-list-item-title class="text-h5">Deposits</v-list-item-title>
                <v-list-item-subtitle class="text-h6">${{ 100.0 }}</v-list-item-subtitle>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
        <v-col cols="12" md="3">
          <v-sheet class="pa-4" color="success" dark>
            <v-row>
              <v-col cols="6">
                <v-icon size="48">mdi-currency-usd</v-icon>
              </v-col>

              <v-col cols="6">
                <v-list-item-title class="text-h5">Savings</v-list-item-title>
                <v-list-item-subtitle class="text-h6">${{ 100.0 }}</v-list-item-subtitle>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
        <v-col cols="12" md="3">
          <v-sheet class="pa-4" color="error" dark>
            <v-row>
              <v-col cols="6">
                <v-icon size="48">mdi-currency-usd</v-icon>
              </v-col>

              <v-col cols="6">
                <v-list-item-title class="text-h5">Debts</v-list-item-title>
                <v-list-item-subtitle class="text-h6">${{ 100.0 }}</v-list-item-subtitle>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useExpenseStore } from '@/stores/ExpenseStore'
import { computed } from 'vue'
const expenseStore = useExpenseStore()

const totalExpenses = computed(() => {
  const result = expenseStore.allExpenses.reduce((acc, expense) => acc + expense.amount, 0)
  return result.toFixed(2)
})
</script>

<style></style>
