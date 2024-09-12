<script setup lang="ts">
    import AppShell from "@/AppShell.vue";
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
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><CodeInline>@mtfm/cli</CodeInline></td>
                                <td>A command line application for converting documents between various formats.</td>
                                <td>
                                    <a href="https://github.com/mbrt-yeah/mutaforma/tree/master/packages/cli" title="Go to @mtfm/cli package">
                                        <img src="/img/logo-github.svg" width="30" height="30" alt="Github Logo" />
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td><CodeInline>@mtfm/core</CodeInline></td>
                                <td>Shared utilities and services that are used across multiple packages.</td>
                                <td>
                                    <a href="https://github.com/mbrt-yeah/mutaforma/tree/master/packages/core" title="Go to @mtfm/core package">
                                        <img src="/img/logo-github.svg" width="30" height="30" alt="Github Logo" />
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td><CodeInline>@mtfm/core-configs</CodeInline></td>
                                <td>Default converter configurations</td>
                                <td>
                                    <a href="https://github.com/mbrt-yeah/mutaforma/tree/master/packages/core-configs" title="Go to @mtfm/core-configs package">
                                        <img src="/img/logo-github.svg" width="30" height="30" alt="Github Logo" />
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td><CodeInline>@mtfm/core-models</CodeInline></td>
                                <td>Shared models that are used across multiple packages.</td>
                                <td>
                                    <a href="https://github.com/mbrt-yeah/mutaforma/tree/master/packages/core-models" title="Go to @mtfm/core-models package">
                                        <img src="/img/logo-github.svg" width="30" height="30" alt="Github Logo" />
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td><CodeInline>@mtfm/docs</CodeInline></td>
                                <td>The Mutaforma documentation website.</td>
                                <td>
                                    <a href="https://github.com/mbrt-yeah/mutaforma/tree/master/packages/docs" title="Go to @mtfm/docs package">
                                        <img src="/img/logo-github.svg" width="30" height="30" alt="Github Logo" />
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td><CodeInline>@mtfm/docx-to-html</CodeInline></td>
                                <td>A converter which converts DOCX files to HTML</td>
                                <td>
                                    <a href="https://github.com/mbrt-yeah/mutaforma/tree/master/packages/docx-to-html" title="Go to @mtfm/docx-to-html package">
                                        <img src="/img/logo-github.svg" width="30" height="30" alt="Github Logo" />
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td><CodeInline>@mtfm/web-app</CodeInline></td>
                                <td>A web application fro converting documents between various formats.</td>
                                <td>
                                    <a href="https://github.com/mbrt-yeah/mutaforma/tree/master/packages/web-app" title="Go to @mtfm/web-app">
                                        <img src="/img/logo-github.svg" width="30" height="30" alt="Github Logo" />
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </template>
            </Page>
        </template>
    </AppShell>
</template>