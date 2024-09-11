import { CoTreeNode, IExecutable } from "@mtfm/core-models";
import { ICoListCreatorProps } from "./i-co-list-creator-props.js";

export interface ICoListCreator extends ICoListCreatorProps, IExecutable<CoTreeNode> {};
