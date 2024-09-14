<script setup lang="ts">
    import AppShell from "../../_components/AppShell.vue";
    import Page from "../../_components/Page.vue";
</script>

<template>
    <AppShell>
        <template #navigation>
            <MainNav />
        </template>

        <template #main>
            <Page>
                <template #title>Usage</template>
                <template #contents>
                    Usage Index Page
                </template>
            </Page>
        </template>
    </AppShell>
</template>