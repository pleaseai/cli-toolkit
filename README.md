# @pleaseai/cli-toolkit

[![npm version](https://badge.fury.io/js/@pleaseai%2Fcli-toolkit.svg)](https://badge.fury.io/js/@pleaseai%2Fcli-toolkit)
[![CI](https://github.com/pleaseai/gh-please/actions/workflows/ci.yml/badge.svg)](https://github.com/pleaseai/gh-please/actions/workflows/ci.yml)
[![codecov](https://codecov.io/github/pleaseai/gh-please/graph/badge.svg?token=BQKO959X1M)](https://codecov.io/github/pleaseai/gh-please)
[![code style](https://antfu.me/badge-code-style.svg)](https://github.com/antfu/eslint-config)

Shared CLI utilities for LLM-focused command-line tools.

## Features

- **Output Formatting**: JSON and TOON (Token-Oriented Object Notation) output with field filtering
- **Internationalization**: Language detection and message management (Korean/English)
- **Progress Indicators**: Emoji-based status messages for long-running operations
- **Input Validation**: Type-safe validation for common input patterns

## Installation

```bash
bun add @pleaseai/cli-toolkit
```

## Usage

### Output Module

Format command output as JSON or TOON with optional field filtering:

```typescript
import { outputData, parseFields } from '@pleaseai/cli-toolkit/output'

const data = [
  { number: 123, title: 'Feature request', state: 'OPEN' },
  { number: 124, title: 'Bug fix', state: 'CLOSED' },
]

// JSON output with all fields
outputData(data, 'json')

// TOON output for LLM consumption (58.9% token savings vs JSON)
outputData(data, 'toon')

// JSON output with field filtering
const fields = parseFields('number,title')
outputData(data, 'json', fields)
// Output: [{"number": 123, "title": "Feature request"}, ...]
```

### i18n Module

Manage multilingual messages for your CLI:

```typescript
import { detectSystemLanguage, I18nManager } from '@pleaseai/cli-toolkit/i18n'

const i18n = new I18nManager()

// Register messages
i18n.register('myapp.issues', 'en', {
  creating: 'Creating issue...',
  created: (number: number) => `Issue #${number} created!`,
})

i18n.register('myapp.issues', 'ko', {
  creating: '이슈 생성 중...',
  created: (number: number) => `이슈 #${number}가 생성되었습니다!`,
})

// Auto-detect language and get messages
const lang = detectSystemLanguage() // 'ko' or 'en' based on LANG env var
const msg = i18n.get('myapp.issues', lang)

console.log(msg.creating) // 'Creating issue...' or '이슈 생성 중...'
console.log(msg.created(123)) // 'Issue #123 created!' or '이슈 #123가 생성되었습니다!'
```

### Progress Module

Display user-friendly progress indicators:

```typescript
import { createProgressIndicator } from '@pleaseai/cli-toolkit/progress'

const progress = createProgressIndicator()

progress.start('Fetching data...') // 📡 Fetching data...
progress.update('Processing records...') // ⏳ Processing records...
progress.success('Operation completed!') // ✅ Operation completed!
progress.error('Operation failed') // ❌ Operation failed
progress.info('Additional info') // ℹ️  Additional info
```

### Validation Module

Validate user inputs with clear error messages:

```typescript
import {
  validateNonEmptyString,
  validatePattern,
  validatePositiveInteger,
} from '@pleaseai/cli-toolkit/validation'

// Validate positive integers
const id = validatePositiveInteger('123', 'Issue ID') // 123
// validatePositiveInteger('0', 'Issue ID') → throws "Issue ID must be a positive integer"

// Validate non-empty strings
const body = validateNonEmptyString('Hello world', 'Comment body') // 'Hello world' (trimmed)
// validateNonEmptyString('', 'Comment body') → throws "Comment body cannot be empty"

// Validate patterns
const username = validatePattern('user123', /^[a-z0-9]+$/, 'Username', 'alphanumeric only')
// validatePattern('user-123', /^[a-z0-9]+$/, 'Username') → throws "Username must be alphanumeric only"
```

## API Reference

### Output Module

- `outputData(data, format, fields?)` - Output data in JSON or TOON format
- `outputJson(data)` - Output as JSON
- `outputToon(data)` - Output as TOON (58.9% token savings)
- `parseFields(fieldString)` - Parse comma-separated field list
- `filterFields(data, fields)` - Filter object/array to specified fields
- `isStructuredOutput(options)` - Check if structured output is requested
- `validateFormat(format)` - Validate output format

### i18n Module

- `detectSystemLanguage()` - Detect language from environment variables
- `I18nManager` - Message registry and manager
  - `register(domain, lang, messages)` - Register message dictionary
  - `get(domain, lang)` - Get messages for domain and language
  - `has(domain)` - Check if domain is registered
  - `hasLanguage(domain, lang)` - Check if language is registered
- `getCommonMessages(lang)` - Get built-in common messages

### Progress Module

- `createProgressIndicator()` - Create console-based progress indicator
- `formatSuccess(message)` - Format success message with ✅
- `formatError(message)` - Format error message with ❌
- `formatInfo(message)` - Format info message with ℹ️
- `formatWarning(message)` - Format warning message with ⚠️
- `formatProgress(message)` - Format progress message with ⏳

### Validation Module

**Numeric:**

- `validatePositiveInteger(value, fieldName?)` - Validate positive integer string
- `validateNumericId(value, fieldName?)` - Validate positive integer (string or number)
- `validateRange(value, min, max, fieldName?)` - Validate number within range

**Text:**

- `validateNonEmptyString(value, fieldName?)` - Validate non-empty string
- `validateMaxLength(value, maxLength, fieldName?)` - Validate string length
- `validateString(value, maxLength, fieldName?)` - Validate non-empty + max length
- `validatePattern(value, pattern, fieldName?, description?)` - Validate regex pattern

## TypeScript Support

All modules are fully typed with TypeScript. Import types directly:

```typescript
import type { Language, OutputFormat, ProgressIndicator } from '@pleaseai/cli-toolkit'
```

## Testing

```bash
bun test
bun test --coverage
```

## License

MIT

## Author

PleaseAI
