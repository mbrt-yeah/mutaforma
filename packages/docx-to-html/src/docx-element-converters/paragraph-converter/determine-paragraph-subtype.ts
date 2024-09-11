import {
    heading1Pattern,
    heading2Pattern,
    heading3Pattern,
    heading4Pattern,
    heading5Pattern,
    heading6Pattern,
    heading7Pattern,
    heading8Pattern,
    heading9Pattern,
    headingPattern,
} from "@mtfm/core";

import {
    CoHeading,
    CoListItem,
    CoParagraph,
} from "@mtfm/core-models";

/**
 * Determines the type of paragraph (e.g., heading, list item, or normal paragraph) based on the style ID and indentation level.
 *
 * @param {string | undefined} styleId - The style ID of the paragraph.
 * @param {string | undefined} indentationLevel - The indentation level of the paragraph.
 *
 * @returns {CoHeading | CoListItem | CoParagraph} - The determined type of paragraph.
 *
 * It checks the style ID against predefined patterns to determine if the paragraph is a CoHeading item, and if so, it sets the indentation level accordingly.
 * If the style ID does not match any of the heading patterns, it checks the indentation level to determine if the paragraph is CoListItem item.
 * If neither of these conditions are met, it returns a new `CoParagraph` object.
 */
export function determineParagraphSubType(styleId?: string | undefined, indentationLevel?: string | undefined): CoHeading | CoListItem | CoParagraph {
    let result: CoParagraph;

    //if ( this.__isLineBreak() ) 
    //    result = new CoLineBreak();
    if (indentationLevel && indentationLevel !== "" && !new RegExp(headingPattern, "i").test(styleId || ""))
    {
        result = new CoListItem();
        result.indentationLevel = Number.parseInt(indentationLevel);
    }
    else if (styleId && new RegExp(heading1Pattern, "i").test(styleId))
    {
        result = new CoHeading();
        result.indentationLevel = 0;
    }
    else if (styleId && new RegExp(heading2Pattern, "i").test(styleId))
    {
        result = new CoHeading();
        result.indentationLevel = 1;
    }
    else if (styleId && new RegExp(heading3Pattern, "i").test(styleId)) {
        result = new CoHeading();
        result.indentationLevel = 2;
    }
    else if (styleId && new RegExp(heading4Pattern, "i").test(styleId))
    {
        result = new CoHeading();
        result.indentationLevel = 3
    }
    else if (styleId && new RegExp(heading5Pattern, "i").test(styleId))
    {
        result = new CoHeading();
        result.indentationLevel = 4;
    }
    else if (styleId && new RegExp(heading6Pattern, "i").test(styleId))
    {
        result = new CoHeading();
        result.indentationLevel = 5;
    }
    else if (styleId && new RegExp(heading7Pattern, "i").test(styleId))
    {
        result = new CoHeading();
        result.indentationLevel = 6;
    }
    else if (styleId && new RegExp(heading8Pattern, "i").test(styleId))
    {
        result = new CoHeading();
        result.indentationLevel = 7;
    }
    else if (styleId && new RegExp(heading9Pattern, "i").test(styleId))
    {
        result = new CoHeading();
        result.indentationLevel = 8;
    }
    else
    {
        result = new CoParagraph();
    }

    return result;
};
