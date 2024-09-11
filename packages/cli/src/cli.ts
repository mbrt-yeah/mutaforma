import { Command } from "commander";
import { DocxToHtmlCmd } from "./commands/docx-to-html-cmd.js";

const Cli = new Command();

Cli
  .name("Mutaforma")
  .description("A command-line tool for converting documents")
  .version("0.1.0")
  .addCommand(DocxToHtmlCmd)
  .parse(process.argv);
