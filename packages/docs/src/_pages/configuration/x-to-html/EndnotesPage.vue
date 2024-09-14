<script setup lang="ts">
    import AppShell from "../../../_components/AppShell.vue";
    import CodeExampleIO from "../../../_components/code-example-io/CodeExampleIO.vue";
    import CodeInline from "../../../_components/CodeInline.vue";
    import NavSection from "../../../_components/nav-section/NavSection.vue";
    import NavSubsection from "../../../_components/nav-subsection/NavSubsection.vue";
    import Page from "../../../_components/Page.vue";

    import { EndnotesFullExample } from "../../../_code-examples/x-to-html/endnotes-full-example";

    import { 
        EndnotesHeadingCustomAttrsExample,
        EndnotesHeadingCustomContentExample,
        EndnotesHeadingCustomElementExample,
        EndnotesHeadingDefaultExample,
    } from "../../../_code-examples/x-to-html/endnotes-heading";

    import { 
        EndnotesListCustomAttrsExample,
        EndnotesListCustomElementExample,
        EndnotesListDefaultExample,
    } from "../../../_code-examples/x-to-html/endnotes-list";

    import { 
        EndnotesListItemCustomAttrsExample,
        EndnotesListItemCustomElementExample,
        EndnotesListItemDefaultExample,
    } from "../../../_code-examples/x-to-html/endnotes-list-item";

    import { 
        EndnotesWrapperCustomAttrsExample,
        EndnotesWrapperCustomElementExample,
        EndnotesWrapperDefaultExample,
    } from "../../../_code-examples/x-to-html/endnotes-wrapper";
</script>

<template>
    <AppShell>
        <template #navigation>
            <nav>
                <NavSection
                    backLinkPath="/documentation"
                    suptitle="Configuration :: DOCX to HTML"
                    title="Endnotes"
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
                <template #title>Endnotes</template>
                <template #contents>
                    <!-- START INTRO -->
                    <h3 id="intro">Introduction</h3>
                    <p>
                        By default, the endnotes section is placed after the main content at the end of the resulting HTML document. 
                        If your document contains both endnotes and endnotes, the endnotes section will be placed after the footnotes section.
                    </p>
                    <p>
                        The endnotes section is composed of several configurable elements which can be customized to suit your specific needs.
                    </p>
                    <ul>
                        <li><a href="#wrapper">Wrapper</a></li>
                        <li><a href="#heading">Heading</a></li>
                        <li><a href="#list">Endnotes list </a></li>
                        <li><a href="#list-item">Endnotes list item</a></li>
                    </ul>
                    <!-- END INTRO -->

                    <!-- START FULL EXAMPLE -->
                    <h3 id="full-example">Full Example</h3>
                    <CodeExampleIO 
                        input-lang="json"
                        :input-code="EndnotesFullExample.from"
                        output-lang="xml"
                        :output-code="EndnotesFullExample.to"
                    />
                    <!-- END FULL EXAMPLE -->

                    <!-- START WRAPPER -->
                    <h3 id="wrapper">Wrapper</h3>

                    <h4 id="wrapper-element-default">Default wrapper element</h4>
                    <p>
                        By default a <CodeInline>div</CodeInline> element with the attribute <CodeInline>class="endnotes-section"</CodeInline>
                        will be generated as the wrapper element for the endnotes section in the resulting HTML document.
                    </p>
                    <CodeExampleIO 
                        input-lang="json"
                        :input-code="EndnotesWrapperDefaultExample.from"
                        output-lang="xml"
                        :output-code="EndnotesWrapperDefaultExample.to"
                    />

                    <h4 id="wrapper-element-custom">Custom wrapper element</h4>
                    <p>
                        You can customize the type of wrapper element to be created by modifying the value of the 
                        <CodeInline>endnotesWrapper.element.name</CodeInline> property. In the example below a <CodeInline>section</CodeInline>
                        element will be used instead of the default <CodeInline>div</CodeInline> element.
                    </p>
                    <CodeExampleIO 
                        input-lang="json"
                        :input-code="EndnotesWrapperCustomElementExample.from"
                        output-lang="xml"
                        :output-code="EndnotesWrapperCustomElementExample.to"
                    />

                    <h4 id="wrapper-attrs">Custom wrapper attributes</h4>
                    <p>
                        The <CodeInline>endnotesWrapper.element.attrs</CodeInline> option allows you to add an unlimited number of attributes to the endnotes wrapper element 
                        in the resulting HTML document.
                    </p>
                    <CodeExampleIO 
                        input-lang="json"
                        :input-code="EndnotesWrapperCustomAttrsExample.from"
                        output-lang="xml"
                        :output-code="EndnotesWrapperCustomAttrsExample.to"
                    />

                    <h4 id="wrapper-disable">Disabling the wrapper element</h4>
                    <p>
                        You can also disable the generation of the wrapper element alltogether by setting the value of the 
                        <CodeInline>endnotesWrapper.enabled</CodeInline> property to <CodeInline>false</CodeInline>.
                    </p>

                    <!-- END WRAPPER-->

                    <!-- START HEADING -->
                    <h3 id="heading">Heading</h3>

                    <h4 id="heading-element-default">Default heading element</h4>
                    <p>
                        By default a <CodeInline>h2</CodeInline> element with the text "Endnotes" and no attributes will be generated as the heading for the endnotes section
                        in the resulting HTML document.
                    </p>
                    <CodeExampleIO 
                        input-lang="json"
                        :input-code="EndnotesHeadingDefaultExample.from"
                        output-lang="xml"
                        :output-code="EndnotesHeadingDefaultExample.to"
                    />

                    <h4 id="heading-element-custom">Custom heading element</h4>
                    <p>
                        You can customize the type of heading element to be created by modifying the value of the 
                        <CodeInline>endnotesHeading.element.name</CodeInline> property. In the example below a <CodeInline>div</CodeInline>
                        element will be used instead of the default <CodeInline>h2</CodeInline> element.
                    </p>
                    <CodeExampleIO 
                        input-lang="json"
                        :input-code="EndnotesHeadingCustomElementExample.from"
                        output-lang="xml"
                        :output-code="EndnotesHeadingCustomElementExample.to"
                    />

                    <h4 id="heading-attrs">Custom heading attributes</h4>
                    <p>
                        The <CodeInline>endnotesHeading.element.attrs</CodeInline> option  allows you to add an unlimited number of attributes to the endnotes heading element 
                        in the resulting HTML document.
                    </p>
                    <CodeExampleIO 
                        input-lang="json"
                        :input-code="EndnotesHeadingCustomAttrsExample.from"
                        output-lang="xml"
                        :output-code="EndnotesHeadingCustomAttrsExample.to"
                    />

                    <h4 id="heading-content">Custom heading content</h4>
                    <p>
                        You can customize the content of the endnotes heading element by modifying the value of the <CodeInline>endnotesHeading.element.content</CodeInline> property.
                        In the example below the content of the endnotes heading element is changed to "Notes".
                    </p>
                    <CodeExampleIO 
                        input-lang="json"
                        :input-code="EndnotesHeadingCustomContentExample.from"
                        output-lang="xml"
                        :output-code="EndnotesHeadingCustomContentExample.to"
                    />

                    <h4 id="heading-disable">Disabling the heading element</h4>
                    <p>You can also disable the generation of a endnotes heading element alltogether by setting the value of the <CodeInline>endnotesHeading.enabled</CodeInline> property to <CodeInline>false</CodeInline>.</p>
                    <!-- END HEADING -->

                    <!-- START LIST -->
                    <h3 id="list">List</h3>

                    <h4 id="list-element-default">Default list element</h4>
                    <p>
                        By default an <CodeInline>ol</CodeInline> element will be generated as list element 
                        in the endnotes section of the resulting HTML document.
                    </p>
                    <CodeExampleIO 
                        input-lang="json"
                        :input-code="EndnotesListDefaultExample.from"
                        output-lang="xml"
                        :output-code="EndnotesListDefaultExample.to"
                    />

                    <h4 id="list-element-custom">Custom list element</h4>
                    <p>
                        You can customize the type of list element to be created by modifying the value of the 
                        <CodeInline>endnotesList.element.name</CodeInline> property. In the example below a <CodeInline>ol</CodeInline>
                        element will be created instead of the default <CodeInline>ul</CodeInline> element.
                    </p>
                    <CodeExampleIO 
                        input-lang="json"
                        :input-code="EndnotesListCustomElementExample.from"
                        output-lang="xml"
                        :output-code="EndnotesListCustomElementExample.to"
                    />

                    <h4 id="list-attrs">Custom list attributes</h4>
                    <p>
                        The <CodeInline>endnotesList.element.attrs</CodeInline> option allows you to add an unlimited number of attributes to the endnotes list element 
                        in the resulting HTML document.
                    </p>
                    <CodeExampleIO 
                        input-lang="json"
                        :input-code="EndnotesListCustomAttrsExample.from"
                        output-lang="xml"
                        :output-code="EndnotesListCustomAttrsExample.to"
                    />

                    <h4 id="list-disable">Disabling the list element</h4>
                    <p>
                        You can also disable the generation of the list element alltogether by setting the value of the 
                        <CodeInline>endnotesList.enabled</CodeInline> property to <CodeInline>false</CodeInline>.
                    </p>
                    <!-- END LIST -->

                    <!-- START LIST ITEM -->
                    <h3 id="list-item">List item</h3>

                    <h4 id="list-item-element-default">Default list item element</h4>
                    <p>
                        By default a <CodeInline>li</CodeInline> element will be generated as list item element 
                        in the endnotes section of the resulting HTML document.
                    </p>
                    <CodeExampleIO 
                        input-lang="json"
                        :input-code="EndnotesListItemDefaultExample.from"
                        output-lang="xml"
                        :output-code="EndnotesListItemDefaultExample.to"
                    />

                    <h4 id="list-item-element-custom">Custom list item element</h4>
                    <p>
                        You can customize the type of list item element to be created by modifying the value of the 
                        <CodeInline>endnotesListItem.element.name</CodeInline> property. In the example below a <CodeInline>div</CodeInline>
                        element will be created instead of the default <CodeInline>li</CodeInline> element.
                    </p>
                    <CodeExampleIO 
                        input-lang="json"
                        :input-code="EndnotesListItemCustomElementExample.from"
                        output-lang="xml"
                        :output-code="EndnotesListItemCustomElementExample.to"
                    />

                    <h4 id="list-item-attrs">Custom list item attributes</h4>
                    <p>
                        The <CodeInline>endnotesListItem.element.attrs</CodeInline> option allows you to add an unlimited number of attributes 
                        to the endnotes list item element in the resulting HTML document.
                    </p>
                    <CodeExampleIO 
                        input-lang="json"
                        :input-code="EndnotesListItemCustomAttrsExample.from"
                        output-lang="xml"
                        :output-code="EndnotesListItemCustomAttrsExample.to"
                    />

                    <h4 id="list-item-disable">Disabling the list item element</h4>
                    <p>
                        You can also disable the generation of the list item element alltogether by setting the value of the 
                        <CodeInline>endnotesListItem.enabled</CodeInline> property to <CodeInline>false</CodeInline>.
                    </p>
                    <!-- END LIST ITEM -->
                </template>
            </Page>
        </template>
    </AppShell>
</template>