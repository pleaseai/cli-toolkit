import { beforeEach, describe, expect, test } from 'bun:test'
import { I18nManager } from '../../src/i18n/manager'

describe('I18nManager', () => {
  let i18n: I18nManager

  beforeEach(() => {
    i18n = new I18nManager()
  })

  test('should register and retrieve messages', () => {
    const messages = {
      creating: 'Creating issue...',
      created: (number: number) => `Issue #${number} created!`,
    }

    i18n.register('test.domain', 'en', messages)
    const retrieved = i18n.get('test.domain', 'en')

    expect(retrieved.creating).toBe('Creating issue...')
    expect(retrieved.created(123)).toBe('Issue #123 created!')
  })

  test('should support multiple languages', () => {
    i18n.register('test', 'en', { msg: 'Hello' })
    i18n.register('test', 'ko', { msg: '안녕하세요' })

    expect(i18n.get('test', 'en').msg).toBe('Hello')
    expect(i18n.get('test', 'ko').msg).toBe('안녕하세요')
  })

  test('should throw when domain not registered', () => {
    expect(() => i18n.get('nonexistent', 'en')).toThrow(
      'No messages registered for domain: nonexistent',
    )
  })

  test('should throw when language not registered', () => {
    i18n.register('test', 'en', { msg: 'Hello' })
    expect(() => i18n.get('test', 'ko')).toThrow(
      'No ko messages registered for domain: test',
    )
  })

  test('should check if domain has messages', () => {
    i18n.register('test', 'en', { msg: 'Hello' })
    expect(i18n.has('test')).toBe(true)
    expect(i18n.has('nonexistent')).toBe(false)
  })

  test('should check if domain has language', () => {
    i18n.register('test', 'en', { msg: 'Hello' })
    expect(i18n.hasLanguage('test', 'en')).toBe(true)
    expect(i18n.hasLanguage('test', 'ko')).toBe(false)
    expect(i18n.hasLanguage('nonexistent', 'en')).toBe(false)
  })

  test('should get all registered domains', () => {
    i18n.register('domain1', 'en', { msg: 'Hello' })
    i18n.register('domain2', 'en', { msg: 'World' })

    const domains = i18n.getDomains()
    expect(domains).toContain('domain1')
    expect(domains).toContain('domain2')
    expect(domains.length).toBe(2)
  })

  test('should get all languages for a domain', () => {
    i18n.register('test', 'en', { msg: 'Hello' })
    i18n.register('test', 'ko', { msg: '안녕하세요' })

    const languages = i18n.getLanguages('test')
    expect(languages).toContain('en')
    expect(languages).toContain('ko')
    expect(languages.length).toBe(2)
  })

  test('should return empty array for nonexistent domain languages', () => {
    const languages = i18n.getLanguages('nonexistent')
    expect(languages).toEqual([])
  })
})
