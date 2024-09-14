<script setup lang="ts">
    import { defineProps } from "vue";
    import type { TCodeExampleProps } from "./t-code-example-props";
    import hljs from 'highlight.js/lib/core';

    const props = defineProps<TCodeExampleProps>();
</script>

<template>
    <pre class="code-example"><code v-html="hljs.highlight(props.code, { language: props.lang }).value" /></pre>
</template>