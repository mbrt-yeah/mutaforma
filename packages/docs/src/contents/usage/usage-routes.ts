import type { RouteRecordRaw } from "vue-router";

import Usage from "@/contents/usage/Usage.vue";
import UsageCli from "@/contents/usage/UsageCli.vue";
import UsageLibrary from "@/contents/usage/UsageLibrary.vue";

export const UsageRoutes: RouteRecordRaw[] = [
    {
        path: "/usage",
        name: "usage",
        component: Usage,
        meta: {
            title: "Usage | Mutaforma Documentation",
            tags: {
                authors: "mbrt-yeah",
                description: "How to use Mutaforma as a command line application or as a library in your own project.",
                keywords: "documentation, mutaforma, docx, html, converter, usage"
            },
        }
    },
    {
        path: "/usage/cli",
        name: "usageCli",
        component: UsageCli,
        meta: {
            title: "Usage via the Command Line Interface (CLI) | Mutaforma Documentation",
            tags: {
                authors: "mbrt-yeah",
                description: "How to use Mutaforma as a command line application.",
                keywords: "documentation, mutaforma, docx, html, converter, usage, cli"
            },
        }
    },
    {
        path: "/usage/library",
        name: "usageLibrary",
        component: UsageLibrary,
        meta: {
            title: "Usage as a library | Mutaforma Documentation",
            tags: {
                authors: "mbrt-yeah",
                description: "How to use Mutaforma as a library in your own project.",
                keywords: "documentation, mutaforma, docx, html, converter, usage, library"
            },
        }
    },
];
