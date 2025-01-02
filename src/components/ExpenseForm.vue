<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-bold"
          prepend-icon="mdi-plus"
          text="Add Expense"
          variant="elevated"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card prepend-icon="mdi-plus" title="Add your expense">
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="4" sm="6">
              <v-text-field v-model="title" label="Title*" required></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field v-model="amount" label="Amount*" required></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field label="Date*" type="date" v-model="date" required></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-select
                :items="[...new Set(paymentStore.paymentMethods)]"
                v-model="paymentMethod"
                label="Payment Method*"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" sm="6">
              <v-autocomplete
                :items="[
                  'Food',
                  'Housing',
                  'Transportation',
                  'Health&Wellness',
                  'Personal care',
                  'Entertainment',
                  'Debt & savings',
                  'Shopping',
                ]"
                v-model="category"
                label="Category"
                auto-select-first
              ></v-autocomplete>
            </v-col>
          </v-row>

          <small class="text-caption text-medium-emphasis">*indicates required field</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

          <v-btn color="primary" text="Save" variant="tonal" @click="saveExpense"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { usePaymentStore } from '../stores/PaymentMethod.js'
import { v4 as uuidv4 } from 'uuid'
import { useAuthStore } from '../stores/Auth.js'
import { useExpenseStore } from '../stores/ExpenseStore.js'
import axios from 'axios'
const dialog = ref(false)
const paymentStore = usePaymentStore()
const authStore = useAuthStore()
const expenseStore = useExpenseStore()
const title = ref('')
const date = ref('')
const amount = ref('')
const category = ref('')
const paymentMethod = ref('')
const paymentMethodsList = ref('')

onMounted(async () => {
  try {
    await paymentStore.fetchPaymentMethods(authStore.currentUserId, authStore.authToken)
  } catch (error) {
    console.log(error)
  }
})
const saveExpense = async () => {
  const expense = {
    id: uuidv4(),
    title: title.value,
    date: date.value,
    amount: amount.value,
    category: category.value,
    paymentMethod: paymentMethod.value,
  }
  try {
    const response = await axios.post(
      'http://192.168.1.20:8090/expense/add',
      {
        uid: authStore.currentUserId,
        ...expense,
      },
      {
        headers: {
          Authorization: `Bearer ${authStore.authToken}`, // Authorization header
        },
      },
    )
    console.log(response.data)
    expenseStore.saveExpense(expense)
    dialog.value = false
  } catch (error) {
    console.error(error)
  }
}
</script>
