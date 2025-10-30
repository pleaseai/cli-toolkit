import { describe, expect, test } from 'bun:test'
import { validateMaxLength, validateNonEmptyString, validatePattern, validateString } from '../../src/validation/text'

describe('validateNonEmptyString', () => {
  test('should validate non-empty string', () => {
    expect(validateNonEmptyString('hello')).toBe('hello')
  })

  test('should trim and validate string with whitespace', () => {
    expect(validateNonEmptyString('  hello  ')).toBe('hello')
  })

  test('should reject empty string', () => {
    expect(() => validateNonEmptyString('')).toThrow('Value cannot be empty')
  })

  test('should reject whitespace-only string', () => {
    expect(() => validateNonEmptyString('   ')).toThrow('Value cannot be empty')
  })

  test('should reject undefined', () => {
    expect(() => validateNonEmptyString(undefined)).toThrow('Value cannot be empty')
  })

  test('should use custom field name in error message', () => {
    expect(() => validateNonEmptyString('', 'Body')).toThrow('Body cannot be empty')
  })
})

describe('validateMaxLength', () => {
  test('should validate string within max length', () => {
    expect(validateMaxLength('hello', 10)).toBe('hello')
  })

  test('should validate string at max length', () => {
    expect(validateMaxLength('hello', 5)).toBe('hello')
  })

  test('should reject string exceeding max length', () => {
    expect(() => validateMaxLength('hello', 3)).toThrow(
      'Value cannot exceed 3 characters (got 5)',
    )
  })

  test('should use custom field name in error message', () => {
    expect(() => validateMaxLength('hello', 3, 'Title')).toThrow(
      'Title cannot exceed 3 characters (got 5)',
    )
  })
})

describe('validateString', () => {
  test('should validate non-empty string within max length', () => {
    expect(validateString('hello', 10)).toBe('hello')
  })

  test('should trim and validate', () => {
    expect(validateString('  hello  ', 10)).toBe('hello')
  })

  test('should reject empty string', () => {
    expect(() => validateString('', 10)).toThrow('Value cannot be empty')
  })

  test('should reject string exceeding max length', () => {
    expect(() => validateString('hello world', 5)).toThrow(
      'Value cannot exceed 5 characters',
    )
  })
})

describe('validatePattern', () => {
  test('should validate string matching pattern', () => {
    expect(validatePattern('abc123', /^[a-z0-9]+$/)).toBe('abc123')
  })

  test('should reject string not matching pattern', () => {
    expect(() => validatePattern('abc-123', /^[a-z0-9]+$/)).toThrow(
      'Value must match pattern',
    )
  })

  test('should use custom field name in error message', () => {
    expect(() => validatePattern('abc-123', /^[a-z0-9]+$/, 'Username')).toThrow(
      'Username must match pattern',
    )
  })

  test('should use pattern description in error message', () => {
    expect(() =>
      validatePattern('abc-123', /^[a-z0-9]+$/, 'Username', 'alphanumeric only'),
    ).toThrow('Username must be alphanumeric only')
  })
})
