<script setup lang="ts">
    import { defineProps } from "vue";
    import type { TNavSubsectionProps } from "./t-nav-subsection-props";

    const props = defineProps<TNavSubsectionProps>();
</script>

<template>
    <section class="nav-subsection">
        <header class="nav-subsection__header" v-if="props.title">
            <h6 class="nav-subsection__header__title">{{ props.title }}</h6>
        </header>
        <ul className="nav-menu">
            <slot />
        </ul>
    </section>
</template>