import type { VercelErrorOptions } from '@vercel/error'
import { hasCode, VercelError } from '@vercel/error'

/**
 * Error code for validation failures (bad/invalid user input).
 *
 * Maps to process exit code `2` via {@link exitCodeForError}, following the
 * convention that usage/validation errors are distinct from runtime failures.
 */
export const VALIDATION_ERROR = 'VALIDATION_ERROR'

/**
 * Default error code used when an error has no more specific classification.
 *
 * Maps to process exit code `1` via {@link exitCodeForError}.
 */
export const UNKNOWN_ERROR = 'UNKNOWN_ERROR'

/**
 * Options accepted by {@link CliError}.
 *
 * Identical to `VercelErrorOptions` from `@vercel/error`, so a `CliError` can
 * carry the full structured context (`reason`, `hint`, `fix`, `link`,
 * `metadata`, `cause`, ...) and stays compatible with `createErrors()` via
 * the `ErrorClass` option.
 */
export type CliErrorOptions = VercelErrorOptions

/**
 * Structured error for CLI / agent-facing tools.
 *
 * Built on {@link VercelError}, so beyond the machine-readable `code` it can
 * answer the full set of questions a human or agent needs: *what* happened
 * (`message`), *why* (`reason`), *what could help* (`hint`), *how to fix it*
 * (`fix`), and *where to learn more* (`link`).
 *
 * Unlike the base class, `code` is always set (defaulting to
 * {@link UNKNOWN_ERROR}) so callers can rely on it when rendering the
 * structured payload and mapping to a process exit code.
 *
 * Because it extends the built-in `Error`, existing `try/catch` and
 * `expect(...).toThrow(message)` checks keep working unchanged. Its
 * `toString()` is environment-aware: colored tree output on a TTY, plain
 * indented text when piped (inherited from `VercelError`).
 *
 * @example
 * ```typescript
 * throw new CliError('Issue #999 not found', {
 *   code: 'NOT_FOUND',
 *   hint: 'The issue may have been closed or transferred.',
 *   fix: 'Run `gh-please issue list` to see open issues',
 * })
 * ```
 */
export class CliError extends VercelError {
  /** Always present; defaults to {@link UNKNOWN_ERROR}. */
  declare readonly code: string

  /**
   * @param message - Human-readable error message
   * @param options - Structured context; `code` defaults to `'UNKNOWN_ERROR'`
   */
  constructor(message: string, options: CliErrorOptions = {}) {
    super(message, { ...options, code: options.code ?? UNKNOWN_ERROR })
    // Hardcoded (not derived from `this.constructor.name`) so minified
    // bundles and the structural check in `isCliError` stay reliable.
    this.name = 'CliError'
  }
}

/**
 * Identify a {@link CliError}, tolerating multiple loaded copies of this module.
 *
 * A bare `instanceof` check fails when more than one copy of `CliError` exists
 * in the running process — e.g. a consumer importing helpers from two subpaths
 * (each bundled with its own copy), or two versions of the toolkit coexisting in
 * a dependency tree. Each copy defines a structurally identical but
 * reference-distinct class, so `instanceof` silently misclassifies the error and
 * its structured fields are lost. Falling back to a structural `name`/`code`
 * check keeps detection reliable across those boundaries (including errors
 * from pre-`@vercel/error` versions of this toolkit).
 *
 * @param error - Any thrown value
 * @returns `true` if the value is a `CliError` (or structurally equivalent)
 */
export function isCliError(error: unknown): error is CliError {
  if (error instanceof CliError) {
    return true
  }
  return (
    error instanceof Error
    && error.name === 'CliError'
    && 'code' in error
    && typeof (error as { code: unknown }).code === 'string'
  )
}

/**
 * Map an error to a process exit code.
 *
 * Validation errors return `2` (usage error), everything else returns `1`.
 * Mirrors the common Unix convention where `2` signals misuse/invalid input.
 *
 * Uses `hasCode` from `@vercel/error`, so any error-like value tagged with
 * {@link VALIDATION_ERROR} maps to `2` — `CliError`, a plain `VercelError`,
 * or a structurally equivalent error from another module copy.
 *
 * @param error - Any thrown value
 * @returns Exit code (`2` for validation errors, otherwise `1`)
 *
 * @example
 * ```typescript
 * try {
 *   validateNonEmptyString('')
 * } catch (error) {
 *   process.exitCode = exitCodeForError(error) // 2
 * }
 * ```
 */
export function exitCodeForError(error: unknown): number {
  if (hasCode(error, VALIDATION_ERROR)) {
    return 2
  }
  return 1
}
