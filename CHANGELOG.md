# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0](https://github.com/pleaseai/cli-toolkit/compare/v0.2.0...v0.3.0) (2026-06-27)


### ⚠ BREAKING CHANGES

* **errors:** the 'code' field of unknown/fallback errors (toErrorOutput) and CliError's default code change from 'UNKNOWN' to 'UNKNOWN_ERROR'. Consumers comparing against the literal 'UNKNOWN' must update; using the exported UNKNOWN_ERROR constant is unaffected.

### Features

* add structured errors module and home-path collapsing ([#6](https://github.com/pleaseai/cli-toolkit/issues/6)) ([fd0a64f](https://github.com/pleaseai/cli-toolkit/commit/fd0a64f1293df21c852df4093b67c400322cf7ea))


### Bug Fixes

* **errors:** align UNKNOWN_ERROR value + document isCliError guard ([#8](https://github.com/pleaseai/cli-toolkit/issues/8)) ([caa4d68](https://github.com/pleaseai/cli-toolkit/commit/caa4d68b95f6aab367eaf4fcd836526a832c7275))

## [0.2.0](https://github.com/pleaseai/cli-toolkit/compare/v0.1.0...v0.2.0) (2025-10-30)


### Features

* initial release of @pleaseai/cli-toolkit v0.1.0 ([80e1092](https://github.com/pleaseai/cli-toolkit/commit/80e10925cb1bc223d93a4dce4fdc10718e804081))


### Bug Fixes

* generate individual module JS files for subpath exports ([a0d8e35](https://github.com/pleaseai/cli-toolkit/commit/a0d8e356aad75a4dc6e8bac77b8689e7e357a8a3))

## [0.1.0] - 2025-01-30

### Added

- **Output Module**: JSON and TOON output formatting with field filtering
  - `outputJson()` - Format data as JSON with 2-space indentation
  - `outputToon()` - Format data as TOON (58.9% token savings vs JSON)
  - `outputData()` - Unified output function supporting both formats
  - `parseFields()` - Parse comma-separated field list
  - `filterFields()` - Filter objects/arrays using es-toolkit's pick (3.43x faster than lodash)
  - `isStructuredOutput()` - Check if structured output is requested
  - `validateFormat()` - Validate output format with clear error messages

- **i18n Module**: Internationalization support for Korean and English
  - `detectSystemLanguage()` - Auto-detect language from environment variables
  - `I18nManager` - Message registry for domain-based translations
  - `getCommonMessages()` - Built-in common messages (loading, success, error, etc.)
  - Support for parameterized messages using functions

- **Progress Module**: User-friendly status indicators
  - `createProgressIndicator()` - Console-based progress indicator
  - Emoji-based message formatters (✅ ❌ ℹ️ ⚠️ ⏳ 📡)
  - `formatSuccess()`, `formatError()`, `formatInfo()`, `formatWarning()`, `formatProgress()`

- **Validation Module**: Input validation utilities
  - **Numeric**: `validatePositiveInteger()`, `validateNumericId()`, `validateRange()`
  - **Text**: `validateNonEmptyString()`, `validateMaxLength()`, `validateString()`, `validatePattern()`
  - Clear, customizable error messages with field names

### Dependencies

- `@byjohann/toon@^0.3.0` - TOON format encoding
- `commander@^12.1.0` - CLI framework
- `es-toolkit@^1.31.0` - High-performance utilities

### Development

- Bun runtime support
- TypeScript with strict mode
- Comprehensive test suite (73 tests, 100% pass rate)
- ESLint with @antfu/eslint-config
- Full TypeScript declaration files

[0.1.0]: https://github.com/pleaseai/cli-toolkit/releases/tag/v0.1.0
