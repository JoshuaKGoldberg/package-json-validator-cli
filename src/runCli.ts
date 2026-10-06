import * as fsSync from "node:fs";
import * as fs from "node:fs/promises";
import { createRequire } from "node:module";
import { validate } from "package-json-validator";
import { createCli } from "parse-standard-args";
import { z } from "zod";

interface PackageJson {
	version: string;
}

// Read at runtime, as the release build happens before the version is bumped.
const require = createRequire(import.meta.url);
const packageJson = require("../package.json") as PackageJson;

const cli = createCli({
	description: "Validate package.json files",
	name: "package-json-validator-cli",
	/* eslint-disable perfectionist/sort-objects -- keeps the previous help order */
	options: z.object({
		filename: z.string().default("package.json").meta({
			description: "package.json file to validate",
			short: "f",
		}),
		warnings: z.boolean().default(false).meta({
			description: "display warnings",
			short: "w",
		}),
		recommendations: z.boolean().default(false).meta({
			description: "display recommendations",
			short: "r",
		}),
		quiet: z.boolean().default(false).meta({
			description: "less output",
			short: "q",
		}),
	}),
	/* eslint-enable perfectionist/sort-objects */
	// Unknown flags and positionals were ignored before, so they still are.
	strict: false,
	version: packageJson.version,
});

export async function runCli(args: string[]) {
	const parsed = await cli.parse(args);

	switch (parsed.type) {
		case "error":
			console.error(parsed.text);
			return 1;

		case "help":
		case "version":
			console.log(parsed.text);
			return 0;
	}

	const options = parsed.values;

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
