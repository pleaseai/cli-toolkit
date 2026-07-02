import { VercelError } from '@vercel/error'
import { describe, expect, test } from 'bun:test'
import { CliError, exitCodeForError, isCliError, UNKNOWN_ERROR, VALIDATION_ERROR } from '../../src/errors/error'

/**
 * A `CliError` from a second copy of the module: same shape, distinct class.
 * Reproduces the multi-instance scenario where `instanceof CliError` fails.
 * Uses the legacy (pre-`@vercel/error`) shape with a `suggestions` array to
 * also cover the cross-version boundary.
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
  test('should be an instance of Error and VercelError', () => {
    const error = new CliError('boom')
    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(VercelError)
    expect(error).toBeInstanceOf(CliError)
  })

  test('should expose the message', () => {
    expect(new CliError('boom').message).toBe('boom')
  })

  test('should default code to UNKNOWN_ERROR', () => {
    expect(new CliError('boom').code).toBe(UNKNOWN_ERROR)
    expect(UNKNOWN_ERROR).toBe('UNKNOWN_ERROR')
  })

  test('should carry a custom code', () => {
    expect(new CliError('boom', { code: 'NOT_FOUND' }).code).toBe('NOT_FOUND')
  })

  test('should carry structured context fields', () => {
    const error = new CliError('boom', {
      code: 'NOT_FOUND',
      reason: 'The issue was deleted.',
      hint: 'It may have been transferred.',
      fix: 'Run `list` to see open issues',
      link: 'https://example.com/docs/errors/NOT_FOUND',
    })
    expect(error.reason).toBe('The issue was deleted.')
    expect(error.hint).toBe('It may have been transferred.')
    expect(error.fix).toBe('Run `list` to see open issues')
    expect(error.link).toBe('https://example.com/docs/errors/NOT_FOUND')
  })

  test('should chain a cause', () => {
    const cause = new Error('root')
    expect(new CliError('boom', { cause }).cause).toBe(cause)
  })

  test('should set the error name', () => {
    expect(new CliError('boom').name).toBe('CliError')
  })

  test('should be catchable as a thrown error', () => {
    expect(() => {
      throw new CliError('cannot be empty', { code: VALIDATION_ERROR })
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

  test('should reject a plain VercelError', () => {
    expect(isCliError(new VercelError('boom', { code: 'X' }))).toBe(false)
  })

  test('should reject non-error values', () => {
    expect(isCliError('boom')).toBe(false)
    expect(isCliError({ name: 'CliError', code: 'X' })).toBe(false)
    expect(isCliError(undefined)).toBe(false)
  })
})

describe('exitCodeForError', () => {
  test('should return 2 for validation errors', () => {
    expect(exitCodeForError(new CliError('bad', { code: VALIDATION_ERROR }))).toBe(2)
  })

  test('should return 2 for a validation CliError from another module copy', () => {
    expect(exitCodeForError(new ForeignCliError('bad', VALIDATION_ERROR))).toBe(2)
  })

  test('should return 2 for a plain VercelError tagged VALIDATION_ERROR', () => {
    expect(exitCodeForError(new VercelError('bad', { code: VALIDATION_ERROR }))).toBe(2)
  })

  test('should return 1 for CliError with a non-validation code', () => {
    expect(exitCodeForError(new CliError('bad', { code: 'NOT_FOUND' }))).toBe(1)
  })

  test('should return 1 for a generic Error', () => {
    expect(exitCodeForError(new Error('bad'))).toBe(1)
  })

  test('should return 1 for a non-error value', () => {
    expect(exitCodeForError('bad')).toBe(1)
    expect(exitCodeForError(undefined)).toBe(1)
  })
})
