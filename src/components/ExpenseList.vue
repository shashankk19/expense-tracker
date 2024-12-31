<template>
  <li v-for="expense in expenseList" :key="expense.id" class="expense-item">
    <p><strong>Name:</strong> {{ expense.name }}</p>
    <p><strong>Amount:</strong> ${{ expense.amount }}</p>
    <p><strong>Date:</strong> {{ expense.date }}</p>
    <p><strong>Category:</strong> {{ expense.category }}</p>
    <p><strong>Payment Method:</strong> {{ expense.paymentMethod }}</p>
  </li>
</template>

<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  expenseList: Array,
})
onMounted(() => {
  console.log(props.expenseList)
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
