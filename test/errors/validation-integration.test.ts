import { describe, expect, test } from 'bun:test'
import { CliError, exitCodeForError, VALIDATION_ERROR } from '../../src/errors/error'
import { validateFormat } from '../../src/output/json'
import { validateNumericId, validatePositiveInteger, validateRange } from '../../src/validation/numeric'
import { validateMaxLength, validateNonEmptyString, validatePattern } from '../../src/validation/text'

/**
 * Each validator below should throw a CliError tagged with VALIDATION_ERROR,
 * which maps to exit code 2. This is the wiring that makes structured errors
 * usable end-to-end (catch -> toErrorOutput -> exitCodeForError).
 */
function captureError(fn: () => unknown): unknown {
  try {
    fn()
  }
  catch (error) {
    return error
  }
  throw new Error('expected function to throw')
}

const cases: Array<[string, () => unknown]> = [
  ['validateNonEmptyString', () => validateNonEmptyString('')],
  ['validateMaxLength', () => validateMaxLength('hello', 3)],
  ['validatePattern', () => validatePattern('abc-123', /^[a-z0-9]+$/)],
  ['validatePositiveInteger', () => validatePositiveInteger('0')],
  ['validateNumericId', () => validateNumericId(-1)],
  ['validateRange', () => validateRange(11, 1, 10)],
  ['validateFormat', () => validateFormat('xml')],
]

describe('validators throw structured CliError(VALIDATION_ERROR)', () => {
  for (const [name, fn] of cases) {
    test(`${name} throws a validation CliError mapped to exit code 2`, () => {
      const error = captureError(fn)
      expect(error).toBeInstanceOf(CliError)
      expect((error as CliError).code).toBe(VALIDATION_ERROR)
      expect(exitCodeForError(error)).toBe(2)
    })
  }
})
