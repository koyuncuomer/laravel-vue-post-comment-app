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

        async createPost(data) {
            try {
                const formData = new FormData();
                formData.append("title", data.title);
                formData.append("body", data.body);
                if (data.image) {
                    formData.append("image", data.image);
                }

                const response = await axios.post("/api/posts", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
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

        async updatePost(post, data) {
            const authStore = useAuthStore();
            if (authStore.user.id === post.user_id) {
                try {
                    const formData = new FormData();
                    formData.append("title", data.title);
                    formData.append("body", data.body);
                    if (data.image) {
                        formData.append("image", data.image);
                    }

                    // PUT ile FormData kullanarak istek attığımda laravel tarafında alanlara erişemiyorum bu yüzden isteği POST olarak atıyorum
                    // ve FormData içerisinde _method: put olacak şekilde alan tanımlıyorum.
                    formData.append("_method", "put");
                    const response = await axios.post(
                        `/api/posts/${post.id}`,
                        formData,
                        { headers: { "Content-Type": "multipart/form-data" } }
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
