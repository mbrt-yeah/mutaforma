<script setup lang="ts">
    import AppShell from "@/AppShell.vue";
    import NavMain from "@/components/nav-main/NavMain.vue";
    import Page from "@/components/Page.vue";
</script>

<template>
    <AppShell>
        <template #navigation>
            <NavMain />
        </template>

        <template #main>
            <Page>
                <template #title>DOCX to HTML Configuration</template>
                <template #contents>
                    DOCX to HTML Configuration Index Page
                </template>
            </Page>
        </template>
    </AppShell>
</template>