import { ICoTextRunProps } from "./i-co-text-run-props.js";

export interface ICoTextRun extends ICoTextRunProps {
    hasEqualInlineFormatting(textRun: ICoTextRun): boolean;
};
