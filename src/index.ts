/**
 * @pleaseai/cli-toolkit
 *
 * Shared CLI utilities for LLM-focused command-line tools.
 * Provides output formatting, internationalization, progress indicators,
 * and input validation.
 *
 * @module cli-toolkit
 */

// ============================================================================
// Errors Module
// ============================================================================

export {
  // Structured error class, codes, and exit-code mapping
  CliError,
  // Error factory (from @vercel/error)
  createErrors,
  // Structured error output
  errorOutput,
  exitCodeForError,
  // Message / cause-chain helpers (from @vercel/error)
  getMessage,
  getRootCause,
  // Guards (from @vercel/error)
  hasCode,
  isCliError,
  isError,
  isErrorLike,
  isVercelError,
  toErrorOutput,
  UNKNOWN_ERROR,
  VALIDATION_ERROR,
  // Base error class (from @vercel/error)
  VercelError,
} from './errors/index.ts'

export type {
  CliErrorOptions,
  CreateErrorsOptions,
  ErrorAttributes,
  ErrorFactory,
  ErrorLike,
  ErrorMetadata,
  ErrorOutput,
  ErrorOutputDetails,
  VercelErrorOptions,
} from './errors/index.ts'

// ============================================================================
// i18n Module
// ============================================================================

export {
  // Common messages
  commonMessages,
  // Language detection
  detectSystemLanguage,
  getCommonMessages,
  i18n,
  // Message management
  I18nManager,
} from './i18n/index.ts'

export type { CommonMessages, Language, MessageDictionary } from './i18n/types.ts'

// ============================================================================
// Output Module
// ============================================================================

export {
  // Path display helpers
  collapseHomeDirectory,
  // TOON output
  encodeToon,
  filterFields,
  isStructuredOutput,
  isValidFormat,
  outputData,
  // JSON output and format validation
  outputJson,
  outputToon,
  // Field filtering
  parseFields,
  validateFormat,
} from './output/index.ts'

export type { OutputFormat, OutputOptions } from './output/types.ts'

// ============================================================================
// Progress Module
// ============================================================================

export {
  // Progress indicator
  createProgressIndicator,
  formatError,
  formatInfo,
  formatProgress,
  // Message formatters
  formatSuccess,
  formatWarning,
} from './progress/index.ts'

export type { ProgressIndicator } from './progress/indicator.ts'

// ============================================================================
// Validation Module
// ============================================================================

export {
  validateMaxLength,
  // Text validation
  validateNonEmptyString,
  validateNumericId,
  validatePattern,
  // Numeric validation
  validatePositiveInteger,
  validateRange,
  validateString,
} from './validation/index.ts'
