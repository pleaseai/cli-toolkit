import { describe, expect, test } from 'bun:test'
import { isStructuredOutput, isValidFormat, validateFormat } from '../../src/output/json'

describe('isValidFormat', () => {
  test('should return true for json', () => {
    expect(isValidFormat('json')).toBe(true)
  })

  test('should return true for toon', () => {
    expect(isValidFormat('toon')).toBe(true)
  })

  test('should return false for invalid format', () => {
    expect(isValidFormat('xml')).toBe(false)
  })

  test('should return false for uppercase', () => {
    expect(isValidFormat('JSON')).toBe(false)
  })

  test('should return false for non-string', () => {
    expect(isValidFormat(123)).toBe(false)
  })
})

describe('validateFormat', () => {
  test('should return format for valid json', () => {
    expect(validateFormat('json')).toBe('json')
  })

  test('should return format for valid toon', () => {
    expect(validateFormat('toon')).toBe('toon')
  })

  test('should throw for invalid format', () => {
    expect(() => validateFormat('xml')).toThrow('Invalid output format: xml')
  })

  test('should throw for undefined', () => {
    expect(() => validateFormat(undefined)).toThrow('Invalid output format: undefined')
  })

  test('should throw for null', () => {
    expect(() => validateFormat(null)).toThrow('Invalid output format: null')
  })
})

describe('isStructuredOutput', () => {
  test('should return true when json option is provided', () => {
    expect(isStructuredOutput({ json: true })).toBe(true)
    expect(isStructuredOutput({ json: 'number,title' })).toBe(true)
  })

  test('should return true when format option is provided', () => {
    expect(isStructuredOutput({ format: 'json' })).toBe(true)
    expect(isStructuredOutput({ format: 'toon' })).toBe(true)
  })

  test('should return true when both options are provided', () => {
    expect(isStructuredOutput({ json: true, format: 'toon' })).toBe(true)
  })

  test('should return false when neither option is provided', () => {
    expect(isStructuredOutput({})).toBe(false)
  })
})
