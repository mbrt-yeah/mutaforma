import type { RouteRecordRaw } from "vue-router";

import Configuration from "@/contents/configuration/Configuration.vue";
import ConfigurationDocxToHtml from "@/contents/configuration/docx-to-html/ConfigurationDocxToHtml.vue"
import ConfigurationDocxToHtmlEndnotes from "@/contents/configuration/docx-to-html/ConfigurationDocxToHtmlEndnotes.vue";
import ConfigurationDocxToHtmlFootnotes from "@/contents/configuration/docx-to-html/ConfigurationDocxToHtmlFootnotes.vue";
import ConfigurationDocxToHtmlMappings from "@/contents/configuration/docx-to-html/ConfigurationDocxToHtmlMappings.vue";
import ConfigurationDocxToHtmlOutput from "@/contents/configuration/docx-to-html/ConfigurationDocxToHtmlOutput.vue";

export const ConfigurationRoutes: RouteRecordRaw[] = [
    {
        path: "/configuration",
        name: "configuration",
        component: Configuration
    },
    {
        path: "/configuration/docx-to-html",
        name: "configurationDocxToHtml",
        component: ConfigurationDocxToHtml
    },
    {
        path: "/configuration/docx-to-html/endnotes",
        name: "configurationDocxToHtmlEndnotes",
        component: ConfigurationDocxToHtmlEndnotes
    },
    {
        path: "/configuration/docx-to-html/footnotes",
        name: "configurationDocxToHtmlFootnotes",
        component: ConfigurationDocxToHtmlFootnotes
    },
    {
        path: "/configuration/docx-to-html/mappings",
        name: "configurationDocxToHtmlMappings",
        component: ConfigurationDocxToHtmlMappings
    },
    {
        path: "/configuration/docx-to-html/output",
        name: "configurationDocxToHtmlOutput",
        component: ConfigurationDocxToHtmlOutput
    }
];
