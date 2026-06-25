import { describe, expect, test } from 'bun:test'
import { CliError, exitCodeForError, isCliError, UNKNOWN_ERROR, VALIDATION_ERROR } from '../../src/errors/error'

/**
 * A `CliError` from a second copy of the module: same shape, distinct class.
 * Reproduces the multi-instance scenario where `instanceof CliError` fails.
 */
class ForeignCliError extends Error {
  constructor(
    message: string,
    public readonly code: string = UNKNOWN_ERROR,
    public readonly suggestions: string[] = [],
  ) {
    super(message)
    this.name = 'CliError'
  }
}

describe('CliError', () => {
  test('should be an instance of Error', () => {
    const error = new CliError('boom')
    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(CliError)
  })

  test('should expose the message', () => {
    expect(new CliError('boom').message).toBe('boom')
  })

  test('should default code to UNKNOWN', () => {
    expect(new CliError('boom').code).toBe(UNKNOWN_ERROR)
    expect(UNKNOWN_ERROR).toBe('UNKNOWN')
  })

  test('should carry a custom code', () => {
    expect(new CliError('boom', 'NOT_FOUND').code).toBe('NOT_FOUND')
  })

  test('should default suggestions to an empty array', () => {
    expect(new CliError('boom').suggestions).toEqual([])
  })

  test('should carry suggestions', () => {
    const error = new CliError('boom', 'NOT_FOUND', ['try this'])
    expect(error.suggestions).toEqual(['try this'])
  })

  test('should set the error name', () => {
    expect(new CliError('boom').name).toBe('CliError')
  })

  test('should be catchable as a thrown error', () => {
    expect(() => {
      throw new CliError('cannot be empty', VALIDATION_ERROR)
    }).toThrow('cannot be empty')
  })
})

describe('isCliError', () => {
  test('should recognize a CliError instance', () => {
    expect(isCliError(new CliError('boom'))).toBe(true)
  })

  test('should recognize a CliError from another module copy by shape', () => {
    expect(isCliError(new ForeignCliError('boom', VALIDATION_ERROR))).toBe(true)
  })

  test('should reject a generic Error', () => {
    expect(isCliError(new Error('boom'))).toBe(false)
  })

  test('should reject non-error values', () => {
    expect(isCliError('boom')).toBe(false)
    expect(isCliError({ name: 'CliError', code: 'X' })).toBe(false)
    expect(isCliError(undefined)).toBe(false)
  })
})

describe('exitCodeForError', () => {
  test('should return 2 for validation errors', () => {
    expect(exitCodeForError(new CliError('bad', VALIDATION_ERROR))).toBe(2)
  })

  test('should return 2 for a validation CliError from another module copy', () => {
    expect(exitCodeForError(new ForeignCliError('bad', VALIDATION_ERROR))).toBe(2)
  })

  test('should return 1 for CliError with a non-validation code', () => {
    expect(exitCodeForError(new CliError('bad', 'NOT_FOUND'))).toBe(1)
  })

  test('should return 1 for a generic Error', () => {
    expect(exitCodeForError(new Error('bad'))).toBe(1)
  })

  test('should return 1 for a non-error value', () => {
    expect(exitCodeForError('bad')).toBe(1)
    expect(exitCodeForError(undefined)).toBe(1)
  })
})
