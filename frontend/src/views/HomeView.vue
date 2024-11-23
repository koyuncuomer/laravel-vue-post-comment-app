<script setup>
import { usePostsStore } from '@/stores/posts';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router'

const { getAllPosts } = usePostsStore()
const posts = ref([])

onMounted(async () => posts.value = await getAllPosts())

const truncateBody = (body) => {
  return body.length > 100 ? body.slice(0, 100) + '...' : body;
}
</script>

<template>
  <main>
    <h1 class="title">Son Postlar</h1>

    <div v-if="posts.length > 0">
      <div v-for="post in posts" :key="post.id" class="border-l-4 border-blue-500 pl-4 mb-12">
        <div class="flex items-center mb-4">
          <div v-if="post.image" class="mr-4">
            <img :src="post.image" alt="Post Image" class="w-24 h-24 object-cover rounded-lg">
          </div>
          <div>
            <h2 class="font-bold text-3xl">{{ post.title }}</h2>
            <p class="text-xs text-slate-600 mb-4">
              {{ post.user.name }} tarafından oluşturuldu.
            </p>
            <p>
              {{ truncateBody(post.body) }}
              <RouterLink :to="{ name: 'showPost', params: { id: post.id } }" class="text-blue-500 font-bold underline">
                Görüntüle</RouterLink>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h3 class="title">Burada henüz post yok.</h3>
    </div>
  </main>
</template>
