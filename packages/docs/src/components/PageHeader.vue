<script setup lang="ts">
    import { RouterLink } from 'vue-router';
</script>

<template>
    <header className="sidebar__header">
        <RouterLink to="/">
            <img src="/img/logo.svg" width="60" height="60" className="sidebar__header__logo" />
        </RouterLink>
        <h1 className="sidebar__header__title">
            Mutaforma Docs
        </h1>
    </header>
</template>