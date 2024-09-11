import type { RouteRecordRaw } from "vue-router";

import Usage from "@/contents/usage/Usage.vue";
import UsageCli from "@/contents/usage/UsageCli.vue";
import UsageLibrary from "@/contents/usage/UsageLibrary.vue";

export const UsageRoutes: RouteRecordRaw[] = [
    {
        path: "/usage",
        name: "usage",
        component: Usage,
    },
    {
        path: "/usage/cli",
        name: "usageCli",
        component: UsageCli,
    },
    {
        path: "/usage/library",
        name: "usageLibrary",
        component: UsageLibrary,
    },
];
