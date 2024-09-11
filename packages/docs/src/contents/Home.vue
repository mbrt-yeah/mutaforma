<script setup lang="ts">
    import AppShell from "@/AppShell.vue";
    import CodeInline from "@/components/CodeInline.vue";
    import ImgExampleIO from "@/components/img-example-io/ImgExampleIO.vue";
    import NavMain from "@/components/nav-main/NavMain.vue";
    import Page from "@/components/Page.vue";

    import { GeneralHtmlOutput } from "./_examples/x-to-html/general-html-output";
</script>

<template>
    <AppShell>
        <template #navigation>
            <NavMain />
        </template>

        <template #main>
            <Page>
                <template #title>Home</template>
                <template #contents>
                    <h3>What Mutaforma does</h3>
                    <p>
                        Mutaforma is a document conversion tool that currently supports the conversion of DOCX files to HTML.
                    </p>
                    <p>
                        Mutaforma's conversion process relies heavily on the semantic information present in the source document. 
                        For documents created with word processors like Microsoft Word or LibreOffice Writer, this semantic information 
                        is typically applied through the use of styles, which convey meaning and structure to the content.
                    </p>
                    <p>
                        For example, when converting a DOCX document to HTML using Mutaforma, all paragraphs with the applied style "Normal" 
                        will be transformed into <CodeInline>p</CodeInline> elements and all paragraphs with the style "Heading 1" to
                        <CodeInline>h1</CodeInline> elements.
                    </p>
                    <ImgExampleIO output-lang="html" :output-code="GeneralHtmlOutput">
                        <template #input><img src="/img/examples/word-document.png" width="600" height="408" /></template>
                    </ImgExampleIO>

                    <h3>What Mutaforma does not</h3>
                    <h4>
                        No preservation of stylistic aspects
                    </h4>
                    <p>
                        Mutaforma does not preserve the visual styling of the source document, including font families, font sizes, 
                        colors, margins, paddings, and other layout-specific details.
                    </p>
                    <h4>
                        No roundtrip conversion
                    </h4>
                    <p>
                        Once a document has been converted, it cannot be reverted to its original format. This is because Mutaforma
                        prioritizes preserving the document's semantic information, rather than its original layout or formatting.
                    </p>
                </template>
            </Page>
        </template>
    </AppShell>
</template>


