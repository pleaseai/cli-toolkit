import { CliError, VALIDATION_ERROR } from '../errors/error.ts'

/**
 * Validate that a string represents a positive integer
 *
 * @param value - String value to validate
 * @param fieldName - Field name for error messages (default: "Value")
 * @returns Parsed positive integer
 * @throws {CliError} If value is not a positive integer (code: `VALIDATION_ERROR`)
 *
 * @example
 * ```typescript
 * validatePositiveInteger('123') // 123
 * validatePositiveInteger('0')   // throws Error
 * validatePositiveInteger('-1')  // throws Error
 * validatePositiveInteger('abc') // throws Error
 * validatePositiveInteger('123', 'ID') // 123 (custom error message)
 * ```
 */
export function validatePositiveInteger(value: string, fieldName = 'Value'): number {
  // Check if the string contains only digits
  if (!/^\d+$/.test(value)) {
    throw new CliError(`${fieldName} must be a positive integer`, VALIDATION_ERROR)
  }

  const parsed = Number.parseInt(value, 10)
  if (Number.isNaN(parsed) || parsed <= 0) {
    throw new CliError(`${fieldName} must be a positive integer`, VALIDATION_ERROR)
  }
  return parsed
}

/**
 * Validate that a value is a positive integer (string or number)
 *
 * @param value - Value to validate (string or number)
 * @param fieldName - Field name for error messages (default: "Value")
 * @returns Parsed positive integer
 * @throws {CliError} If value is not a positive integer (code: `VALIDATION_ERROR`)
 *
 * @example
 * ```typescript
 * validateNumericId('123')  // 123
 * validateNumericId(123)    // 123
 * validateNumericId(0)      // throws Error
 * validateNumericId(-1)     // throws Error
 * ```
 */
export function validateNumericId(value: string | number, fieldName = 'ID'): number {
  const num = typeof value === 'string' ? Number.parseInt(value, 10) : value

  if (Number.isNaN(num) || num <= 0 || !Number.isInteger(num)) {
    throw new CliError(`${fieldName} must be a positive integer`, VALIDATION_ERROR)
  }

  return num
}

/**
 * Validate that a value is within a specific range
 *
 * @param value - Number to validate
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @param fieldName - Field name for error messages (default: "Value")
 * @returns The validated number
 * @throws {CliError} If value is outside the range (code: `VALIDATION_ERROR`)
 *
 * @example
 * ```typescript
 * validateRange(5, 1, 10)      // 5
 * validateRange(0, 1, 10)      // throws Error
 * validateRange(11, 1, 10)     // throws Error
 * validateRange(5, 1, 10, 'Port') // 5 (custom error message)
 * ```
 */
export function validateRange(
  value: number,
  min: number,
  max: number,
  fieldName = 'Value',
): number {
  if (value < min || value > max) {
    throw new CliError(`${fieldName} must be between ${min} and ${max}`, VALIDATION_ERROR)
  }
  return value
}
