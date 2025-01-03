<template>
  <expense-banner></expense-banner>
  <div class="container">
    <expense-form></expense-form>
    <add-payment></add-payment>
  </div>
  <expense-list></expense-list>
</template>

<script setup>
import ExpenseBanner from '@/components/ExpenseBanner.vue'
import AddPayment from '../components/AddPayment.vue'
import ExpenseForm from '@/components/ExpenseForm.vue'
import ExpenseList from '@/components/ExpenseList.vue'
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
