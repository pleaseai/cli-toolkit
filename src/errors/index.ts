/**
 * Structured error utilities for CLI / agent-facing tools.
 *
 * Built on `@vercel/error`: provides a structured error class with
 * machine-readable codes and rich context (`reason`, `hint`, `fix`, `link`),
 * exit-code mapping, and helpers to render errors as a stable flat payload.
 *
 * Core primitives from `@vercel/error` (`VercelError`, `createErrors`,
 * guards, and cause-chain helpers) are re-exported so consumers don't need a
 * direct dependency.
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

export type { CliErrorOptions } from './error.ts'

// Structured error output
export { errorOutput, toErrorOutput } from './output.ts'
export type { ErrorOutput, ErrorOutputDetails } from './output.ts'

// Core primitives from @vercel/error
export {
  createErrors,
  getMessage,
  getRootCause,
  hasCode,
  isError,
  isErrorLike,
  isVercelError,
  VercelError,
} from '@vercel/error'
export type {
  CreateErrorsOptions,
  ErrorAttributes,
  ErrorFactory,
  ErrorLike,
  ErrorMetadata,
  VercelErrorOptions,
} from '@vercel/error'
