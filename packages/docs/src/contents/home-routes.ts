import type { RouteRecordRaw } from "vue-router";

import Home from "@/contents/Home.vue";

export const HomeRoutes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "home",
        component: Home,
        meta: {
            title: "Mutaforma Documentation",
            tags: {
                authors: "mbrt-yeah",
                description: "Welcome to the Mutaforma documentation. Mutaforma is a document conversion tool that enables the conversion of DOCX files to HTML, with more formats to come.",
                keywords: "documentation, mutaforma, docx, html, converter"
            },
        }
    },
];
