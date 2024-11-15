<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore()

</script>

<template>
  <header>
    <nav>
      <RouterLink class="nav-link" :to="{ name: 'home' }">Anasayfa</RouterLink>

      <div class="flex items-center space-x-6" v-if="authStore.user">
        <p class="text-sm text-slate-300">Hoşgeldin {{ authStore.user.name }}</p>
        <RouterLink class="nav-link" :to="{ name: 'createPost' }">Yeni Post</RouterLink>
        <form @submit.prevent="authStore.logout">
          <button class="nav-link">Çıkış</button>
        </form>
      </div>

      <div class="space-x-6" v-else>
        <RouterLink class="nav-link" :to="{ name: 'register' }">Kayıt Ol</RouterLink>
        <RouterLink class="nav-link" :to="{ name: 'login' }">Giriş Yap</RouterLink>
      </div>
    </nav>

  </header>

  <RouterView />
</template>
