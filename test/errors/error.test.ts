import { describe, expect, test } from 'bun:test'
import { CliError, exitCodeForError, UNKNOWN_ERROR, VALIDATION_ERROR } from '../../src/errors/error'

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

describe('exitCodeForError', () => {
  test('should return 2 for validation errors', () => {
    expect(exitCodeForError(new CliError('bad', VALIDATION_ERROR))).toBe(2)
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
