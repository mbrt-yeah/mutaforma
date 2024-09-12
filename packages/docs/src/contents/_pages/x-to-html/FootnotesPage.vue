<script setup lang="ts">
    import AppShell from "@/AppShell.vue";
    import CodeExampleIO from "@/components/code-example-io/CodeExampleIO.vue";
    import CodeInline from "@/components/CodeInline.vue";
    import NavSection from "@/components/nav-section/NavSection.vue";
    import NavSubsection from "@/components/nav-subsection/NavSubsection.vue";
    import Page from "@/components/Page.vue";

    import { FootnotesFullExample } from "@/contents/_examples/x-to-html/footnotes-full-example";

    import { 
        FootnotesHeadingCustomAttrsExample,
        FootnotesHeadingCustomContentExample,
        FootnotesHeadingCustomElementExample,
        FootnotesHeadingDefaultExample,
    } from "@/contents/_examples/x-to-html/footnotes-heading";

    import { 
        FootnotesListCustomAttrsExample,
        FootnotesListCustomElementExample,
        FootnotesListDefaultExample,
    } from "@/contents/_examples/x-to-html/footnotes-list";

    import { 
        FootnotesListItemCustomAttrsExample,
        FootnotesListItemCustomElementExample,
        FootnotesListItemDefaultExample,
    } from "@/contents/_examples/x-to-html/footnotes-list-item";

    import { 
        FootnotesWrapperCustomAttrsExample,
        FootnotesWrapperCustomElementExample,
        FootnotesWrapperDefaultExample,
    } from "@/contents/_examples/x-to-html/footnotes-wrapper";
</script>

<template>
    <AppShell>
        <template #navigation>
            <nav>
                <NavSection
                    backLinkPath="/"
                    suptitle="Configuration :: DOCX to HTML"
                    title="Footnotes"
                >
                    <NavSubsection>
                        <li><a href="#intro">Introduction</a></li>
                        <li><a href="#full-example">Full example</a></li>
                    </NavSubsection>
                    <NavSubsection title="Wrapper">
                        <li><a href="#wrapper-element-default">Default wrapper element</a></li>
                        <li><a href="#wrapper-element-custom">Custom wrapper element</a></li>
                        <li><a href="#wrapper-attrs">Custom wrapper attributes</a></li>
                        <li><a href="#wrapper-disable">Disabling the wrapper element</a></li>
                    </NavSubsection>
                    <NavSubsection title="Heading">
                        <li><a href="#heading-element-default">Default heading element</a></li>
                        <li><a href="#heading-element-custom">Custom heading element</a></li>
                        <li><a href="#heading-attrs">Custom heading attributes</a></li>
                        <li><a href="#heading-content">Custom heading content</a></li>
                        <li><a href="#heading-disable">Disabling the heading element</a></li>
                    </NavSubsection>
                    <NavSubsection title="List">
                        <li><a href="#list-element-default">Default list element</a></li>
                        <li><a href="#list-element-custom">Custom list element</a></li>
                        <li><a href="#list-attrs">Custom list attributes</a></li>
                        <li><a href="#list-disable">Disabling the list element</a></li>
                    </NavSubsection>
                    <NavSubsection title="List item">
                        <li><a href="#list-item-element-default">Default list item element</a></li>
                        <li><a href="#list-item-element-custom">Custom list item element</a></li>
                        <li><a href="#list-item-attrs">Custom list item attributes</a></li>
                        <li><a href="#list-item-disable">Disabling the list item element</a></li>
                    </NavSubsection>
                </NavSection>
            </nav>
        </template>

        <template #main>
            <Page>
                <template #title>Footnotes</template>
                <template #contents>
                    <!-- START INTRO -->
                    <h3 id="intro">Introduction</h3>
                    <p>
                        By default, the footnotes section is placed after the main content at the end of the resulting HTML document. 
                        If your document contains both footnotes and endnotes, the footnotes section will be placed before the endnotes section.
                    </p>
                    <p>
                        The footnotes section is composed of several configurable elements which can be customized to suit your specific needs.
                    </p>
                    <ul>
                        <li><a href="#wrapper">Wrapper</a></li>
                        <li><a href="#heading">Heading</a></li>
                        <li><a href="#list">Footnotes list </a></li>
                        <li><a href="#list-item">Footnotes list item</a></li>
                    </ul>
                    <!-- END INTRO -->

                    <!-- START FULL EXAMPLE -->
                    <h3 id="full-example">Full Example</h3>
                    <CodeExampleIO 
                        input-lang="json"
                        :input-code="FootnotesFullExample.from"
                        output-lang="xml"
                        :output-code="FootnotesFullExample.to"
                    />
                    <!-- END FULL EXAMPLE -->

                    <!-- START WRAPPER -->
                    <h3 id="wrapper">Wrapper</h3>

                    <h4 id="wrapper-element-default">Default wrapper element</h4>
                    <p>
                        By default a <CodeInline>div</CodeInline> element with the attribute <CodeInline>class="footnotes-section"</CodeInline>
                        will be generated as the wrapper element for the footnotes section in the resulting HTML document.
                    </p>
                    <CodeExampleIO 
                        input-lang="json"
                        :input-code="FootnotesWrapperDefaultExample.from"
                        output-lang="xml"
                        :output-code="FootnotesWrapperDefaultExample.to"
                    />

                    <h4 id="wrapper-element-custom">Custom wrapper element</h4>
                    <p>
                        You can customize the type of wrapper element to be created by modifying the value of the 
                        <CodeInline>footnotesWrapper.element.name</CodeInline> property. In the example below a <CodeInline>section</CodeInline>
                        element will be used instead of the default <CodeInline>div</CodeInline> element.
                    </p>
                    <CodeExampleIO 
                        input-lang="json"
                        :input-code="FootnotesWrapperCustomElementExample.from"
                        output-lang="xml"
                        :output-code="FootnotesWrapperCustomElementExample.to"
                    />

                    <h4 id="wrapper-attrs">Custom wrapper attributes</h4>
                    <p>
                        The <CodeInline>footnotesWrapper.element.attrs</CodeInline> option allows you to add an unlimited number of attributes to the footnotes wrapper element 
                        in the resulting HTML document.
                    </p>
                    <CodeExampleIO 
                        input-lang="json"
                        :input-code="FootnotesWrapperCustomAttrsExample.from"
                        output-lang="xml"
                        :output-code="FootnotesWrapperCustomAttrsExample.to"
                    />

                    <h4 id="wrapper-disable">Disabling the wrapper element</h4>
                    <p>
                        You can also disable the generation of the wrapper element alltogether by setting the value of the 
                        <CodeInline>footnotesWrapper.enabled</CodeInline> property to <CodeInline>false</CodeInline>.
                    </p>

                    <!-- END WRAPPER-->

                    <!-- START HEADING -->
                    <h3 id="heading">Heading</h3>

                    <h4 id="heading-element-default">Default heading element</h4>
                    <p>
                        By default a <CodeInline>h2</CodeInline> element with the text "Footnotes" and no attributes will be generated as the heading for the footnotes section
                        in the resulting HTML document.
                    </p>
                    <CodeExampleIO 
                        input-lang="json"
                        :input-code="FootnotesHeadingDefaultExample.from"
                        output-lang="xml"
                        :output-code="FootnotesHeadingDefaultExample.to"
                    />

                    <h4 id="heading-element-custom">Custom heading element</h4>
                    <p>
                        You can customize the type of heading element to be created by modifying the value of the 
                        <CodeInline>footnotesHeading.element.name</CodeInline> property. In the example below a <CodeInline>div</CodeInline>
                        element will be used instead of the default <CodeInline>h2</CodeInline> element.
                    </p>
                    <CodeExampleIO 
                        input-lang="json"
                        :input-code="FootnotesHeadingCustomElementExample.from"
                        output-lang="xml"
                        :output-code="FootnotesHeadingCustomElementExample.to"
                    />

                    <h4 id="heading-attrs">Custom heading attributes</h4>
                    <p>
                        The <CodeInline>footnotesHeading.element.attrs</CodeInline> option  allows you to add an unlimited number of attributes to the footnotes heading element 
                        in the resulting HTML document.
                    </p>
                    <CodeExampleIO 
                        input-lang="json"
                        :input-code="FootnotesHeadingCustomAttrsExample.from"
                        output-lang="xml"
                        :output-code="FootnotesHeadingCustomAttrsExample.to"
                    />

                    <h4 id="heading-content">Custom heading content</h4>
                    <p>
                        You can customize the content of the footnotes heading element by modifying the value of the <CodeInline>footnotesHeading.element.content</CodeInline> property.
                        In the example below the content of the footnotes heading element is changed to "Notes".
                    </p>
                    <CodeExampleIO 
                        input-lang="json"
                        :input-code="FootnotesHeadingCustomContentExample.from"
                        output-lang="xml"
                        :output-code="FootnotesHeadingCustomContentExample.to"
                    />

                    <h4 id="heading-disable">Disabling the heading element</h4>
                    <p>You can also disable the generation of a footnotes heading element alltogether by setting the value of the <CodeInline>footnotesHeading.enabled</CodeInline> property to <CodeInline>false</CodeInline>.</p>
                    <!-- END HEADING -->

                    <!-- START LIST -->
                    <h3 id="list">List</h3>

                    <h4 id="list-element-default">Default list element</h4>
                    <p>
                        By default an <CodeInline>ol</CodeInline> element will be generated as list element 
                        in the footnotes section of the resulting HTML document.
                    </p>
                    <CodeExampleIO 
                        input-lang="json"
                        :input-code="FootnotesListDefaultExample.from"
                        output-lang="xml"
                        :output-code="FootnotesListDefaultExample.to"
                    />

                    <h4 id="list-element-custom">Custom list element</h4>
                    <p>
                        You can customize the type of list element to be created by modifying the value of the 
                        <CodeInline>footnotesList.element.name</CodeInline> property. In the example below a <CodeInline>ol</CodeInline>
                        element will be created instead of the default <CodeInline>ul</CodeInline> element.
                    </p>
                    <CodeExampleIO 
                        input-lang="json"
                        :input-code="FootnotesListCustomElementExample.from"
                        output-lang="xml"
                        :output-code="FootnotesListCustomElementExample.to"
                    />

                    <h4 id="list-attrs">Custom list attributes</h4>
                    <p>
                        The <CodeInline>footnotesList.element.attrs</CodeInline> option allows you to add an unlimited number of attributes to the footnotes list element 
                        in the resulting HTML document.
                    </p>
                    <CodeExampleIO 
                        input-lang="json"
                        :input-code="FootnotesListCustomAttrsExample.from"
                        output-lang="xml"
                        :output-code="FootnotesListCustomAttrsExample.to"
                    />

                    <h4 id="list-disable">Disabling the list element</h4>
                    <p>
                        You can also disable the generation of the list element alltogether by setting the value of the 
                        <CodeInline>footnotesList.enabled</CodeInline> property to <CodeInline>false</CodeInline>.
                    </p>
                    <!-- END LIST -->

                    <!-- START LIST ITEM -->
                    <h3 id="list-item">List item</h3>

                    <h4 id="list-item-element-default">Default list item element</h4>
                    <p>
                        By default a <CodeInline>li</CodeInline> element will be generated as list item element 
                        in the footnotes section of the resulting HTML document.
                    </p>
                    <CodeExampleIO 
                        input-lang="json"
                        :input-code="FootnotesListItemDefaultExample.from"
                        output-lang="xml"
                        :output-code="FootnotesListItemDefaultExample.to"
                    />

                    <h4 id="list-item-element-custom">Custom list item element</h4>
                    <p>
                        You can customize the type of list item element to be created by modifying the value of the 
                        <CodeInline>footnotesListItem.element.name</CodeInline> property. In the example below a <CodeInline>div</CodeInline>
                        element will be created instead of the default <CodeInline>li</CodeInline> element.
                    </p>
                    <CodeExampleIO 
                        input-lang="json"
                        :input-code="FootnotesListItemCustomElementExample.from"
                        output-lang="xml"
                        :output-code="FootnotesListItemCustomElementExample.to"
                    />

                    <h4 id="list-item-attrs">Custom list item attributes</h4>
                    <p>
                        The <CodeInline>footnotesListItem.element.attrs</CodeInline> option allows you to add an unlimited number of attributes 
                        to the footnotes list item element in the resulting HTML document.
                    </p>
                    <CodeExampleIO 
                        input-lang="json"
                        :input-code="FootnotesListItemCustomAttrsExample.from"
                        output-lang="xml"
                        :output-code="FootnotesListItemCustomAttrsExample.to"
                    />

                    <h4 id="list-item-disable">Disabling the list item element</h4>
                    <p>
                        You can also disable the generation of the list item element alltogether by setting the value of the 
                        <CodeInline>footnotesListItem.enabled</CodeInline> property to <CodeInline>false</CodeInline>.
                    </p>
                    <!-- END LIST ITEM -->
                </template>
            </Page>
        </template>
    </AppShell>
</template>