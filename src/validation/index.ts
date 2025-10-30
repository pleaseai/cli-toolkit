/**
 * Input validation utilities
 *
 * Provides functions for validating common input types like numbers,
 * strings, and patterns with clear error messages.
 *
 * @module validation
 */

// Numeric validation
export {
  validateNumericId,
  validatePositiveInteger,
  validateRange,
} from './numeric.ts'

// Text validation
export {
  validateMaxLength,
  validateNonEmptyString,
  validatePattern,
  validateString,
} from './text.ts'
