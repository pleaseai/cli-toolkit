import { describe, expect, test } from 'bun:test'
import { filterFields, parseFields } from '../../src/output/filter'

describe('parseFields', () => {
  test('should parse comma-separated field list', () => {
    const result = parseFields('number,title,state')
    expect(result).toEqual(['number', 'title', 'state'])
  })

  test('should trim whitespace from fields', () => {
    const result = parseFields('  number , title  , state  ')
    expect(result).toEqual(['number', 'title', 'state'])
  })

  test('should return null for boolean true', () => {
    const result = parseFields(true)
    expect(result).toBeNull()
  })

  test('should return null for undefined', () => {
    const result = parseFields(undefined)
    expect(result).toBeNull()
  })

  test('should filter out empty fields', () => {
    const result = parseFields('number,,title')
    expect(result).toEqual(['number', 'title'])
  })
})

describe('filterFields', () => {
  test('should filter object to include only specified fields', () => {
    const data = { a: 1, b: 2, c: 3 }
    const result = filterFields(data, ['a', 'c'])
    expect(result).toEqual({ a: 1, c: 3 })
  })

  test('should filter array to include only specified fields', () => {
    const data = [
      { a: 1, b: 2, c: 3 },
      { a: 4, b: 5, c: 6 },
    ]
    const result = filterFields(data, ['a', 'c'])
    expect(result).toEqual([
      { a: 1, c: 3 },
      { a: 4, c: 6 },
    ])
  })

  test('should return original data when fields is null', () => {
    const data = { a: 1, b: 2, c: 3 }
    const result = filterFields(data, null)
    expect(result).toEqual(data)
  })

  test('should handle empty array', () => {
    const data: any[] = []
    const result = filterFields(data, ['a'])
    expect(result).toEqual([])
  })
})
