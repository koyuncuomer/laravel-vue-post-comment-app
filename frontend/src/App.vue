<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
    <nav>
      <RouterLink class="nav-link" :to="{ name: 'home' }">Anasayfa</RouterLink>

    </nav>

  </header>

  <RouterView />
</template>
