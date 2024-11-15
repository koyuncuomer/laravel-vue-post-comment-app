import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./auth";

export const usePostsStore = defineStore("postsStore", {
    state: () => {
        return {
            errors: {},
        };
    },
    getters: {},
    actions: {
        async getAllPosts() {
            try {
                const response = await axios.get("/api/posts");
                return response.data;
            } catch (error) {
                throw error.response.data;
            }
        },

        async getAPost(postId) {
            try {
                const response = await axios.get(`/api/posts/${postId}`);
                return response.data.post;
            } catch (error) {
                throw error.response.data;
            }
        },

        async createPost(formData) {
            try {
                const response = await axios.post("/api/posts", formData);
                this.errors = {};
                this.router.push({ name: "home" });
                return response.data;
            } catch (error) {
                this.errors = error.response.data.errors;
                throw error.response.data;
            }
        },

        async deletePost(post) {
            const authStore = useAuthStore();
            if (authStore.user.id === post.user_id) {
                try {
                    const response = await axios.delete(
                        `/api/posts/${post.id}`
                    );
                    if (response.status === 200) {
                        this.router.push({ name: "home" });
                    }
                } catch (error) {
                    throw error.response.data;
                }
            }
        },

        async updatePost(post, formData) {
            const authStore = useAuthStore();
            if (authStore.user.id === post.user_id) {
                try {
                    const response = await axios.put(
                        `/api/posts/${post.id}`,
                        formData
                    );
                    this.errors = {};
                    this.router.push({ name: "home" });
                } catch (error) {
                    this.errors = error.response.data.errors;
                    throw error.response.data;
                }
            }
        },
    },
});
