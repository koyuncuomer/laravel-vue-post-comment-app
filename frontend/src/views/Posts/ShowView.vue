<script setup>
import { useAuthStore } from '@/stores/auth';
import { usePostsStore } from '@/stores/posts';
import { useCommentsStore } from '@/stores/comments';
import { onMounted, ref } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';
import CommentUpdateModal from '@/components/Comments/UpdateModal.vue';

const route = useRoute()
const { getAPost, deletePost } = usePostsStore()
const { errors } = storeToRefs(useCommentsStore())
const { getPostComments, createComment, deleteComment } = useCommentsStore()
const authStore = useAuthStore()

const post = ref(null)
const comments = ref([]);
const newComment = ref({
    name: '',
    email: '',
    body: ''
});
const showModal = ref(false);
const selectedComment = ref(null);

onMounted(async () => {
    post.value = await getAPost(route.params.id);
    comments.value = await getPostComments(route.params.id);
});

const deletePostButton = async (post) => {
    if (confirm("Silmek istediğinize emin misiniz?")) {
        deletePost(post)
    }
}

const submitComment = async () => {
    const response = await createComment(route.params.id, newComment.value);
    comments.value.unshift(response.comment);
    newComment.value = { name: '', email: '', body: '' };
};

const deleteCommentButton = async (comment) => {
    if (confirm("Silmek istediğinize emin misiniz?")) {
        const response = await deleteComment(comment)
        if (response) {
            const index = comments.value.findIndex(item => item.id === comment.id);
            if (index !== -1) {
                comments.value.splice(index, 1);
            }
        }
    }
}

const openModal = (comment) => {
    selectedComment.value = comment;
    showModal.value = true;
};

const handleCommentUpdated = (updatedComment) => {
    const index = comments.value.findIndex(comment => comment.id === updatedComment.id);
    if (index !== -1) {
        comments.value[index] = updatedComment;
    }
};

const closeModal = () => {
    showModal.value = false;
};

</script>


<template>
    <main>
        <div v-if="post">
            <div class="border-l-4 border-blue-500 pl-4 mt-6">
                <div v-if="post.image" class="mb-4">
                    <img :src="post.image" alt="Post Image" class="w-full h-auto rounded-lg">
                </div>

                <h2 class="font-bold text-3xl">{{ post.title }}</h2>
                <p class="text-xs text-slate-600 mb-4">
                    {{ post.user.name }} tarafından oluşturuldu.
                </p>
                <p>
                    {{ post.body }}
                </p>

                <div class="flex items-center gap-6 mt-6" v-if="authStore.user && authStore.user.id === post.user_id">
                    <form @submit.prevent="deletePostButton(post)">
                        <button class="text-red-500 font-bold px-2 py-1 border border-red-300">Sil</button>
                    </form>
                    <RouterLink class="text-green-500 font-bold px-2 py-1 border border-green-300"
                        :to="{ name: 'updatePost', params: { id: post.id } }">Güncelle</RouterLink>
                </div>
            </div>


            <div class="mt-12 mb-4">
                <h3 class="font-bold text-2xl">Yorumlar</h3>

                <form @submit.prevent="submitComment" class="mt-6">
                    <div>
                        <input placeholder="Ad" v-model="newComment.name" type="text" />
                        <p v-if="errors.name" class="error">{{ errors.name[0] }}</p>
                    </div>
                    <div class="mt-4">
                        <input placeholder="E-mail" v-model="newComment.email" type="email" />
                        <p v-if="errors.email" class="error">{{ errors.email[0] }}</p>
                    </div>
                    <div class="mt-4">
                        <textarea placeholder="Yorum" v-model="newComment.body" rows="4"></textarea>
                        <p v-if="errors.body" class="error">{{ errors.body[0] }}</p>
                    </div>
                    <button type="submit" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Yorum Yap</button>
                </form>

                <div class="mt-8">
                    <h4 class="font-bold text-xl">Mevcut Yorumlar</h4>
                    <div v-if="comments.length > 0">
                        <div v-for="comment in comments" :key="comment.id" class="border-t pt-4 mt-4">
                            <p><strong>{{ comment.name }}</strong> <span class="text-xs text-slate-600">({{
                                comment.email }})</span></p>
                            <p class="mt-2">{{ comment.body }}</p>
                            <div class="flex items-center gap-6 mt-2" v-if="authStore.user && authStore.user.is_admin">
                                <form @submit.prevent="deleteCommentButton(comment)">
                                    <button class="text-red-500 font-bold px-2 py-1 border border-red-300">Sil</button>
                                </form>
                                <form @submit.prevent="openModal(comment)">
                                    <button
                                        class="text-green-500 font-bold px-2 py-1 border border-green-300">Güncelle</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <p>Henüz yorum yapılmamış.</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <h3 class="title">Böyle bir post yok.</h3>
        </div>
    </main>

    <CommentUpdateModal v-if="showModal" :comment="selectedComment" :showModal="showModal"
        @updateComment="handleCommentUpdated" @closeModal="closeModal" />
</template>
