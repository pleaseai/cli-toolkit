import { describe, expect, spyOn, test } from 'bun:test'
import { encodeToon, outputToon } from '../../src/output/toon'

describe('encodeToon', () => {
  test('should encode object with proper format', () => {
    const data = { number: 124, title: 'Test', state: 'OPEN' }
    const result = encodeToon(data)

    expect(result).toContain('number')
    expect(result).toContain('title')
    expect(result).toContain('state')
    expect(result).toContain('124')
    expect(result).toContain('Test')
    expect(result).toContain('OPEN')
  })

  test('should encode array of objects with tab delimiter', () => {
    const data = [
      { number: 124, title: 'Test', state: 'OPEN' },
      { number: 125, title: 'Another', state: 'CLOSED' },
    ]
    const result = encodeToon(data)

    expect(result).toContain('\t')
    expect(result).toContain('124')
    expect(result).toContain('125')
    expect(result).toContain('Test')
    expect(result).toContain('Another')
  })

  test('should encode primitive values', () => {
    expect(encodeToon('test')).toBe('test')
    expect(encodeToon(123)).toBe('123')
    expect(encodeToon(true)).toBe('true')
    expect(encodeToon(null)).toBe('null')
  })

  test('should encode empty array', () => {
    const result = encodeToon([])
    expect(result).toContain('[0')
    expect(result).toContain(']:')
  })

  test('should encode empty object', () => {
    const result = encodeToon({})
    expect(typeof result).toBe('string')
  })

  test('should use 2-space indentation for arrays', () => {
    const data = [{ value: 'test' }]
    const result = encodeToon(data)

    expect(result).toContain('  ')
  })
})

describe('outputToon', () => {
  test('should output encoded TOON to console', () => {
    const spy = spyOn(console, 'log')
    const data = { number: 123, title: 'Test' }

    outputToon(data)

    expect(spy).toHaveBeenCalled()
    const output = spy.mock.calls[0][0]
    expect(output).toContain('number')
    expect(output).toContain('title')
    expect(output).toContain('123')
    expect(output).toContain('Test')
    spy.mockRestore()
  })

  test('should output array data', () => {
    const spy = spyOn(console, 'log')
    const data = [{ id: 1 }, { id: 2 }]

    outputToon(data)

    expect(spy).toHaveBeenCalled()
    const allOutput = spy.mock.calls.map(call => call[0]).join('\n')
    expect(allOutput).toContain('id')
    expect(allOutput).toContain('1')
    expect(allOutput).toContain('2')
    spy.mockRestore()
  })

  test('should output primitive values', () => {
    const spy = spyOn(console, 'log')

    outputToon('test')
    expect(spy).toHaveBeenCalledWith('test')
    spy.mockClear()

    outputToon(123)
    expect(spy).toHaveBeenCalledWith('123')

    spy.mockRestore()
  })
})
