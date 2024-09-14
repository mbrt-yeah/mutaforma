<script setup lang="ts">
    import { defineProps } from "vue";
    import type { TNavSectionProps } from "./t-nav-section-props";

    const props = defineProps<TNavSectionProps>();
</script>

<template>
    <section className="nav-section">
        <header className="nav-section__header">
            <a v-if="props.backLinkPath" class="nav-section__header__back-link" :href="props.backLinkPath">&#9664;</a>
            <span v-if="props.suptitle" class="nav-section__header__suptitle">Configuration :: DOCX to HTML</span>
            <h5 className="nav-section__header__title">{{ props.title }}</h5>
        </header>
        <slot />
    </section>
</template>