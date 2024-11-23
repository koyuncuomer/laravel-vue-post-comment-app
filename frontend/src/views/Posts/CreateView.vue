<script setup>
import { usePostsStore } from '@/stores/posts';
import { storeToRefs } from 'pinia';
import { reactive } from 'vue';

const formData = reactive({
  title: "",
  body: "",
  image: null
})

const { errors } = storeToRefs(usePostsStore())
const { createPost } = usePostsStore()

const handleImageChange = (event) => {
  formData.image = event.target.files[0];
};
</script>

<template>
  <main>
    <h1 class="title">Yeni post oluştur</h1>

    <form class="w-1/2 mx-auto space-y-6" @submit.prevent="createPost(formData)">
      <div>
        <input type="text" placeholder="Başlık" v-model="formData.title" />
        <p v-if="errors.title" class="error">{{ errors.title[0] }}</p>
      </div>
      <div>
        <textarea rows="6" placeholder="İçerik" v-model="formData.body"></textarea>
        <p v-if="errors.body" class="error">{{ errors.body[0] }}</p>
      </div>
      <div>
        <input @change="handleImageChange" type="file" accept="image/*" />
      </div>
      <button class="primary-btn">Oluştur</button>
    </form>

  </main>
</template>
