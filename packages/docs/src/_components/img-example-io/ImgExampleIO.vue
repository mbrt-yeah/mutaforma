<script setup lang="ts">
    import { defineProps } from "vue";

    import CodeExample from "../code-example/CodeExample.vue";
    import type { TImgExampleIOProps } from "./t-img-example-io-props";

    const props = defineProps<TImgExampleIOProps>();
</script>

<template>
    <div class="img-example-io">
        <figure>
            <img :src="props.inputImgSrc" :alt="props.inputImgAlt" :width="props.inputImgWidth" :height="props.inputImgHeight" />
            <figcaption v-if="props.inputImgCaption">{{ props.inputImgCaption }}</figcaption>
        </figure>
        <div class="img-example-io__separator">▸</div>
        <CodeExample :lang="props.outputLang" :code="props.outputCode" />
    </div>
</template>