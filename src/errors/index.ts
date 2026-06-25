/**
 * Structured error utilities for CLI / agent-facing tools.
 *
 * Provides a structured error class with machine-readable codes and
 * suggestions, exit-code mapping, and helpers to render errors as a stable
 * `{ error, code, help }` payload.
 *
 * @module errors
 */

// Error class, codes, and exit-code mapping
export {
  CliError,
  exitCodeForError,
  isCliError,
  UNKNOWN_ERROR,
  VALIDATION_ERROR,
} from './error.ts'

// Structured error output
export { errorOutput, toErrorOutput } from './output.ts'
export type { ErrorOutput } from './output.ts'
