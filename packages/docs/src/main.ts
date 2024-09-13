import { createApp } from "vue";
import { createRouter, createWebHistory, type Router } from "vue-router";

import App from "./App.vue";
import Home from "@/contents/Home.vue"

import { ConfigurationRoutes } from "@/contents/configuration/configuration-routes";
import { HomeRoutes } from "@/contents/home-routes";
import { UsageRoutes } from "@/contents/usage/usage-routes";


const router: Router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...HomeRoutes,
        ...UsageRoutes,
        ...ConfigurationRoutes
    ]
});

router.beforeEach((to, from) => {
    document.title = to.meta.title;

    const head = document.querySelector("head")
    
    if (!head)
        return;

    for (const [tagName, tagContent] of Object.entries(to.meta.tags)) {
        const metaTagExisting = head.querySelector(`meta[name="${tagName}"]`);

        if (metaTagExisting) {
            metaTagExisting.setAttribute("content", tagContent as string);
            continue;
        }

        const metaTagNew = document.createElement("meta");
        metaTagNew.setAttribute("name", tagName);
        metaTagNew.setAttribute("content", tagContent as string);
        head.appendChild(metaTagNew);
    }
});

const app = createApp(App);
app.use(router);
app.mount("#app");