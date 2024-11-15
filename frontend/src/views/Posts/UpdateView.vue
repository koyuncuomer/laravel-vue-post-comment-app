<script setup>
import { useAuthStore } from '@/stores/auth';
import { usePostsStore } from '@/stores/posts';
import { storeToRefs } from 'pinia';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const formData = reactive({
    title: "",
    body: ""
})

const route = useRoute()
const router = useRouter()
const { user } = storeToRefs(useAuthStore())
const { errors } = storeToRefs(usePostsStore())
const { getAPost, updatePost } = usePostsStore()

const post = ref(null)

onMounted(async () => {
    post.value = await getAPost(route.params.id)

    if (user.value.id !== post.value.user_id) {
        router.push({ name: "home" })
    } else {
        formData.title = post.value.title
        formData.body = post.value.body
    }
})
</script>

<template>
    <main>
        <h1 class="title">Postu düzenle</h1>

        <form class="w-1/2 mx-auto space-y-6" @submit.prevent="updatePost(post, formData)">
            <div>
                <input type="text" placeholder="Başlık" v-model="formData.title" />
                <p v-if="errors.title" class="error">{{ errors.title[0] }}</p>
            </div>
            <div>
                <textarea rows="6" placeholder="İçerik" v-model="formData.body"></textarea>
                <p v-if="errors.body" class="error">{{ errors.body[0] }}</p>
            </div>
            <button class="primary-btn">Güncelle</button>
        </form>

    </main>
</template>
