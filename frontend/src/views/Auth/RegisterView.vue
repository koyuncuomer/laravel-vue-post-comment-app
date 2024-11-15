<script setup>
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { onMounted, reactive } from 'vue';

const { errors } = storeToRefs(useAuthStore())
const { register } = useAuthStore()

const formData = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: ""
})

onMounted(() => (errors.value = {}))

</script>

<template>
  <main>
    <h1 class="title">Yeni hesap oluştur</h1>
    <form class="w-1/2 mx-auto space-y-6" @submit.prevent="register(formData)">
      <div>
        <input type="text" placeholder="İsim" v-model="formData.name">
        <p v-if="errors.name" class="error">{{ errors.name[0] }}</p>
      </div>
      <div>
        <input type="email" placeholder="E-mail" v-model="formData.email">
        <p v-if="errors.email" class="error">{{ errors.email[0] }}</p>
      </div>
      <div>
        <input type="password" placeholder="Parola" v-model="formData.password">
        <p v-if="errors.password" class="error">{{ errors.password[0] }}</p>
      </div>
      <div>
        <input type="password" placeholder="Parola" v-model="formData.password_confirmation">
      </div>
      <button class="primary-btn">Kayıt Ol</button>
    </form>
  </main>
</template>
