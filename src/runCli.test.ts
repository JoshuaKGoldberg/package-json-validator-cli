import { beforeEach, describe, expect, it, MockInstance, vi } from "vitest";

import { runCli } from "./runCli.ts";

const mockExistsSync = vi.fn();
const mockReadFile = vi.fn();

vi.mock("node:fs", () => ({
	get existsSync() {
		return mockExistsSync;
	},
}));

vi.mock("node:fs/promises", () => ({
	get readFile() {
		return mockReadFile;
	},
}));

let mockError: MockInstance;
let mockLog: MockInstance;

beforeEach(() => {
	mockError = vi.spyOn(console, "error").mockImplementation(() => undefined);
	mockLog = vi.spyOn(console, "log").mockImplementation(() => undefined);
});

const contentsInvalid = { version: 0 };
const contentsValid = { name: "example", version: "0.0.0" };

describe(runCli, () => {
	it("outputs an error and returns 1 when package.json does not exist and --filename is not provided", async () => {
		mockExistsSync.mockReturnValueOnce(false);

		const actual = await runCli([]);

		expect(actual).toBe(1);
		expect(mockError).toHaveBeenCalledWith("File does not exist: package.json");
		expect(mockExistsSync).toHaveBeenCalledWith("package.json");
	});

	it("outputs an error and returns 1 when the --filename package does not exist", async () => {
		mockExistsSync.mockReturnValueOnce(false);

		const mockError = vi
			.spyOn(console, "error")
			.mockImplementation(() => undefined);

		const actual = await runCli(["--filename", "other.json"]);

		expect(actual).toBe(1);
		expect(mockError).toHaveBeenCalledWith("File does not exist: other.json");
		expect(mockExistsSync).toHaveBeenCalledWith("other.json");
	});

	it("outputs the results and returns 1 when the default package.json is not valid", async () => {
		const contents = JSON.stringify(contentsInvalid);

		mockExistsSync.mockReturnValueOnce(true);
		mockReadFile.mockReturnValue(contents);

		const mockError = vi
			.spyOn(console, "error")
			.mockImplementation(() => undefined);

		const actual = await runCli([]);

		expect(actual).toBe(1);
		expect(mockError.mock.calls).toMatchSnapshot();
		expect(mockReadFile).toHaveBeenCalledWith("package.json");
	});

	it("outputs the results and returns 1 when a --filename package.json is not valid", async () => {
		const contents = JSON.stringify(contentsInvalid);

		mockExistsSync.mockReturnValueOnce(true);
		mockReadFile.mockReturnValue(contents);

		const mockError = vi
			.spyOn(console, "error")
			.mockImplementation(() => undefined);

		const actual = await runCli(["--filename", "other.json"]);

		expect(actual).toBe(1);
		expect(mockError.mock.calls).toMatchSnapshot();
		expect(mockReadFile).toHaveBeenCalledWith("other.json");
	});

	it("returns 0 and logs results when the file is valid and --quiet is not provided", async () => {
		const contents = JSON.stringify(contentsValid);

		mockExistsSync.mockReturnValueOnce(true);
		mockReadFile.mockReturnValue(contents);

		const mockError = vi
			.spyOn(console, "error")
			.mockImplementation(() => undefined);

		const actual = await runCli([]);

		expect(actual).toBe(0);
		expect(mockError).not.toHaveBeenCalled();
		expect(mockLog.mock.calls).toMatchSnapshot();
	});

	it("returns 0 without logging results when the file is valid and --quiet is provided", async () => {
		const contents = JSON.stringify(contentsValid);

		mockExistsSync.mockReturnValueOnce(true);
		mockReadFile.mockReturnValue(contents);

		const mockError = vi
			.spyOn(console, "error")
			.mockImplementation(() => undefined);

		const actual = await runCli(["--quiet"]);

		expect(actual).toBe(0);
		expect(mockError).not.toHaveBeenCalled();
		expect(mockLog).not.toHaveBeenCalled();
	});

	it("prints help and returns 0 when --help is provided", async () => {
		const actual = await runCli(["--help"]);

		expect(actual).toBe(0);
		expect(mockExistsSync).not.toHaveBeenCalled();
		expect(mockLog.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "Usage: package-json-validator-cli [options]

			Validate package.json files

			Options:
			  -f, --filename <string>  package.json file to validate (default: package.json)
			  -w, --warnings           display warnings
			  -r, --recommendations    display recommendations
			  -q, --quiet              less output
			  -h, --help               Show this help message
			  -v, --version            Show the version number",
			  ],
			]
		`);
	});

	it("prints help and returns 0 when -h is provided", async () => {
		const actual = await runCli(["-h"]);

		expect(actual).toBe(0);
		expect(mockLog).toHaveBeenCalledWith(
			expect.stringContaining("Usage: package-json-validator-cli [options]"),
		);
	});

	it.each([["--version"], ["-v"]])(
		"prints the package version and returns 0 when %s is provided",
		async (flag) => {
			const { version } = (
				await import("../package.json", { with: { type: "json" } })
			).default;

			const actual = await runCli([flag]);

			expect(actual).toBe(0);
			expect(mockExistsSync).not.toHaveBeenCalled();
			expect(mockLog).toHaveBeenCalledWith(version);
		},
	);

	it.each([
		[["-f", "other.json"]],
		[["--filename=other.json"]],
		[["-f", "ignored.json", "--filename", "other.json"]],
	])("reads the filename from %j", async (args) => {
		mockExistsSync.mockReturnValueOnce(false);

		const actual = await runCli(args);

		expect(actual).toBe(1);
		expect(mockError).toHaveBeenCalledWith("File does not exist: other.json");
		expect(mockExistsSync).toHaveBeenCalledWith("other.json");
	});

	it.each([
		[[], { valid: true }],
		[["--warnings"], { valid: true, warnings: expect.any(Array) }],
		[["-w"], { valid: true, warnings: expect.any(Array) }],
		[["--warnings=true"], { valid: true, warnings: expect.any(Array) }],
		[["--warnings", "--no-warnings"], { valid: true }],
		[["--warnings=false"], { valid: true }],
		[
			["--recommendations"],
			{ recommendations: expect.any(Array), valid: true },
		],
		[["-r"], { recommendations: expect.any(Array), valid: true }],
		[["-r", "--no-recommendations"], { valid: true }],
		[
			["-wr"],
			{
				recommendations: expect.any(Array),
				valid: true,
				warnings: expect.any(Array),
			},
		],
		[["-q", "--no-quiet"], { valid: true }],
		[["--quiet=false"], { valid: true }],
	])("logs results for %j", async (args, expected) => {
		mockExistsSync.mockReturnValueOnce(true);
		mockReadFile.mockReturnValue(JSON.stringify(contentsValid));

		const actual = await runCli(args);

		expect(actual).toBe(0);
		expect(mockError).not.toHaveBeenCalled();
		expect(mockLog.mock.calls).toEqual([[expected]]);
	});

	it.each([[["-q"]], [["--quiet=true"]]])(
		"does not log results for %j",
		async (args) => {
			mockExistsSync.mockReturnValueOnce(true);
			mockReadFile.mockReturnValue(JSON.stringify(contentsValid));

			const actual = await runCli(args);

			expect(actual).toBe(0);
			expect(mockLog).not.toHaveBeenCalled();
		},
	);

	it("still outputs errors for an invalid file when --quiet is provided", async () => {
		mockExistsSync.mockReturnValueOnce(true);
		mockReadFile.mockReturnValue(JSON.stringify(contentsInvalid));

		const actual = await runCli(["--quiet"]);

		expect(actual).toBe(1);
		expect(mockError).toHaveBeenCalledWith("package.json is NOT valid");
		expect(mockLog).not.toHaveBeenCalled();
	});

	it("ignores unknown flags and positionals", async () => {
		mockExistsSync.mockReturnValueOnce(true);
		mockReadFile.mockReturnValue(JSON.stringify(contentsValid));

		const actual = await runCli([
			"--unknown",
			"value",
			"-x",
			"positional.json",
		]);

		expect(actual).toBe(0);
		expect(mockError).not.toHaveBeenCalled();
		expect(mockReadFile).toHaveBeenCalledWith("package.json");
		expect(mockLog.mock.calls).toEqual([[{ valid: true }]]);
	});

	it.each([
		[["--filename"], "--filename requires a value."],
		[["--quiet=maybe"], "--quiet does not take a value."],
		[["--no-warnings=true"], "--no-warnings does not take a value."],
	])(
		"outputs an error and returns 1 for invalid args %j",
		async (args, message) => {
			const actual = await runCli(args);

			expect(actual).toBe(1);
			expect(mockExistsSync).not.toHaveBeenCalled();
			expect(mockError.mock.calls).toEqual([
				[`${message}\nRun 'package-json-validator-cli --help' for usage.`],
			]);
		},
	);
});
