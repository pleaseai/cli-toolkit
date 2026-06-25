import { homedir } from 'node:os'
import { describe, expect, test } from 'bun:test'
import { collapseHomeDirectory } from '../../src/output/path'

describe('collapseHomeDirectory', () => {
  test('should collapse a leading home directory to ~', () => {
    expect(collapseHomeDirectory('/Users/alice/project/bin', '/Users/alice')).toBe('~/project/bin')
  })

  test('should collapse an exact home directory match', () => {
    expect(collapseHomeDirectory('/Users/alice', '/Users/alice')).toBe('~')
  })

  test('should leave paths outside the home directory unchanged', () => {
    expect(collapseHomeDirectory('/usr/local/bin', '/Users/alice')).toBe('/usr/local/bin')
  })

  test('should not collapse a sibling directory that shares the home basename', () => {
    expect(collapseHomeDirectory('/Users/alicebob/x', '/Users/alice')).toBe('/Users/alicebob/x')
  })

  test('should not collapse when home directory is empty', () => {
    expect(collapseHomeDirectory('/usr/local/bin', '')).toBe('/usr/local/bin')
  })

  test('should collapse a Windows-style home directory', () => {
    expect(collapseHomeDirectory('C:\\Users\\alice\\project', 'C:\\Users\\alice')).toBe('~\\project')
  })

  test('should ignore a trailing separator on the home directory', () => {
    expect(collapseHomeDirectory('/Users/alice/project', '/Users/alice/')).toBe('~/project')
  })

  test('should default to os.homedir when homeDir is omitted', () => {
    const home = homedir()
    if (home) {
      expect(collapseHomeDirectory(`${home}/work`)).toBe('~/work')
    }
    // Always assert at least once even when the home directory is unset.
    expect(collapseHomeDirectory('/outside/path')).toBe('/outside/path')
  })
})
