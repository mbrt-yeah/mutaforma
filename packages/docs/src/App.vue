<script setup type="ts">
    import { RouterView } from "vue-router";
    import "highlight.js/styles/dark.css";
    import hljs from "highlight.js/lib/core";
    import xml from "highlight.js/lib/languages/xml";
    import json from "highlight.js/lib/languages/json";
    import javascript from "highlight.js/lib/languages/javascript";
    import typescript from "highlight.js/lib/languages/typescript";
    hljs.registerLanguage("xml", xml);
    hljs.registerLanguage("json", json);
    hljs.registerLanguage("javascript", javascript);
    hljs.registerLanguage("typescript", typescript);
</script>

<template>
    <RouterView />
</template>