<script setup lang="ts">
    import PageFooter from "./PageFooter.vue";
    import PageHeader from "./PageHeader.vue";
</script>

<template>
    <html>
        <head>
            <link rel="prefetch" href="/css/style.css" />
        </head>
        <body>
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
        </body>
    </html>
</template>


