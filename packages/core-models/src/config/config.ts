import { ConfigHtmlEntities } from "../config-html-entities/config-html-entities.js";
import { ConfigInlineFormatting } from "../config-inline-formatting/config-inline-formatting.js";
import { ConfigNoteList } from "../config-note-list/config-note-list.js";
import { ConfigNoteListItem } from "../config-note-list-item/config-note-list-item.js";
import { ConfigNoteNumbering } from "../config-note-numbering/config-note-numbering.js";
import { ConfigNotesHeading } from "../config-notes-heading/config-notes-heading.js";
import { ConfigNotesWrapper } from "../config-notes-wrapper/config-notes-wrapper.js";
import { ConfigPrettyPrint } from "../config-pretty-print/config-pretty-print.js";
import { IConfig } from "./i-config.js";
import { IConfigHtmlEntities } from "../config-html-entities/i-config-html-entities.js";
import { IConfigInlineFormatting } from "../config-inline-formatting/i-config-inline-formatting.js";
import { IConfigNoteList } from "../config-note-list/i-config-note-list.js";
import { IConfigNoteListItem } from "../config-note-list-item/i-config-note-list-item.js";
import { IConfigNoteNumbering } from "../config-note-numbering/i-config-note-numbering.js";
import { IConfigNotesHeading } from "../config-notes-heading/i-config-notes-heading.js";
import { IConfigNotesWrapper } from "../config-notes-wrapper/i-config-notes-wrapper.js";
import { IConfigOpts } from "./i-config-opts.js";
import { IConfigPrettyPrint } from "../config-pretty-print/i-config-pretty-print.js";
import { IStyleMapping } from "../style-mapping/i-style-mapping.js";

export class Config implements IConfig {
    private __endnotesWrapper: IConfigNotesWrapper;
    private __endnotesHeading: IConfigNotesHeading;
    private __endnotesList: IConfigNoteList;
    private __endnotesListItem: IConfigNoteListItem;
    private __endnotesNumbering: IConfigNoteNumbering;
    private __footnotesWrapper: IConfigNotesWrapper;
    private __footnotesHeading: IConfigNotesHeading;
    private __footnotesList: IConfigNoteList;
    private __footnotesListItem: IConfigNoteListItem;
    private __footnotesNumbering: IConfigNoteNumbering;
    private __inlineFormatting: IConfigInlineFormatting
    private __mappings: IStyleMapping[];
    private __outDocExt: string;
    private __outDocFileName: string;
    private __outHtmlEntities: IConfigHtmlEntities;
    private __outImgFolderName: string;
    private __outPrettyPrint: IConfigPrettyPrint;
    private __outRemoveEmptyParas: boolean;

    public constructor(opts: IConfigOpts = {}) {
        this.__endnotesWrapper = opts.endnotesWrapper || new ConfigNotesWrapper();
        this.__endnotesHeading = opts.endnotesHeading || new ConfigNotesHeading();
        this.__endnotesList = opts.endnotesList || new ConfigNoteList();
        this.__endnotesListItem = opts.endnotesListItem || new ConfigNoteListItem();
        this.__endnotesNumbering = opts.endnotesNumbering || new ConfigNoteNumbering();
        this.__footnotesWrapper = opts.footnotesWrapper || new ConfigNotesWrapper();
        this.__footnotesHeading = opts.footnotesHeading || new ConfigNotesHeading();
        this.__footnotesList = opts.footnotesList || new ConfigNoteList();
        this.__footnotesListItem = opts.footnotesListItem || new ConfigNoteListItem();
        this.__footnotesNumbering = opts.footnotesNumbering || new ConfigNoteNumbering();
        this.__inlineFormatting = opts.inlineFormatting || new ConfigInlineFormatting();
        this.__mappings = opts.mappings || [];
        this.__outDocExt = opts.outDocExt || "html";
        this.__outDocFileName = opts.outDocFileName || "document";
        this.__outImgFolderName = opts.outImgFolderName || "images";
        this.__outHtmlEntities = opts.outHtmlEntities || new ConfigHtmlEntities();
        this.__outPrettyPrint = opts.outPrettyPrint || new ConfigPrettyPrint();
        this.__outRemoveEmptyParas = (opts.outRemoveEmptyParas === undefined) ? false : opts.outRemoveEmptyParas;
    }

    public get endnotesWrapper(): IConfigNotesWrapper {
        return this.__endnotesWrapper;
    }

    public get endnotesHeading(): IConfigNotesHeading {
        return this.__endnotesHeading;
    }

    public get endnotesList(): IConfigNoteList {
        return this.__endnotesList;
    }

    public get endnotesListItem(): IConfigNoteListItem {
        return this.__endnotesListItem;
    }

    public get endnotesNumbering(): IConfigNoteNumbering {
        return this.__endnotesNumbering;
    }

    public get footnotesWrapper(): IConfigNotesWrapper {
        return this.__footnotesWrapper;
    }

    public get footnotesHeading(): IConfigNotesHeading {
        return this.__footnotesHeading;
    }

    public get footnotesList(): IConfigNoteList {
        return this.__footnotesList;
    }

    public get footnotesListItem(): IConfigNoteListItem {
        return this.__footnotesListItem;
    }

    public get footnotesNumbering(): IConfigNoteNumbering {
        return this.__footnotesNumbering;
    }

    public get inlineFormatting(): IConfigInlineFormatting {
        return this.__inlineFormatting;
    }

    public get mappings(): IStyleMapping[] {
        return this.__mappings;
    }

    public get outDocExt(): string {
        return this.__outDocExt;
    }

    public get outDocFileName(): string {
        return this.__outDocFileName;
    }

    public get outImgFolderName(): string {
        return this.__outImgFolderName;
    }

    public get outHtmlEntities(): IConfigHtmlEntities {
        return this.__outHtmlEntities;
    }

    public get outPrettyPrint(): IConfigPrettyPrint {
        return this.__outPrettyPrint;
    }

    public get outRemoveEmptyParas(): boolean {
        return this.__outRemoveEmptyParas;
    }

    public getStyleMappingByName(name: string | undefined): IStyleMapping | undefined {
        if (!name)
            return undefined;

        const nameLowercase = name.toLowerCase();
        const nameUppercase = name.toUpperCase();
        const nameUppercaseFirstChar = name.charAt(0).toUpperCase() + name.slice(1);

        return this.__mappings.find((m) => {
            return m.names.indexOf(name) !== -1 
                || m.names.indexOf(nameLowercase) !== -1
                || m.names.indexOf(nameUppercase) !== -1
                || m.names.indexOf(nameUppercaseFirstChar) !== -1
        });
    }
};
