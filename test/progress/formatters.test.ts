import { describe, expect, test } from 'bun:test'
import {
  formatError,
  formatInfo,
  formatProgress,
  formatSuccess,
  formatWarning,
} from '../../src/progress/formatters'

describe('formatSuccess', () => {
  test('should format success message with ✅ emoji', () => {
    expect(formatSuccess('Operation completed!')).toBe('✅ Operation completed!')
  })

  test('should handle empty string', () => {
    expect(formatSuccess('')).toBe('✅ ')
  })

  test('should handle message with special characters', () => {
    expect(formatSuccess('Success! 🎉')).toBe('✅ Success! 🎉')
  })
})

describe('formatError', () => {
  test('should format error message with ❌ emoji', () => {
    expect(formatError('Operation failed')).toBe('❌ Operation failed')
  })

  test('should handle empty string', () => {
    expect(formatError('')).toBe('❌ ')
  })

  test('should handle message with error details', () => {
    expect(formatError('Failed: Network timeout')).toBe('❌ Failed: Network timeout')
  })
})

describe('formatInfo', () => {
  test('should format info message with ℹ️ emoji', () => {
    expect(formatInfo('Processing...')).toBe('ℹ️  Processing...')
  })

  test('should handle empty string', () => {
    expect(formatInfo('')).toBe('ℹ️  ')
  })

  test('should handle multiline messages', () => {
    const message = 'Line 1\nLine 2'
    expect(formatInfo(message)).toBe(`ℹ️  ${message}`)
  })
})

describe('formatWarning', () => {
  test('should format warning message with ⚠️ emoji', () => {
    expect(formatWarning('Deprecated command')).toBe('⚠️  Deprecated command')
  })

  test('should handle empty string', () => {
    expect(formatWarning('')).toBe('⚠️  ')
  })

  test('should handle warning with technical details', () => {
    expect(formatWarning('API rate limit approaching')).toBe(
      '⚠️  API rate limit approaching',
    )
  })
})

describe('formatProgress', () => {
  test('should format progress message with ⏳ emoji', () => {
    expect(formatProgress('Loading data...')).toBe('⏳ Loading data...')
  })

  test('should handle empty string', () => {
    expect(formatProgress('')).toBe('⏳ ')
  })

  test('should handle progress with percentage', () => {
    expect(formatProgress('Loading... 50%')).toBe('⏳ Loading... 50%')
  })

  test('should handle progress with item count', () => {
    expect(formatProgress('Processing item 5 of 10')).toBe('⏳ Processing item 5 of 10')
  })
})
