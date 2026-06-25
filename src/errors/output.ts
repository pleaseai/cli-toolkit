import { isCliError, UNKNOWN_ERROR } from './error.ts'

/**
 * Structured, machine-readable error payload.
 *
 * Designed to be rendered directly with the output module
 * (`outputData(payload, 'toon')` / `outputData(payload, 'json')`), giving
 * agents a stable shape to parse instead of free-form stderr text.
 */
export interface ErrorOutput {
  /** Human-readable error message */
  error: string
  /** Machine-readable error code */
  code: string
  /** Optional actionable hints (omitted when empty) */
  help?: string[]
}

/**
 * Build a structured error payload from explicit fields.
 *
 * The `help` key is omitted entirely when there are no suggestions, keeping
 * the output minimal.
 *
 * @param message - Human-readable error message
 * @param code - Machine-readable error code
 * @param suggestions - Optional actionable hints
 * @returns Structured error payload
 *
 * @example
 * ```typescript
 * errorOutput('Invalid output format: xml', 'VALIDATION_ERROR', [
 *   'Supported formats: json, toon',
 * ])
 * // { error: 'Invalid output format: xml', code: 'VALIDATION_ERROR', help: ['Supported formats: json, toon'] }
 * ```
 */
export function errorOutput(
  message: string,
  code: string,
  suggestions: string[] = [],
): ErrorOutput {
  const output: ErrorOutput = { error: message, code }
  if (suggestions.length > 0) {
    output.help = suggestions
  }
  return output
}

/**
 * Convert any thrown value into a structured error payload.
 *
 * - {@link CliError} preserves its `code` and `suggestions`.
 * - A generic `Error` keeps its message with code `'UNKNOWN_ERROR'`.
 * - Any other value is stringified with code `'UNKNOWN_ERROR'`.
 *
 * @param error - Any thrown value
 * @returns Structured error payload
 *
 * @example
 * ```typescript
 * try {
 *   await run()
 * } catch (error) {
 *   outputData(toErrorOutput(error), 'toon')
 *   process.exitCode = exitCodeForError(error)
 * }
 * ```
 */
export function toErrorOutput(error: unknown): ErrorOutput {
  if (isCliError(error)) {
    return errorOutput(error.message, error.code, error.suggestions ?? [])
  }
  const message = error instanceof Error ? error.message : String(error)
  return errorOutput(message, UNKNOWN_ERROR)
}
