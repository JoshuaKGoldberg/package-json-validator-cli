import * as fsSync from "node:fs";
import * as fs from "node:fs/promises";
import { validate } from "package-json-validator";
import yargs from "yargs";

interface Options {
	filename: string;
	quiet: boolean;
	recommendations: boolean;
	warnings: boolean;
}

export async function runCli(args: string[]) {
	const options = yargs(args)
		.options("filename", {
			alias: "f",
			default: "package.json",
			description: "package.json file to validate",
		})
		.options("warnings", {
			alias: "w",
			boolean: true,
			default: false,
			description: "display warnings",
		})
		.options("recommendations", {
			alias: "r",
			boolean: true,
			default: false,
			description: "display recommendations",
		})
		.options("quiet", {
			alias: "q",
			boolean: true,
			default: false,
			description: "less output",
		})
		.usage("Validate package.json files")
		.parse() as Options;

	if (!fsSync.existsSync(options.filename)) {
		console.error("File does not exist: " + options.filename);
		return 1;
	}

	const contents = (await fs.readFile(options.filename)).toString();
	const results = validate(contents, {
		recommendations: options.recommendations,
		warnings: options.warnings,
	});

	if (!results.valid) {
		console.error(options.filename + " is NOT valid");
		console.error(results);
		return 1;
	}

	if (!options.quiet) {
		console.log(results);
	}

	return 0;
}
