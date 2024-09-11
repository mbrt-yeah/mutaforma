<script setup lang="ts">
    import CodeExample from "@/components/code-example/CodeExample.vue";
    import { defineProps } from "vue";
    import type { TImgExampleIOProps } from "./t-img-example-io-props";

    const props = defineProps<TImgExampleIOProps>();
</script>

<template>
    <div class="img-example-io">
        <figure>
            <slot name="input" />
            <figcaption v-if="props.inputImgCaption">{{ props.inputImgCaption }}</figcaption>
        </figure>
        <div class="img-example-io__separator">▸</div>
        <CodeExample :lang="props.outputLang" :code="props.outputCode" />
    </div>
</template>