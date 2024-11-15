import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("authStore", {
    state: () => {
        return {
            user: null,
            errors: {},
        };
    },
    getters: {
        isLoggedIn: (state) => {
            return !!state.user; //booleana cast ediliyor(çevriliyor)
        },
    },
    actions: {
        async getUser() {
            const token = localStorage.getItem("token");
            if (token) {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${token}`;
                try {
                    const response = await axios.get("/api/user");
                    this.user = response.data;
                } catch (error) {
                    throw error.response.data;
                }
            }
        },

        async register(newUserData) {
            try {
                const response = await axios.post("/api/register", newUserData);
                this.router.push({ name: "login" });
                return response.data;
            } catch (error) {
                this.errors = error.response.data.errors;
                throw error.response.data;
            }
        },

        async login(userData) {
            try {
                const response = await axios.post("/api/login", userData);

                if (response.data.errors) {
                    this.errors = response.data.errors;
                } else {
                    const token = response.data.token;
                    this.user = response.data.user;

                    // localStorage.setItem("user", JSON.stringify(response.data));
                    localStorage.setItem("token", token);
                    axios.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${token}`;

                    this.router.push({ name: "home" });
                }
            } catch (error) {
                this.errors = error.response.data.errors;
                throw error.response.data;
            }
        },

        async logout() {
            try {
                const response = await axios.post("/api/logout");
                // console.log("logout", response.data);
                this.user = null;
                this.errors = {};
                localStorage.removeItem("token");
                delete axios.defaults.headers.common["Authorization"];

                this.router.push({ name: "home" });
            } catch (error) {
                throw error.response.data;
            }
        },
    },
});
