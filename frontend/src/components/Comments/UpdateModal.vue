<script setup>
import { ref } from 'vue';
import { useCommentsStore } from '@/stores/comments';
import { storeToRefs } from 'pinia';

const props = defineProps({
    comment: Object,
    showModal: Boolean,
});

const emit = defineEmits(['updateComment', 'closeModal']);
const formData = ref({ ...props.comment });

const { errors } = storeToRefs(useCommentsStore())
const commentStore = useCommentsStore();

const submitUpdate = async () => {
    const response = await commentStore.updateComment(formData.value);
    emit('updateComment', response);
    emit('closeModal');
};

</script>

<template>
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-6 rounded-lg w-[750px]">
            <h3 class="text-xl">Yorum Düzenle</h3>
            <form @submit.prevent="submitUpdate">
                <div>
                    <input placeholder="Ad" v-model="formData.name" type="text" />
                    <p v-if="errors.name" class="error">{{ errors.name[0] }}</p>
                </div>
                <div class="mt-4">
                    <input placeholder="E-mail" v-model="formData.email" type="email" />
                    <p v-if="errors.email" class="error">{{ errors.email[0] }}</p>
                </div>
                <div class="mt-4">
                    <textarea placeholder="Yorum" v-model="formData.body" rows="4"></textarea>
                    <p v-if="errors.body" class="error">{{ errors.body[0] }}</p>
                </div>

                <button type="submit" class="bg-blue-500 text-white p-2 rounded mt-2">Güncelle</button>
            </form>
            <button @click="$emit('closeModal')" class="mt-4 text-red-500">İptal</button>
        </div>
    </div>
</template>