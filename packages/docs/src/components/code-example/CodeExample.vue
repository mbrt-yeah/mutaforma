<script setup lang="ts">
    import { defineProps } from "vue";
    import type { TCodeExampleProps } from "./t-code-example-props";

    const props = defineProps<TCodeExampleProps>();
</script>

<script lang="ts">
    import hljs from 'highlight.js/lib/common';
    import hljsVuePlugin from "@highlightjs/vue-plugin";

    export default {
        components: {
            highlightjs: hljsVuePlugin.component
        }
    }
</script>

<template>
    <pre class="code-example"><code><highlightjs :language="props.lang" :code="props.code" /></code></pre>
</template>