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
        component: Configuration,
        meta: {
            title: "Configuration | Mutaforma Documentation",
            tags: {
                authors: "mbrt-yeah",
                description: "How to configure a converter.",
                keywords: "documentation, mutaforma, docx, html, converter, configuration"
            },
        }
    },
    {
        path: "/configuration/docx-to-html",
        name: "configurationDocxToHtml",
        component: ConfigurationDocxToHtml,
        meta: {
            title: "DOCX to HTML configuration | Mutaforma Documentation",
            tags: {
                authors: "mbrt-yeah",
                description: "How to configure a DOCX to HTML converter.",
                keywords: "documentation, mutaforma, docx, html, converter, configuration"
            },
        }
    },
    {
        path: "/configuration/docx-to-html/endnotes",
        name: "configurationDocxToHtmlEndnotes",
        component: ConfigurationDocxToHtmlEndnotes,
        meta: {
            title: "Endnotes | DOCX to HTML configuration | Mutaforma Documentation",
            tags: {
                authors: "mbrt-yeah",
                description: "How to configure the endnotes conversion of a DOCX to HTML converter.",
                keywords: "documentation, mutaforma, docx, html, converter, configuration, endnotes"
            },
        }
    },
    {
        path: "/configuration/docx-to-html/footnotes",
        name: "configurationDocxToHtmlFootnotes",
        component: ConfigurationDocxToHtmlFootnotes,
        meta: {
            title: "Footnotes | DOCX to HTML configuration | Mutaforma Documentation",
            tags: {
                authors: "mbrt-yeah",
                description: "How to configure the footnotes conversion of a DOCX to HTML converter.",
                keywords: "documentation, mutaforma, docx, html, converter, configuration, footnotes"
            },
        }
    },
    {
        path: "/configuration/docx-to-html/mappings",
        name: "configurationDocxToHtmlMappings",
        component: ConfigurationDocxToHtmlMappings,
        meta: {
            title: "Mappings | DOCX to HTML configuration | Mutaforma Documentation",
            tags: {
                authors: "mbrt-yeah",
                description: "How to configure the mappings of a DOCX to HTML converter.",
                keywords: "documentation, mutaforma, docx, html, converter, configuration, mappings"
            },
        }
    },
    {
        path: "/configuration/docx-to-html/output",
        name: "configurationDocxToHtmlOutput",
        component: ConfigurationDocxToHtmlOutput,
        meta: {
            title: "Output | DOCX to HTML configuration | Mutaforma Documentation",
            tags: {
                authors: "mbrt-yeah",
                description: "How to configure the output of a DOCX to HTML converter.",
                keywords: "documentation, mutaforma, docx, html, converter, configuration, output"
            },
        }
    }
];
