import { describe, expect, test } from 'bun:test'
import { validateNumericId, validatePositiveInteger, validateRange } from '../../src/validation/numeric'

describe('validatePositiveInteger', () => {
  test('should validate positive integer string', () => {
    expect(validatePositiveInteger('123')).toBe(123)
  })

  test('should reject zero', () => {
    expect(() => validatePositiveInteger('0')).toThrow('Value must be a positive integer')
  })

  test('should reject negative numbers', () => {
    expect(() => validatePositiveInteger('-1')).toThrow('Value must be a positive integer')
  })

  test('should reject non-numeric strings', () => {
    expect(() => validatePositiveInteger('abc')).toThrow('Value must be a positive integer')
  })

  test('should reject decimal numbers', () => {
    expect(() => validatePositiveInteger('12.34')).toThrow('Value must be a positive integer')
  })

  test('should use custom field name in error message', () => {
    expect(() => validatePositiveInteger('0', 'ID')).toThrow('ID must be a positive integer')
  })
})

describe('validateNumericId', () => {
  test('should validate positive integer string', () => {
    expect(validateNumericId('123')).toBe(123)
  })

  test('should validate positive integer number', () => {
    expect(validateNumericId(123)).toBe(123)
  })

  test('should reject zero', () => {
    expect(() => validateNumericId(0)).toThrow('ID must be a positive integer')
  })

  test('should reject negative numbers', () => {
    expect(() => validateNumericId(-1)).toThrow('ID must be a positive integer')
  })

  test('should reject NaN', () => {
    expect(() => validateNumericId(Number.NaN)).toThrow('ID must be a positive integer')
  })

  test('should reject decimal numbers', () => {
    expect(() => validateNumericId(12.34)).toThrow('ID must be a positive integer')
  })

  test('should use custom field name in error message', () => {
    expect(() => validateNumericId('0', 'Comment ID')).toThrow('Comment ID must be a positive integer')
  })
})

describe('validateRange', () => {
  test('should validate value within range', () => {
    expect(validateRange(5, 1, 10)).toBe(5)
  })

  test('should validate minimum value', () => {
    expect(validateRange(1, 1, 10)).toBe(1)
  })

  test('should validate maximum value', () => {
    expect(validateRange(10, 1, 10)).toBe(10)
  })

  test('should reject value below minimum', () => {
    expect(() => validateRange(0, 1, 10)).toThrow('Value must be between 1 and 10')
  })

  test('should reject value above maximum', () => {
    expect(() => validateRange(11, 1, 10)).toThrow('Value must be between 1 and 10')
  })

  test('should use custom field name in error message', () => {
    expect(() => validateRange(0, 1, 10, 'Port')).toThrow('Port must be between 1 and 10')
  })
})
