<script setup lang="ts">
    import AppShell from "@/AppShell.vue";
    import MainNav from "@/components/nav-main/NavMain.vue";
    import Page from "@/components/Page.vue";
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