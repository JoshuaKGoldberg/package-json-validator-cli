import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import eslint from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import jsdoc from "eslint-plugin-jsdoc";
import jsonc from "eslint-plugin-jsonc";
import markdown from "eslint-plugin-markdown";
import n from "eslint-plugin-n";
import packageJson from "eslint-plugin-package-json";
import perfectionist from "eslint-plugin-perfectionist";
import * as regexp from "eslint-plugin-regexp";
import yml from "eslint-plugin-yml";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{
		ignores: ["**/*.snap", "coverage", "lib", "node_modules", "pnpm-lock.yaml"],
	},
	{ linterOptions: { reportUnusedDisableDirectives: "error" } },
	eslint.configs.recommended,
	comments.recommended,
	jsdoc.configs["flat/contents-typescript-error"],
	jsdoc.configs["flat/logical-typescript-error"],
	jsdoc.configs["flat/stylistic-typescript-error"],
	jsonc.configs["flat/recommended-with-json"],
	markdown.configs.recommended,
	n.configs["flat/recommended"],
	packageJson.configs.recommended,
	perfectionist.configs["recommended-natural"],
	regexp.configs["flat/recommended"],
	{
		extends: [
			tseslint.configs.strictTypeChecked,
			tseslint.configs.stylisticTypeChecked,
		],
		files: ["**/*.{js,ts}"],
		languageOptions: {
			parserOptions: {
				projectService: {
					allowDefaultProject: ["*.config.*s", "lib/index.js"],
				},
			},
		},
		rules: {
			// Using a ts bin file throws this rule off.
			// It uses the package.json as a source of truth, and since the package points
			// at the transpiled js file, it treats usage on the ts src as a violation.
			"n/hashbang": "off",

			// Stylistic concerns that don't interfere with Prettier
			"logical-assignment-operators": [
				"error",
				"always",
				{ enforceForIfStatements: true },
			],
			"no-useless-rename": "error",
			"object-shorthand": "error",
			"operator-assignment": "error",
		},
		settings: {
			perfectionist: { partitionByComment: true, type: "natural" },
			vitest: { typecheck: true },
		},
	},
	{
		extends: [tseslint.configs.disableTypeChecked],
		files: ["**/*.md/*.ts"],
		rules: { "n/no-missing-import": "off" },
	},
	{
		extends: [vitest.configs.recommended],
		files: ["**/*.test.*"],
		rules: { "@typescript-eslint/no-unsafe-assignment": "off" },
	},
	{
		extends: [yml.configs["flat/standard"], yml.configs["flat/prettier"]],
		files: ["**/*.{yml,yaml}"],
		rules: {
			"yml/file-extension": ["error", { extension: "yml" }],
			"yml/sort-sequence-values": [
				"error",
				{ order: { type: "asc" }, pathPattern: "^.*$" },
			],
		},
	},
);
