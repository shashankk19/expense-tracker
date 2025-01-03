<template>
  <v-card-title class="d-flex align-center pe-2">
    <v-icon icon="mdi-find-replace"></v-icon> View your Expenses
    <v-spacer></v-spacer>
    <v-text-field
      v-model="search"
      density="compact"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      variant="solo-filled"
      flat
      hide-details
      single-line
    ></v-text-field>
  </v-card-title>
  <v-card class="card">
    <v-data-iterator :items="filteredExpenses" :items-per-page="itemsPerPage">
      <template v-slot:header="{ page, pageCount, prevPage, nextPage }">
        <h1 class="text-h4 font-weight-bold d-flex justify-space-between mb-4 align-center">
          <div class="text-truncate">Expenses</div>

          <div class="d-flex align-center">
            <v-btn class="me-8" variant="text" @click="onClickSeeAll">
              <span class="text-decoration-underline text-none">See all</span>
            </v-btn>

            <div class="d-inline-flex">
              <v-btn
                :disabled="page === 1"
                class="me-2"
                icon="mdi-arrow-left"
                size="small"
                variant="tonal"
                @click="prevPage"
              ></v-btn>

              <v-btn
                :disabled="page === pageCount"
                icon="mdi-arrow-right"
                size="small"
                variant="tonal"
                @click="nextPage"
              ></v-btn>
            </div>
          </div>
        </h1>
      </template>

      <template v-slot:default="{ items }">
        <v-row>
          <v-col v-for="(item, i) in items" :key="i" cols="12" sm="6" xl="3">
            <v-sheet border>
              <!-- <v-img
                :gradient="`to top right, rgba(255, 255, 255, .1), rgba(${item.raw.color}, .15)`"
                :src="images[item.raw.category]"
                height="100"
                cover
              ></v-img> -->

              <v-list-item :title="item.raw.title" density="comfortable" lines="two">
                <template v-slot:title>
                  <strong class="text-h6"> {{ item.raw.title }} </strong>
                </template>
              </v-list-item>

              <v-table class="text-caption" density="compact">
                <tbody>
                  <tr align="right">
                    <th>Amount</th>

                    <td>${{ item.raw.amount }}</td>
                  </tr>

                  <tr align="right">
                    <th>Category</th>

                    <td>{{ item.raw.category }}</td>
                  </tr>

                  <tr align="right">
                    <th>Payment Method</th>

                    <td>{{ item.raw.paymentMethod }}</td>
                  </tr>

                  <tr align="right">
                    <th>Date</th>
                    <td>{{ formatDate(item.raw.date, 'en-US') }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-sheet>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer="{ page, pageCount }">
        <v-footer class="justify-space-between text-body-2 mt-4" color="surface-variant">
          Total Expenses: {{ expenseStore.allExpenses.length }}

          <div>Page {{ page }} of {{ pageCount }}</div>
        </v-footer>
      </template>
    </v-data-iterator>
  </v-card>
</template>

<script setup>
import { onMounted } from 'vue'
import { useExpenseStore } from '../stores/ExpenseStore.js'
import { useAuthStore } from '@/stores/Auth.js'
import { ref } from 'vue'
import { images } from '@/constants/images.js'
import { computed } from 'vue'

const search = ref('')

const filteredExpenses = computed(() => {
  return expenseStore.allExpenses.filter((expense) => {
    return expense.title.toLowerCase().includes(search.value.toLowerCase())
  })
})

const expenseStore = useExpenseStore()
const authStore = useAuthStore()
const itemsPerPage = ref(8)
onMounted(async () => {
  try {
    await expenseStore.fetchExpenses(authStore.currentUserId, authStore.authToken)
  } catch (error) {
    console.log(error)
  }
})
function onClickSeeAll() {
  itemsPerPage.value = itemsPerPage.value === 8 ? expenseStore.allExpenses.length : 8
}
function formatDate(rawDate, locale) {
  const date = new Date(rawDate)
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<style scoped>
.card {
  margin: 20px;
  padding: 10px;
  border-radius: 10px;
}
</style>
