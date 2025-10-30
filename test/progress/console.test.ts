import { describe, expect, spyOn, test } from 'bun:test'
import { createProgressIndicator } from '../../src/progress/console'

describe('createProgressIndicator', () => {
  test('should create a progress indicator with all methods', () => {
    const indicator = createProgressIndicator()

    expect(indicator).toBeDefined()
    expect(typeof indicator.start).toBe('function')
    expect(typeof indicator.update).toBe('function')
    expect(typeof indicator.success).toBe('function')
    expect(typeof indicator.error).toBe('function')
    expect(typeof indicator.info).toBe('function')
  })

  test('should output start message with 📡 emoji', () => {
    const spy = spyOn(console, 'log')
    const indicator = createProgressIndicator()

    indicator.start('Fetching data...')

    expect(spy).toHaveBeenCalledWith('📡 Fetching data...')
    spy.mockRestore()
  })

  test('should output update message with ⏳ emoji', () => {
    const spy = spyOn(console, 'log')
    const indicator = createProgressIndicator()

    indicator.update('Processing records...')

    expect(spy).toHaveBeenCalledWith('⏳ Processing records...')
    spy.mockRestore()
  })

  test('should output success message with ✅ emoji', () => {
    const spy = spyOn(console, 'log')
    const indicator = createProgressIndicator()

    indicator.success('Operation completed!')

    expect(spy).toHaveBeenCalledWith('✅ Operation completed!')
    spy.mockRestore()
  })

  test('should output error message with ❌ emoji to stderr', () => {
    const spy = spyOn(console, 'error')
    const indicator = createProgressIndicator()

    indicator.error('Operation failed!')

    expect(spy).toHaveBeenCalledWith('❌ Operation failed!')
    spy.mockRestore()
  })

  test('should output info message with ℹ️ emoji', () => {
    const spy = spyOn(console, 'log')
    const indicator = createProgressIndicator()

    indicator.info('Processing...')

    expect(spy).toHaveBeenCalledWith('ℹ️  Processing...')
    spy.mockRestore()
  })

  test('should handle multiple sequential messages', () => {
    const logSpy = spyOn(console, 'log')
    const errorSpy = spyOn(console, 'error')
    const indicator = createProgressIndicator()

    indicator.start('Starting')
    indicator.update('Updating')
    indicator.success('Done')
    indicator.error('Failed')
    indicator.info('Info')

    expect(logSpy).toHaveBeenCalledTimes(4)
    expect(errorSpy).toHaveBeenCalledTimes(1)

    logSpy.mockRestore()
    errorSpy.mockRestore()
  })
})
