import { describe, it, expect } from 'vitest'
import { isRequestEditable, EDITABLE_STATUSES } from '@/domain/rules/RequestRules'
import type { RequestStatus } from '@/domain/models/Request'

describe('RequestRules', () => {
  describe('isRequestEditable', () => {
    it('should return true for pending status', () => {
      expect(isRequestEditable('pending')).toBe(true)
    })

    it('should return true for in_review status', () => {
      expect(isRequestEditable('in_review')).toBe(true)
    })

    it('should return false for approved status', () => {
      expect(isRequestEditable('approved')).toBe(false)
    })

    it('should return false for rejected status', () => {
      expect(isRequestEditable('rejected')).toBe(false)
    })

    it('should return false for closed status', () => {
      expect(isRequestEditable('closed')).toBe(false)
    })

    it('should only allow editable statuses', () => {
      const nonEditableStatuses: RequestStatus[] = ['approved', 'rejected', 'closed']
      nonEditableStatuses.forEach(status => {
        expect(isRequestEditable(status)).toBe(false)
      })
    })

    it('EDITABLE_STATUSES should contain pending and in_review', () => {
      expect(EDITABLE_STATUSES).toContain('pending')
      expect(EDITABLE_STATUSES).toContain('in_review')
      expect(EDITABLE_STATUSES).toHaveLength(2)
    })
  })
})