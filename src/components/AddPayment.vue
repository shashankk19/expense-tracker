<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-credit-card"
          text="Add Payment Method"
          variant="elevated"
          v-bind="activatorProps"
          elevation="10"
        ></v-btn>
      </template>

      <v-card prepend-icon="mdi-cash" title="Payment Method">
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="4" sm="6">
              <v-text-field label="Enter Card Name*" required v-model="payment"></v-text-field>
            </v-col>
          </v-row>

          <small class="text-caption text-medium-emphasis">*indicates required field</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

          <v-btn color="primary" text="Save" variant="tonal" @click="savePayment"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePaymentStore } from '../stores/PaymentMethod.js'
import { useAuthStore } from '../stores/Auth.js'
import axios from 'axios'
const dialog = ref(false)
const payment = ref('')
const paymentStore = usePaymentStore()
const authStore = useAuthStore()
const savePayment = async () => {
  try {
    const response = await axios.post(
      'http://192.168.1.20:8090/paymentMethods/add',
      {
        paymentMethod: payment.value,
        uid: authStore.currentUserId,
      },
      {
        headers: {
          Authorization: `Bearer ${authStore.authToken}`, // Authorization header
        },
      },
    )
    paymentStore.addPaymentMethod(payment.value)
    dialog.value = false
    console.log(paymentStore.allPaymentMethods)
  } catch (error) {
    console.error(error)
  }
}
</script>
