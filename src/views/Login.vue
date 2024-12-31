<template>
  <v-app>
    <v-card width="400" class="mx-auto mt-10">
      <v-card-title>
        <h1 class="diaply-1 text-center">Login</h1>
      </v-card-title>
      <v-card-text
        ><v-form>
          <v-text-field label="Username" prepend-icon="mdi-account" v-model="username" />
          <v-text-field
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            v-model="password"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="primary" variant="outlined" @click="login">Login</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="secondary" variant="outlined">Register</v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../stores/Auth.js'
import { useRouter } from 'vue-router'
const username = ref('')
const password = ref('')
const showPassword = ref(false)
const authStore = useAuthStore()
const router = useRouter()
// login
const login = async () => {
  const req = {
    username: username.value,
    password: password.value,
  }
  console.log(req)
  try {
    const response = await axios.post('http://192.168.1.20:8090/login', req)
    console.log(response.data)
    username.value = ''
    password.value = ''
    const user = {
      name: response.data.fullname,
      email: response.data.email,
    }
    authStore.setToken(response.data.token)
    authStore.setUser(user)
    router.push('/home')
  } catch (error) {
    console.error(error)
  }
}
</script>
