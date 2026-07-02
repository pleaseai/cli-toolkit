import { getMessage, isVercelError } from '@vercel/error'
import { isCliError, UNKNOWN_ERROR } from './error.ts'

/**
 * Structured, machine-readable error payload.
 *
 * Mirrors the context fields of `VercelError` in a flat shape, designed to be
 * rendered directly with the output module (`outputData(payload, 'toon')` /
 * `outputData(payload, 'json')`), giving agents a stable shape to parse
 * instead of free-form stderr text.
 *
 * Optional keys are omitted entirely when absent, keeping the output minimal.
 */
export interface ErrorOutput {
  /** Human-readable error message — *what* happened */
  error: string
  /** Machine-readable error code */
  code: string
  /** Root-cause explanation — *why* it happened */
  reason?: string
  /** Advisory tip for the developer/agent */
  hint?: string
  /** Actionable step that resolves the error */
  fix?: string
  /** URL to documentation for this error */
  link?: string
}

/** Optional context fields accepted by {@link errorOutput}. */
export interface ErrorOutputDetails {
  reason?: string
  hint?: string
  fix?: string
  link?: string
}

/**
 * Build a structured error payload from explicit fields.
 *
 * Detail keys (`reason`, `hint`, `fix`, `link`) are included only when
 * present, keeping the output minimal.
 *
 * @param message - Human-readable error message
 * @param code - Machine-readable error code
 * @param details - Optional context fields
 * @returns Structured error payload
 *
 * @example
 * ```typescript
 * errorOutput('Invalid output format: xml', 'VALIDATION_ERROR', {
 *   fix: 'Use one of the supported formats: json, toon',
 * })
 * // { error: 'Invalid output format: xml', code: 'VALIDATION_ERROR', fix: 'Use one of...' }
 * ```
 */
export function errorOutput(
  message: string,
  code: string,
  details: ErrorOutputDetails = {},
): ErrorOutput {
  const output: ErrorOutput = { error: message, code }
  if (details.reason !== undefined) {
    output.reason = details.reason
  }
  if (details.hint !== undefined) {
    output.hint = details.hint
  }
  if (details.fix !== undefined) {
    output.fix = details.fix
  }
  if (details.link !== undefined) {
    output.link = details.link
  }
  return output
}

/**
 * Convert any thrown value into a structured error payload.
 *
 * - {@link CliError} (and any `VercelError`) preserves its `code` plus the
 *   structured context fields (`reason`, `hint`, `fix`, `link`).
 * - A `CliError` from a pre-`@vercel/error` copy of this toolkit maps its
 *   legacy `suggestions` array onto `hint`.
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
  if (isVercelError(error)) {
    return errorOutput(error.message, error.code ?? UNKNOWN_ERROR, {
      reason: error.reason,
      hint: error.hint,
      fix: error.fix,
      link: error.link,
    })
  }
  if (isCliError(error)) {
    // Structurally-detected copy from another bundle or an older toolkit
    // version; legacy `suggestions` (if any) collapse into `hint`.
    const suggestions = (error as { suggestions?: unknown }).suggestions
    const hint = Array.isArray(suggestions) && suggestions.length > 0
      ? suggestions.join('\n')
      : undefined
    return errorOutput(error.message, error.code, { hint })
  }
  return errorOutput(getMessage(error) ?? String(error), UNKNOWN_ERROR)
}
