<script setup lang="ts">
    import { defineProps } from "vue";
    
    import CodeExample from "../code-example/CodeExample.vue";
    import type { TCodeExampleIOProps } from "./t-code-example-io-props";

    const props = defineProps<TCodeExampleIOProps>();
</script>

<template>
    <div class="code-example-io">
        <CodeExample :lang="props.inputLang" :code="props.inputCode" />
        <div class="code-example-io__separator">▸</div>
        <CodeExample :lang="props.outputLang" :code="props.outputCode" />
    </div>
</template>