import { describe, expect, test } from 'bun:test'
import { commonMessages, getCommonMessages } from '../../src/i18n/common'

describe('commonMessages', () => {
  test('should have messages for all supported languages', () => {
    expect(commonMessages.ko).toBeDefined()
    expect(commonMessages.en).toBeDefined()
  })

  test('should have all required message keys for Korean', () => {
    const ko = commonMessages.ko

    expect(ko.loading).toBe('⏳ 로딩 중...')
    expect(ko.success).toBe('✅ 성공')
    expect(ko.error).toBe('❌ 오류')
    expect(ko.warning).toBe('⚠️ 경고')
    expect(ko.info).toBe('ℹ️ 정보')
    expect(ko.unknownError).toBe('알 수 없는 오류')
    expect(ko.errorPrefix).toBe('❌ 오류')
    expect(typeof ko.processing).toBe('function')
    expect(typeof ko.completed).toBe('function')
    expect(typeof ko.failed).toBe('function')
  })

  test('should have all required message keys for English', () => {
    const en = commonMessages.en

    expect(en.loading).toBe('⏳ Loading...')
    expect(en.success).toBe('✅ Success')
    expect(en.error).toBe('❌ Error')
    expect(en.warning).toBe('⚠️ Warning')
    expect(en.info).toBe('ℹ️ Info')
    expect(en.unknownError).toBe('Unknown error')
    expect(en.errorPrefix).toBe('❌ Error')
    expect(typeof en.processing).toBe('function')
    expect(typeof en.completed).toBe('function')
    expect(typeof en.failed).toBe('function')
  })

  test('should generate correct processing messages in Korean', () => {
    const ko = commonMessages.ko

    expect(ko.processing('issue #123')).toBe('⏳ issue #123 처리 중...')
    expect(ko.processing(456)).toBe('⏳ 456 처리 중...')
  })

  test('should generate correct processing messages in English', () => {
    const en = commonMessages.en

    expect(en.processing('issue #123')).toBe('⏳ Processing issue #123...')
    expect(en.processing(456)).toBe('⏳ Processing 456...')
  })

  test('should generate correct completed messages in Korean', () => {
    const ko = commonMessages.ko

    expect(ko.completed('작업')).toBe('✅ 작업 완료!')
    expect(ko.completed(123)).toBe('✅ 123 완료!')
  })

  test('should generate correct completed messages in English', () => {
    const en = commonMessages.en

    expect(en.completed('task')).toBe('✅ task completed!')
    expect(en.completed(123)).toBe('✅ 123 completed!')
  })

  test('should generate correct failed messages in Korean', () => {
    const ko = commonMessages.ko

    expect(ko.failed('작업', '네트워크 오류')).toBe('❌ 작업 실패: 네트워크 오류')
    expect(ko.failed(123, 'timeout')).toBe('❌ 123 실패: timeout')
  })

  test('should generate correct failed messages in English', () => {
    const en = commonMessages.en

    expect(en.failed('task', 'network error')).toBe('❌ task failed: network error')
    expect(en.failed(123, 'timeout')).toBe('❌ 123 failed: timeout')
  })
})

describe('getCommonMessages', () => {
  test('should return Korean messages for "ko"', () => {
    const messages = getCommonMessages('ko')

    expect(messages).toBe(commonMessages.ko)
    expect(messages.loading).toBe('⏳ 로딩 중...')
  })

  test('should return English messages for "en"', () => {
    const messages = getCommonMessages('en')

    expect(messages).toBe(commonMessages.en)
    expect(messages.loading).toBe('⏳ Loading...')
  })

  test('should return messages with working function properties', () => {
    const koMessages = getCommonMessages('ko')
    const enMessages = getCommonMessages('en')

    expect(koMessages.processing('test')).toBe('⏳ test 처리 중...')
    expect(enMessages.processing('test')).toBe('⏳ Processing test...')
  })
})
