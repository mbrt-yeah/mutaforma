<script setup lang="ts">
    import AppShell from "@/AppShell.vue";
    import CodeExample from "@/components/code-example/CodeExample.vue";
    import CodeExampleIO from "@/components/code-example-io/CodeExampleIO.vue";
    import CodeInline from "@/components/CodeInline.vue";
    import NavSection from "@/components/nav-section/NavSection.vue";
    import NavSubsection from "@/components/nav-subsection/NavSubsection.vue";
    import Page from "@/components/Page.vue";

    import {
        MappingsArrayExample,
        MappingsOneToOneExample,
        MappingsManyToOneExample
    } from "@/contents/_examples/x-to-html/mappings";
</script>

<template>
    <AppShell>
        <template #navigation>
            <nav>
                <NavSection
                    backLinkPath="/"
                    suptitle="Configuration :: DOCX to HTML"
                    title="Mappings"
                >
                    <NavSubsection>
                        <li><a href="#intro">Introduction</a></li>
                        <li><a href="#manyToOne">Many to one mapping</a></li>
                    </NavSubsection>
                </NavSection>
            </nav>
        </template>

        <template #main>
            <Page>
                <template #title>Mappings</template>
                <template #contents>
                    <h3 id="intro">Introduction</h3>
                    <p>
                        Mappings can be defined using the <CodeInline>mappings</CodeInline> property
                        in the configuration file.
                    </p>
                    <CodeExample lang="json" :code="MappingsArrayExample" />
                    <p>
                        A mapping specifies how a content object with a specific style (e.g., paragraph or heading) in the source document 
                        is to be converted into a HTML element.
                    </p>
                    <p>
                        For instance the mapping below specifies that all content objects with the style "Heading 1" in a source document 
                        are to be converted to <CodeInline>h1</CodeInline> HTML elements with the attribute <CodeInline>class="heading-1"</CodeInline>.
                    </p>
                    <CodeExampleIO 
                        input-lang="json"
                        :input-code="MappingsOneToOneExample.from"
                        output-lang="html"
                        :output-code="MappingsOneToOneExample.to"
                    />
                    <p>
                        The <CodeInline>names</CodeInline> property accepts one ore more style names as they appear in your word processor's
                        graphical user interface.
                    </p>
                    <p>
                        The <CodeInline>element</CodeInline> property defines the HTML element to which the content object with the styles defined
                        in <CodeInline>names</CodeInline> will be converted. You can define the elements's name using the <CodeInline>element.name</CodeInline>
                        property and optionally add attributes using the <CodeInline>element.attrs</CodeInline> property.
                    </p>

                    <h3 id="manyToOne">Mapping many styles to one HTML element</h3>
                    <p>
                        As previously mentioned the <CodeInline>names</CodeInline> property of a mapping accepts more than one style name,
                        allowing you to map many styles to a single HTML element. For example, the following mappings causes all content 
                        objects with the styles "Heading 1" or "Heading 2" to map to a single <CodeInline>h1</CodeInline> HTML element without any attributes.
                    </p>
                    <CodeExampleIO 
                        input-lang="json"
                        :input-code="MappingsManyToOneExample.from"
                        output-lang="html"
                        :output-code="MappingsManyToOneExample.to"
                    />
                </template>
            </Page>
        </template>
    </AppShell>
</template>