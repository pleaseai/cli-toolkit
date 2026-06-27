import { describe, expect, test } from 'bun:test'
import { CliError, UNKNOWN_ERROR, VALIDATION_ERROR } from '../../src/errors/error'
import { errorOutput, toErrorOutput } from '../../src/errors/output'

/** A `CliError` from a second module copy: same shape, distinct class. */
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

describe('errorOutput', () => {
  test('should build a minimal payload without suggestions', () => {
    expect(errorOutput('boom', UNKNOWN_ERROR)).toEqual({
      error: 'boom',
      code: UNKNOWN_ERROR,
    })
  })

  test('should omit the help key when suggestions are empty', () => {
    const output = errorOutput('boom', UNKNOWN_ERROR, [])
    expect(output).not.toHaveProperty('help')
  })

  test('should include the help key when suggestions are present', () => {
    expect(errorOutput('boom', 'VALIDATION_ERROR', ['fix it'])).toEqual({
      error: 'boom',
      code: 'VALIDATION_ERROR',
      help: ['fix it'],
    })
  })
})

describe('toErrorOutput', () => {
  test('should preserve code and suggestions from a CliError', () => {
    const error = new CliError('Issue not found', 'NOT_FOUND', ['run list'])
    expect(toErrorOutput(error)).toEqual({
      error: 'Issue not found',
      code: 'NOT_FOUND',
      help: ['run list'],
    })
  })

  test('should preserve code and suggestions from a CliError of another module copy', () => {
    const error = new ForeignCliError('Issue not found', 'NOT_FOUND', ['run list'])
    expect(toErrorOutput(error)).toEqual({
      error: 'Issue not found',
      code: 'NOT_FOUND',
      help: ['run list'],
    })
  })

  test('should map a validation CliError code through', () => {
    const error = new CliError('Value cannot be empty', VALIDATION_ERROR)
    expect(toErrorOutput(error)).toEqual({
      error: 'Value cannot be empty',
      code: 'VALIDATION_ERROR',
    })
  })

  test('should fall back to UNKNOWN_ERROR for a generic Error', () => {
    expect(toErrorOutput(new Error('boom'))).toEqual({
      error: 'boom',
      code: 'UNKNOWN_ERROR',
    })
  })

  test('should stringify a non-error value', () => {
    expect(toErrorOutput('boom')).toEqual({
      error: 'boom',
      code: 'UNKNOWN_ERROR',
    })
  })
})
