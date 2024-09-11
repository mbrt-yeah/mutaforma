<script setup lang="ts">
    import AppShell from "@/AppShell.vue";
    import CodeExample from "@/components/code-example/CodeExample.vue";
    import CodeInline from "@/components/CodeInline.vue";
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
                <template #title>Usage via the Command Line Interface (CLI)</template>
                <template #contents>
                    <h3>Installation</h3>
                    <p>
                        To install Mutaforma's CLI type the following in your command prompt:
                    </p>
                    <CodeExample lang="bash" code="npm i -g @mutaforma/cli" />

                    <h3>Commands</h3>

                    <h4>mtfm docx-to-html</h4>
                    <p>
                        The <CodeInline>mtfm docx-to-html</CodeInline> command is used to convert a 
                        DOCX document to an HTML document.
                    </p>
                    <table>
                        <thead>
                            <tr>
                                <th colspan="4">Options</th>
                            </tr>
                            <tr>
                                <th>Name short</th>
                                <th>Name long</th>
                                <th>Description</th>
                                <th>Mandatory</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>--i</td>
                                <td>--input</td>
                                <td>Absolute or relative path to input file</td>
                                <td>Yes</td>
                            </tr>
                            <tr>
                                <td>--o</td>
                                <td>--output</td>
                                <td>Absolute or relative path to output folder</td>
                                <td>Yes</td>
                            </tr>
                            <tr>
                                <td>--c</td>
                                <td>--config</td>
                                <td>Absolute or relative path to configuration file</td>
                                <td>No</td>
                            </tr>
                        </tbody>
                    </table>
                </template>
            </Page>
        </template>
    </AppShell>
</template>