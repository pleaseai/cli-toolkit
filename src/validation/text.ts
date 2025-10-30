/**
 * Validate that a string is not empty (after trimming)
 *
 * @param value - String value to validate
 * @param fieldName - Field name for error messages (default: "Value")
 * @returns Trimmed non-empty string
 * @throws {Error} If value is empty or undefined
 *
 * @example
 * ```typescript
 * validateNonEmptyString('hello')     // 'hello'
 * validateNonEmptyString('  hello  ') // 'hello' (trimmed)
 * validateNonEmptyString('')          // throws Error
 * validateNonEmptyString('   ')       // throws Error
 * validateNonEmptyString(undefined)   // throws Error
 * validateNonEmptyString('', 'Body')  // throws Error (custom error message)
 * ```
 */
export function validateNonEmptyString(
  value: string | undefined,
  fieldName = 'Value',
): string {
  if (!value || value.trim().length === 0) {
    throw new Error(`${fieldName} cannot be empty`)
  }
  return value.trim()
}

/**
 * Validate that a string does not exceed a maximum length
 *
 * @param value - String value to validate
 * @param maxLength - Maximum allowed length
 * @param fieldName - Field name for error messages (default: "Value")
 * @returns The validated string
 * @throws {Error} If value exceeds maxLength
 *
 * @example
 * ```typescript
 * validateMaxLength('hello', 10)                // 'hello'
 * validateMaxLength('hello', 3)                 // throws Error
 * validateMaxLength('hello', 10, 'Title')       // 'hello' (custom error message)
 * ```
 */
export function validateMaxLength(
  value: string,
  maxLength: number,
  fieldName = 'Value',
): string {
  if (value.length > maxLength) {
    throw new Error(
      `${fieldName} cannot exceed ${maxLength} characters (got ${value.length})`,
    )
  }
  return value
}

/**
 * Validate that a string meets both non-empty and max-length requirements
 *
 * @param value - String value to validate
 * @param maxLength - Maximum allowed length
 * @param fieldName - Field name for error messages (default: "Value")
 * @returns Trimmed, validated string
 * @throws {Error} If value is empty or exceeds maxLength
 *
 * @example
 * ```typescript
 * validateString('hello', 10)           // 'hello'
 * validateString('  hello  ', 10)       // 'hello' (trimmed)
 * validateString('', 10)                // throws Error (empty)
 * validateString('hello world', 5)      // throws Error (too long)
 * ```
 */
export function validateString(
  value: string | undefined,
  maxLength: number,
  fieldName = 'Value',
): string {
  const trimmed = validateNonEmptyString(value, fieldName)
  return validateMaxLength(trimmed, maxLength, fieldName)
}

/**
 * Validate that a string matches a specific pattern
 *
 * @param value - String value to validate
 * @param pattern - Regular expression pattern
 * @param fieldName - Field name for error messages (default: "Value")
 * @param patternDescription - Human-readable pattern description
 * @returns The validated string
 * @throws {Error} If value doesn't match the pattern
 *
 * @example
 * ```typescript
 * validatePattern('abc123', /^[a-z0-9]+$/, 'Username')
 * // 'abc123'
 *
 * validatePattern('abc-123', /^[a-z0-9]+$/, 'Username')
 * // throws Error: Username must match pattern
 *
 * validatePattern('abc-123', /^[a-z0-9]+$/, 'Username', 'alphanumeric only')
 * // throws Error: Username must be alphanumeric only
 * ```
 */
export function validatePattern(
  value: string,
  pattern: RegExp,
  fieldName = 'Value',
  patternDescription?: string,
): string {
  if (!pattern.test(value)) {
    const description = patternDescription
      ? `be ${patternDescription}`
      : `match pattern ${pattern.toString()}`
    throw new Error(`${fieldName} must ${description}`)
  }
  return value
}
