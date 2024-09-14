<script setup lang="ts">
    import AppShell from "../../../_components/AppShell.vue";
    import CodeInline from "../../../_components/CodeInline.vue";
    import NavSection from "../../../_components/nav-section/NavSection.vue";
    import NavSubsection from "../../../_components/nav-subsection/NavSubsection.vue";
    import Page from "../../../_components/Page.vue";
</script>

<template>
    <AppShell>
        <template #navigation>
            <nav>
                <NavSection
                    backLinkPath="/documentation"
                    suptitle="Configuration :: DOCX to HTML"
                    title="Output"
                >
                    <NavSubsection>
                        <li><a href="#fileExtension">File extension</a></li>
                        <li><a href="#fileName">File name</a></li>
                        <li><a href="#imgFolderName">Image folder name</a></li>
                        <li><a href="#htmlEntities">HTML entities</a></li>
                        <li><a href="#prettyPrint">Pretty print</a></li>
                        <li><a href="#removingEmptyParas">Removing empty paragraphs</a></li>
                    </NavSubsection>
                </NavSection>
            </nav>
        </template>

        <template #main>
            <Page>
                <template #title>Output</template>
                <template #contents>
                    <h3 id="fileExtension">File extension</h3>
                    <p>
                        The resulting HTML document will have a default file extension of <CodeInline>.html</CodeInline>.
                        However, you can customize this by setting the <CodeInline>outDocExt</CodeInline> property in the 
                        configuration file to your preferred file extension.
                    </p>

                    <h3 id="fileName">File name</h3>
                    <p>
                        The resulting HTML document will have a default file name of <CodeInline>document</CodeInline>.
                        However, you can customize this by setting the <CodeInline>outDocFileName</CodeInline> property in the 
                        configuration file to your preferred file name.
                    </p>

                    <h3 id="imgFolderName">Image folder name</h3>
                    <p>
                        By default the images that are contained in the source document will be saved in a folder named <CodeInline>images</CodeInline>. 
                        However, you can customize this by setting the <CodeInline>outImgFolderName</CodeInline> property in the configuration file to your
                        preferred folder name.
                    </p>

                    <h3 id="htmlEntities">HTML entities</h3>
                    <p>
                        By default special characters in the resulting HTML document such as <CodeInline>&lt;</CodeInline>, <CodeInline>&gt;</CodeInline> and others,
                        are encoded using named entity references. This encoding is performed using the popular 
                        <a href="https://mths.be/he" target="_blank" title="Link to the he library">he library</a> .
                    </p>
                    <p>
                        You can fine-tune the encoding by providing options via the <CodeInline>outHtmlEntities.options</CodeInline> property in the configuration file.
                        For a list of available options see the <a href="https://mths.be/he" target="_blank" title="Link to the he library">he library documentation</a>.
                    </p>
                    <p>
                        To disable this encoding alltogether, set the <CodeInline>outHtmlEntities.enabled</CodeInline>
                        property in the configuration file to <CodeInline>false</CodeInline>.
                    </p>

                    <h3 id="prettyPrint">Pretty print</h3>
                    <p>
                        By default the source code of the resulting HTML document is pretty printed. Mutaforma uses the popular 
                        <a href="https://github.com/beautifier/js-beautify" target="_blank" title="Link to the js beautify library">js beautify</a> 
                        library to perform this operation.
                    </p>
                    <p>
                        You can fine-tune the pretty-printing by providing options via the <CodeInline>outPrettyPrint.options</CodeInline> property in your 
                        configuration file. For a list of available options see the <a href="https://github.com/beautifier/js-beautify" target="_blank" title="Link to the js beautify library">js beautify documentation</a>.
                    </p>
                    <p>
                        To disable the pretty-printing alltogether, set the <CodeInline>outPrettyPrint.enabled</CodeInline>
                        property in the configuration file to <CodeInline>false</CodeInline>.
                    </p>

                    <h3 id="removingEmptyParas">Removing empty paragraphs</h3>
                    <p>
                        By default empty paragraphs are removed. To preserve them, set the <CodeInline>outRemoveEmptyParas</CodeInline> 
                        property in the configuration file to <CodeInline>false</CodeInline>.
                    </p>
                </template>
            </Page>
        </template>
    </AppShell>
</template>