<script setup lang="ts">
    import PageFooter from "@/components/PageFooter.vue";
    import PageHeader from "@/components/PageHeader.vue";
</script>

<template>
    <div className="page-wrapper">
        <div className="sidebar-wrapper">
            <div className="sidebar">
                <PageHeader />
                <slot name="navigation" />
                <PageFooter />
            </div>
        </div>
        <main className="main-content">
            <slot name="main" />
        </main>
    </div>
</template>


