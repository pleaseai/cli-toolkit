import { VercelError } from '@vercel/error'
import { describe, expect, test } from 'bun:test'
import { CliError, UNKNOWN_ERROR, VALIDATION_ERROR } from '../../src/errors/error'
import { errorOutput, toErrorOutput } from '../../src/errors/output'

/**
 * A `CliError` from a second module copy: same shape, distinct class.
 * Uses the legacy (pre-`@vercel/error`) shape with a `suggestions` array.
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

describe('errorOutput', () => {
  test('should build a minimal payload without details', () => {
    expect(errorOutput('boom', UNKNOWN_ERROR)).toEqual({
      error: 'boom',
      code: UNKNOWN_ERROR,
    })
  })

  test('should omit detail keys that are undefined', () => {
    const output = errorOutput('boom', UNKNOWN_ERROR, { hint: undefined })
    expect(output).not.toHaveProperty('hint')
    expect(output).not.toHaveProperty('reason')
    expect(output).not.toHaveProperty('fix')
    expect(output).not.toHaveProperty('link')
  })

  test('should include detail keys when present', () => {
    expect(errorOutput('boom', 'VALIDATION_ERROR', {
      reason: 'input was empty',
      hint: 'check the flag value',
      fix: 'pass a non-empty string',
      link: 'https://example.com/docs',
    })).toEqual({
      error: 'boom',
      code: 'VALIDATION_ERROR',
      reason: 'input was empty',
      hint: 'check the flag value',
      fix: 'pass a non-empty string',
      link: 'https://example.com/docs',
    })
  })
})

describe('toErrorOutput', () => {
  test('should preserve code and context fields from a CliError', () => {
    const error = new CliError('Issue not found', {
      code: 'NOT_FOUND',
      hint: 'run list',
      fix: 'pick an open issue id',
    })
    expect(toErrorOutput(error)).toEqual({
      error: 'Issue not found',
      code: 'NOT_FOUND',
      hint: 'run list',
      fix: 'pick an open issue id',
    })
  })

  test('should preserve all four context fields from a CliError', () => {
    const error = new CliError('Issue not found', {
      code: 'NOT_FOUND',
      reason: 'the issue was deleted',
      hint: 'run list',
      fix: 'pick an open issue id',
      link: 'https://example.com/docs/errors/NOT_FOUND',
    })
    expect(toErrorOutput(error)).toEqual({
      error: 'Issue not found',
      code: 'NOT_FOUND',
      reason: 'the issue was deleted',
      hint: 'run list',
      fix: 'pick an open issue id',
      link: 'https://example.com/docs/errors/NOT_FOUND',
    })
  })

  test('should map a plain VercelError through', () => {
    const error = new VercelError('Pool exhausted', {
      code: 'pool_exhausted',
      reason: 'all connections in use',
      link: 'https://example.com/docs/pool',
    })
    expect(toErrorOutput(error)).toEqual({
      error: 'Pool exhausted',
      code: 'pool_exhausted',
      reason: 'all connections in use',
      link: 'https://example.com/docs/pool',
    })
  })

  test('should default a code-less VercelError to UNKNOWN_ERROR', () => {
    expect(toErrorOutput(new VercelError('boom'))).toEqual({
      error: 'boom',
      code: UNKNOWN_ERROR,
    })
  })

  test('should map legacy suggestions from a foreign CliError onto hint', () => {
    const error = new ForeignCliError('Issue not found', 'NOT_FOUND', ['run list', 'check the id'])
    expect(toErrorOutput(error)).toEqual({
      error: 'Issue not found',
      code: 'NOT_FOUND',
      hint: 'run list\ncheck the id',
    })
  })

  test('should carry context fields from a foreign new-style CliError, with suggestions taking priority for hint', () => {
    const error = new ForeignCliError('Issue not found', 'NOT_FOUND', ['run list'])
    Object.assign(error, {
      reason: 'the issue was deleted',
      hint: 'native hint (overridden by suggestions)',
      fix: 'pick an open issue id',
      link: 'https://example.com/docs/errors/NOT_FOUND',
    })
    expect(toErrorOutput(error)).toEqual({
      error: 'Issue not found',
      code: 'NOT_FOUND',
      reason: 'the issue was deleted',
      hint: 'run list',
      fix: 'pick an open issue id',
      link: 'https://example.com/docs/errors/NOT_FOUND',
    })
  })

  test('should map a validation CliError code through', () => {
    const error = new CliError('Value cannot be empty', { code: VALIDATION_ERROR })
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
