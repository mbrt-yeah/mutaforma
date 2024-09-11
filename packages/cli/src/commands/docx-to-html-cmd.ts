import { Command } from "commander";
import { DocxToHtmlConverter } from "@mtfm/docx-to-html";
import { readFileSync } from "node:fs";
import { tryCatch } from "@swiss-army-knife/utilities";
import Spinnies from "spinnies";

import { IConfigOption, ConfigOptionBlueprint } from "../_shared/options/config-option.js";
import { IInputOption, InputOptionBlueprint } from "../_shared/options/input-option.js";
import { IOutputOption, OutputOptionBlueprint } from "../_shared/options/output-option.js";

interface ICommandOptions extends IInputOption, IOutputOption, IConfigOption {};

export const DocxToHtmlCmd = new Command()
    .name("docx-to-html")
    .requiredOption(InputOptionBlueprint.flags, InputOptionBlueprint.description)
    .requiredOption(OutputOptionBlueprint.flags, OutputOptionBlueprint.description)
    .option(ConfigOptionBlueprint.flags, ConfigOptionBlueprint.description)
    .action(async (options: ICommandOptions) => {
        const inputPath = options.input || options.i || "";
        const outputPath = options.output || options.o || "";
        const configPath = options.config || options.c || undefined;

        const spinnies = new Spinnies();

        let config: any | undefined = undefined;

        if (configPath) {
            spinnies.add("loadConfig", { text: `Loading configuration from path: ${configPath}` });

            const configProvisionResult = tryCatch(() => {
                const configSerialized = readFileSync(configPath, "utf8");
                return JSON.parse(configSerialized);
            });

            if (configProvisionResult.isErr()) {
                spinnies.fail("loadConfig", { text: `Loading configuration failed with error: ${configProvisionResult.error.message}` });
                return;
            }

            spinnies.succeed("loadConfig", { text: `Configuration loaded successfully from path: ${configPath}` });
            config = configProvisionResult.value;
        }

        const converter = new DocxToHtmlConverter({
            config,
            input: inputPath,
            outputPath,
        });

        converter.on("loadingDocStart", () => spinnies.add("loadDoc", { text: `Loading document from path: ${inputPath}` }));
        converter.on("loadingDocSuccess", () => spinnies.succeed("loadDoc", { text: `Document loaded successfully from path: ${inputPath}` }));
        converter.on("loadingDocError", (error) => spinnies.fail("loadDoc",  { text: `Loading document failed with error: ${error.message}` }));

        converter.on("convertingDocStart", () => spinnies.add("convert", { text: "Starting document conversion" }));
        converter.on("convertingDocSuccess", () => spinnies.succeed("convert", { text: "Document converted successfully" }));
        converter.on("convertingDocError", (error) => spinnies.fail("convert",  { text: `Document conversion failed with error: ${error.message}` }));

        converter.on("savingOutputStart", () => spinnies.add("save", { text: `Saving document to output folder: ${outputPath}` }));
        converter.on("savingOutputSuccess", () => spinnies.succeed("save", { text: `Document saved to: ${outputPath}` }));
        converter.on("savingOutputError", (error) => spinnies.fail("save", { text: `Saving document failed with error: ${error.message}` }));

        await converter.execute();
    });