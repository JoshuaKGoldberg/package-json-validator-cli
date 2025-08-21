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
});
