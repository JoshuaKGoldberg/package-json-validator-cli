<h1 align="center">Package Json Validator CLI</h1>

<p align="center">
	CLI to validate package.json files.
	📂
</p>

<p align="center">
	<!-- prettier-ignore-start -->
	<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
	<a href="#contributors" target="_blank"><img alt="👪 All Contributors: 2" src="https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-2-21bb42.svg" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
	<!-- prettier-ignore-end -->
	<a href="https://github.com/JoshuaKGoldberg/package-json-validator-cli/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
	<a href="https://codecov.io/gh/JoshuaKGoldberg/package-json-validator-cli" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/JoshuaKGoldberg/package-json-validator-cli?label=%F0%9F%A7%AA%20coverage" /></a>
	<a href="https://github.com/JoshuaKGoldberg/package-json-validator-cli/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg" /></a>
	<a href="http://npmjs.com/package/package-json-validator-cli" target="_blank"><img alt="📦 npm version" src="https://img.shields.io/npm/v/package-json-validator-cli?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
	<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
</p>

## Usage

Run this package as a terminal command to validate a `package.json` file:

```shell
npx package-json-validator-cli
```

See `package-json-validator-cli --help` for usage:

```plaintext
Options:
      --help             Show help                                     [boolean]
      --version          Show version number                           [boolean]
  -f, --filename         package.json file to validate [default: "package.json"]
  -w, --warnings         display warnings             [boolean] [default: false]
  -r, --recommendations  display recommendations      [boolean] [default: false]
  -q, --quiet            less output                  [boolean] [default: false]
```

`package-json-validator-cli` is a thin wrapper around [`package-json-validator`](https://github.com/JoshuaKGoldberg/package-json-validator).

- To keep your `package.json` validated over time, see [`eslint-plugin-package-json`](https://github.com/JoshuaKGoldberg/eslint-plugin-package-json).
- To programmatically validate your `package.json`, see [`package-json-validator`](https://github.com/JoshuaKGoldberg/package-json-validator).

## Development

See [`.github/CONTRIBUTING.md`](./.github/CONTRIBUTING.md), then [`.github/DEVELOPMENT.md`](./.github/DEVELOPMENT.md).
Thanks! 📂

## Contributors

<!-- spellchecker: disable -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href="http://www.joshuakgoldberg.com"><img src="https://avatars.githubusercontent.com/u/3335181?v=4?s=100" width="100px;" alt="Josh Goldberg ✨"/><br /><sub><b>Josh Goldberg ✨</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/package-json-validator-cli/issues?q=author%3AJoshuaKGoldberg" title="Bug reports">🐛</a> <a href="https://github.com/JoshuaKGoldberg/package-json-validator-cli/commits?author=JoshuaKGoldberg" title="Code">💻</a> <a href="#content-JoshuaKGoldberg" title="Content">🖋</a> <a href="https://github.com/JoshuaKGoldberg/package-json-validator-cli/commits?author=JoshuaKGoldberg" title="Documentation">📖</a> <a href="#ideas-JoshuaKGoldberg" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-JoshuaKGoldberg" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-JoshuaKGoldberg" title="Maintenance">🚧</a> <a href="#projectManagement-JoshuaKGoldberg" title="Project Management">📆</a> <a href="#tool-JoshuaKGoldberg" title="Tools">🔧</a></td>
      <td align="center"><a href="https://github.com/michaelfaith"><img src="https://avatars.githubusercontent.com/u/8071845?v=4?s=100" width="100px;" alt="michael faith"/><br /><sub><b>michael faith</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/package-json-validator-cli/issues?q=author%3Amichaelfaith" title="Bug reports">🐛</a> <a href="https://github.com/JoshuaKGoldberg/package-json-validator-cli/commits?author=michaelfaith" title="Code">💻</a> <a href="#content-michaelfaith" title="Content">🖋</a> <a href="https://github.com/JoshuaKGoldberg/package-json-validator-cli/commits?author=michaelfaith" title="Documentation">📖</a> <a href="#ideas-michaelfaith" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-michaelfaith" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-michaelfaith" title="Maintenance">🚧</a> <a href="#projectManagement-michaelfaith" title="Project Management">📆</a> <a href="#tool-michaelfaith" title="Tools">🔧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- spellchecker: enable -->

> 💝 This package was templated with [`create-typescript-app`](https://github.com/JoshuaKGoldberg/create-typescript-app) using the [Bingo framework](https://create.bingo).
