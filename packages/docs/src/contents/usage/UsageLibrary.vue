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
                <template #title>Usage as a library</template>
                <template #contents>
                    <p>
                        Mutaforma is a collection of independent Node.js modules that can be easily integrated into your own project. 
                        For more information, please refer to the individual module documentation.
                    </p>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>core</td>
                                <td>This module provides core functionalities that are shared across various modules within the Mutaforma ecosystem.</td>
                                <td><a href="https://github.com/mutaforma/core">https://github.com/mutaforma/core</a></td>
                            </tr>
                            <tr>
                                <td>core-models</td>
                                <td>This module comprises all model classes utilized across various Mutaforma modules.</td>
                                <td><a href="https://github.com/mutaforma/core">https://github.com/mutaforma/core</a></td>
                            </tr>
                            <tr>
                                <td>docx-to-html</td>
                                <td>This module provides functionality for converting DOCX documents to HTML format.</td>
                                <td><a href="https://github.com/mutaforma/core">https://github.com/mutaforma/core</a></td>
                            </tr>
                        </tbody>
                    </table>
                </template>
            </Page>
        </template>
    </AppShell>
</template>