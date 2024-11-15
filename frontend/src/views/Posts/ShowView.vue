<script setup>
import { useAuthStore } from '@/stores/auth';
import { usePostsStore } from '@/stores/posts';
import { onMounted, ref } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

const route = useRoute()
const { getAPost, deletePost } = usePostsStore()
const authStore = useAuthStore()

const post = ref(null)

onMounted(async () => post.value = await getAPost(route.params.id))

</script>


<template>
    <main>
        <div v-if="post">
            <div class="border-l-4 border-blue-500 pl-4 mt-12">
                <h2 class="font-bold text-3xl">{{ post.title }}</h2>
                <p class="text-xs text-slate-600 mb-4">
                    {{ post.user.name }} tarafından oluşturuldu.
                </p>
                <p>
                    {{ post.body }}
                </p>

                <div class="flex items-center gap-6 mt-6" v-if="authStore.user && authStore.user.id === post.user_id">
                    <form @submit.prevent="deletePost(post)">
                        <button class="text-red-500 font-bold px-2 py-1 border border-red-300">Sil</button>
                    </form>
                    <RouterLink class="text-green-500 font-bold px-2 py-1 border border-green-300"
                        :to="{ name: 'updatePost', params: { id: post.id } }">Güncelle</RouterLink>
                </div>
            </div>
        </div>
        <div v-else>
            <h3 class="title">Böyle bir post yok.</h3>
        </div>
    </main>
</template>
