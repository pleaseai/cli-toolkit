import { describe, expect, spyOn, test } from 'bun:test'
import { filterFields } from '../../src/output/filter'
import { isStructuredOutput, isValidFormat, outputData, outputJson, validateFormat } from '../../src/output/json'
import { outputToon } from '../../src/output/toon'

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

describe('outputJson', () => {
  test('should output object as formatted JSON', () => {
    const spy = spyOn(console, 'log')
    const data = { foo: 'bar', number: 42 }

    outputJson(data)

    expect(spy).toHaveBeenCalledWith(JSON.stringify(data, null, 2))
    spy.mockRestore()
  })

  test('should output array as formatted JSON', () => {
    const spy = spyOn(console, 'log')
    const data = [{ id: 1 }, { id: 2 }]

    outputJson(data)

    expect(spy).toHaveBeenCalledWith(JSON.stringify(data, null, 2))
    spy.mockRestore()
  })

  test('should output primitive values', () => {
    const spy = spyOn(console, 'log')

    outputJson('test')
    expect(spy).toHaveBeenCalledWith('"test"')

    outputJson(123)
    expect(spy).toHaveBeenCalledWith('123')

    outputJson(true)
    expect(spy).toHaveBeenCalledWith('true')

    spy.mockRestore()
  })
})

describe('outputData', () => {
  test('should output JSON format by default', () => {
    const spy = spyOn(console, 'log')
    const data = { test: 'data' }

    outputData(data)

    expect(spy).toHaveBeenCalledWith(JSON.stringify(data, null, 2))
    spy.mockRestore()
  })

  test('should output JSON format when explicitly specified', () => {
    const spy = spyOn(console, 'log')
    const data = { test: 'data' }

    outputData(data, 'json')

    expect(spy).toHaveBeenCalledWith(JSON.stringify(data, null, 2))
    spy.mockRestore()
  })

  test('should output TOON format when specified', () => {
    const spy = spyOn(console, 'log')
    const data = [{ number: 123, title: 'Test' }]

    outputData(data, 'toon')

    expect(spy).toHaveBeenCalled()
    const output = spy.mock.calls[0][0]
    expect(output).toContain('number\ttitle')
    spy.mockRestore()
  })

  test('should validate non-json format', () => {
    expect(() => outputData({}, 'invalid' as any)).toThrow('Invalid output format: invalid')
  })

  test('should apply field filtering for JSON', () => {
    const spy = spyOn(console, 'log')
    const data = [{ number: 123, title: 'Test', extra: 'data' }]

    outputData(data, 'json', ['number', 'title'])

    const output = JSON.parse(spy.mock.calls[0][0])
    expect(output).toEqual([{ number: 123, title: 'Test' }])
    spy.mockRestore()
  })

  test('should apply field filtering for TOON', () => {
    const spy = spyOn(console, 'log')
    const data = [{ number: 123, title: 'Test', extra: 'data' }]

    outputData(data, 'toon', ['number', 'title'])

    const output = spy.mock.calls[0][0]
    expect(output).toContain('number\ttitle')
    expect(output).not.toContain('extra')
    spy.mockRestore()
  })

  test('should not filter when fields is null', () => {
    const spy = spyOn(console, 'log')
    const data = { number: 123, title: 'Test', extra: 'data' }

    outputData(data, 'json', null)

    const output = JSON.parse(spy.mock.calls[0][0])
    expect(output).toEqual(data)
    spy.mockRestore()
  })

  test('should not filter when fields is undefined', () => {
    const spy = spyOn(console, 'log')
    const data = { number: 123, title: 'Test', extra: 'data' }

    outputData(data, 'json', undefined)

    const output = JSON.parse(spy.mock.calls[0][0])
    expect(output).toEqual(data)
    spy.mockRestore()
  })
})
