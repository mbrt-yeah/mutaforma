import { createApp } from "vue";
import { createRouter, createWebHistory, type Router } from "vue-router";

import App from "./App.vue";
import Home from "@/contents/Home.vue"

import { UsageRoutes } from "@/contents/usage/usage-routes";
import { ConfigurationRoutes } from "@/contents/configuration/configuration-routes";

const router: Router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        ...UsageRoutes,
        ...ConfigurationRoutes
    ]
});

const app = createApp(App);
app.use(router);
app.mount("#app");
