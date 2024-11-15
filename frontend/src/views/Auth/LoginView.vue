<script setup>
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { onMounted, reactive } from 'vue';

const { errors } = storeToRefs(useAuthStore())
const { login } = useAuthStore()

const formData = reactive({
  email: "",
  password: ""
})

onMounted(() => (errors.value = {}))
</script>

<template>
  <main>
    <h1 class="title">Giriş yap</h1>
    <form class="w-1/2 mx-auto space-y-6" @submit.prevent="login(formData)">
      <div>
        <input type="email" placeholder="E-mail" v-model="formData.email">
        <p v-if="errors.email" class="error">{{ errors.email[0] }}</p>
      </div>
      <div>
        <input type="password" placeholder="Parola" v-model="formData.password">
        <p v-if="errors.password" class="error">{{ errors.password[0] }}</p>
      </div>
      <button class="primary-btn">Giriş</button>
    </form>
  </main>
</template>
