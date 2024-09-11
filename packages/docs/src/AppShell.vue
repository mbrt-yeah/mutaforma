<script setup lang="ts">
    import PageHeader from "@/components/PageHeader.vue";
</script>

<template>
    <div className="page-wrapper">
        <div className="sidebar">
            <PageHeader />
            <slot name="navigation" />
        </div>
        <main className="main-content">
            <slot name="main" />
        </main>
    </div>
</template>


