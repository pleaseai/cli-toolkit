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
export const UNKNOWN_ERROR = 'UNKNOWN'

/**
 * Structured error for CLI / agent-facing tools.
 *
 * Carries a machine-readable `code` and optional `suggestions` alongside the
 * human message, so callers can render a consistent structured payload
 * (`{ error, code, help }`) and map the error to a stable process exit code.
 *
 * Because it extends the built-in `Error`, existing `try/catch` and
 * `expect(...).toThrow(message)` checks keep working unchanged.
 *
 * @example
 * ```typescript
 * throw new CliError(
 *   'Issue #999 not found',
 *   'NOT_FOUND',
 *   ['Run `gh-please issue list` to see open issues'],
 * )
 * ```
 */
export class CliError extends Error {
  /**
   * @param message - Human-readable error message
   * @param code - Machine-readable error code (default: `'UNKNOWN'`)
   * @param suggestions - Optional actionable hints surfaced to the user/agent
   */
  constructor(
    message: string,
    public readonly code: string = UNKNOWN_ERROR,
    public readonly suggestions: string[] = [],
  ) {
    super(message)
    this.name = 'CliError'
  }
}

/**
 * Map an error to a process exit code.
 *
 * Validation errors return `2` (usage error), everything else returns `1`.
 * Mirrors the common Unix convention where `2` signals misuse/invalid input.
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
  if (error instanceof CliError && error.code === VALIDATION_ERROR) {
    return 2
  }
  return 1
}
