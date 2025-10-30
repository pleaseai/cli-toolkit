import type { OutputFormat, OutputOptions } from './types.ts'
import { filterFields } from './filter.ts'
import { outputToon } from './toon.ts'

/**
 * Output data as formatted JSON to stdout
 *
 * Uses 2-space indentation for readability while maintaining machine-parseable format.
 *
 * @param data - Data to serialize as JSON
 *
 * @example
 * ```typescript
 * outputJson({ foo: 'bar' })
 * // Output:
 * // {
 * //   "foo": "bar"
 * // }
 *
 * outputJson([{ number: 1 }, { number: 2 }])
 * // Output:
 * // [
 * //   {
 * //     "number": 1
 * //   },
 * //   {
 * //     "number": 2
 * //   }
 * // ]
 * ```
 */
export function outputJson(data: any): void {
  console.log(JSON.stringify(data, null, 2))
}

/**
 * Valid output format values
 */
const VALID_FORMATS: readonly OutputFormat[] = ['json', 'toon'] as const

/**
 * Check if a string is a valid output format
 *
 * @param format - Format string to validate
 * @returns True if format is valid ('json' or 'toon')
 *
 * @example
 * ```typescript
 * isValidFormat('json')  // true
 * isValidFormat('toon')  // true
 * isValidFormat('xml')   // false
 * isValidFormat('JSON')  // false (case-sensitive)
 * ```
 */
export function isValidFormat(format: unknown): format is OutputFormat {
  return typeof format === 'string' && VALID_FORMATS.includes(format as OutputFormat)
}

/**
 * Validate output format and throw error if invalid
 *
 * @param format - Format string to validate
 * @returns The validated format
 * @throws {Error} If format is not valid
 *
 * @example
 * ```typescript
 * validateFormat('json')  // 'json'
 * validateFormat('toon')  // 'toon'
 * validateFormat('xml')   // throws Error
 * ```
 */
export function validateFormat(format: unknown): OutputFormat {
  if (!isValidFormat(format)) {
    const formatStr = format === undefined || format === null
      ? String(format)
      : `${format}`
    throw new Error(
      `Invalid output format: ${formatStr}. Supported formats: ${VALID_FORMATS.join(', ')}`,
    )
  }
  return format
}

/**
 * Output data in specified format (JSON or TOON) to stdout
 *
 * Unified output function that supports multiple formats with optional field filtering.
 * This is the preferred method for commands that support both JSON and TOON output.
 *
 * @param data - Data to serialize and output
 * @param format - Output format ('json' | 'toon'), defaults to 'json'
 * @param fields - Optional field filtering (null = all fields)
 *
 * @example
 * ```typescript
 * const issues = [{ number: 123, title: 'Test', state: 'OPEN', extra: 'data' }]
 *
 * // JSON output with all fields
 * outputData(issues, 'json')
 *
 * // TOON output with all fields (58.9% token savings)
 * outputData(issues, 'toon')
 *
 * // JSON output with field filtering
 * outputData(issues, 'json', ['number', 'title'])
 * // [{ "number": 123, "title": "Test" }]
 *
 * // TOON output with field filtering
 * outputData(issues, 'toon', ['number', 'title'])
 * // [1<TAB>]{number<TAB>title}:
 * //   123<TAB>Test
 * ```
 */
export function outputData(
  data: any,
  format: OutputFormat = 'json',
  fields?: string[] | null,
): void {
  // Validate format if explicitly provided
  if (format !== 'json') {
    validateFormat(format)
  }

  // Apply field filtering if specified
  const filteredData = fields ? filterFields(data, fields) : data

  // Output in requested format
  const outputFunction = format === 'toon' ? outputToon : outputJson
  outputFunction(filteredData)
}

/**
 * Determine if structured output should be used based on command options
 *
 * Helper function to simplify the common pattern across commands for determining
 * whether to use structured output (JSON/TOON) or human-readable output.
 *
 * @param options - Command options object
 * @param options.json - JSON output flag or field selection string
 * @param options.format - Output format ('json' or 'toon')
 * @returns True if structured output should be used
 *
 * @example
 * ```typescript
 * const shouldUseStructuredOutput = isStructuredOutput(options)
 * if (shouldUseStructuredOutput) {
 *   outputData(data, options.format || 'json', parseFields(options.json))
 * } else {
 *   // Human-readable output
 * }
 * ```
 */
export function isStructuredOutput(options: OutputOptions): boolean {
  return options.json !== undefined || options.format !== undefined
}
