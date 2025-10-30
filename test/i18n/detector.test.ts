import { describe, expect, test } from 'bun:test'
import { detectSystemLanguage } from '../../src/i18n/detector'

describe('detectSystemLanguage', () => {
  test('should detect Korean from LANG=ko_KR.UTF-8', () => {
    const originalLang = process.env.LANG
    process.env.LANG = 'ko_KR.UTF-8'
    expect(detectSystemLanguage()).toBe('ko')
    process.env.LANG = originalLang
  })

  test('should detect English from LANG=en_US.UTF-8', () => {
    const originalLang = process.env.LANG
    process.env.LANG = 'en_US.UTF-8'
    expect(detectSystemLanguage()).toBe('en')
    process.env.LANG = originalLang
  })

  test('should default to English when no locale is set', () => {
    const originalLang = process.env.LANG
    const originalLanguage = process.env.LANGUAGE
    const originalLC = process.env.LC_ALL

    delete process.env.LANG
    delete process.env.LANGUAGE
    delete process.env.LC_ALL

    expect(detectSystemLanguage()).toBe('en')

    process.env.LANG = originalLang
    process.env.LANGUAGE = originalLanguage
    process.env.LC_ALL = originalLC
  })

  test('should check LANGUAGE if LANG is not set', () => {
    const originalLang = process.env.LANG
    const originalLanguage = process.env.LANGUAGE

    delete process.env.LANG
    process.env.LANGUAGE = 'ko'

    expect(detectSystemLanguage()).toBe('ko')

    process.env.LANG = originalLang
    process.env.LANGUAGE = originalLanguage
  })
})
