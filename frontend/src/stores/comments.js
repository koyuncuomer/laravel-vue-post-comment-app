import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./auth";

export const useCommentsStore = defineStore("commentsStore", {
    state: () => {
        return {
            errors: {},
        };
    },
    getters: {},
    actions: {
        async getPostComments(postId) {
            try {
                const response = await axios.get(
                    `/api/posts/${postId}/comments`
                );
                return response.data;
            } catch (error) {
                throw error.response.data;
            }
        },

        async createComment(postId, comment) {
            try {
                const response = await axios.post(
                    `/api/posts/${postId}/comments`,
                    comment
                );
                return response.data;
            } catch (error) {
                this.errors = error.response.data.errors;
                throw error.response.data;
            }
        },

        async deleteComment(comment) {
            const authStore = useAuthStore();
            if (authStore.user.is_admin) {
                try {
                    const response = await axios.delete(
                        `/api/comments/${comment.id}`
                    );
                    return response.data;
                } catch (error) {
                    throw error.response.data;
                }
            }
        },

        async updateComment(formData) {
            const authStore = useAuthStore();
            if (authStore.user.is_admin) {
                try {
                    const response = await axios.put(
                        `/api/comments/${formData.id}`,
                        formData
                    );
                    return response.data;
                } catch (error) {
                    this.errors = error.response.data.errors;
                    throw error.response.data;
                }
            }
        },
    },
});
