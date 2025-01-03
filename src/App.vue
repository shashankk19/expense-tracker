<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import ExpenseLayout from './views/ExpenseLayout.vue'
</script>

<style>
body {
  background-color: #f5f5f5;
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 20px;
  box-sizing: border-box;
}
</style>
