import { defineConfig } from "tsdown";

export default defineConfig({
	dts: true,
	entry: ["src/index.ts", "src/bin.ts"],
	fixedExtension: false,
	unbundle: true,
});
