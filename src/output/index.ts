/**
 * Output utilities for machine-readable and LLM-optimized CLI output
 *
 * Provides utilities for formatting command output as JSON or TOON format.
 * Supports field selection and follows GitHub CLI output patterns.
 *
 * @module output
 */

// Types
export type { OutputFormat, OutputOptions } from './types.ts'

// Field filtering
export { parseFields, filterFields } from './filter.ts'

// TOON output
export { encodeToon, outputToon } from './toon.ts'

// JSON output and format validation
export {
  outputJson,
  outputData,
  isValidFormat,
  validateFormat,
  isStructuredOutput,
} from './json.ts'
