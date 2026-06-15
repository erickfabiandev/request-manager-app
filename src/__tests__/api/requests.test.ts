import { describe, it, expect, beforeEach } from 'vitest'
import { db } from '@/infrastructure/data/store'

describe('RequestsStore', () => {
  beforeEach(() => {
    // Reset implícito — el store en memoria persiste entre tests
  })

  it('should return all requests', () => {
    const requests = db.getAll()
    expect(requests.length).toBeGreaterThan(0)
  })

  it('should get request by id', () => {
    const request = db.getById('REQ-001')
    expect(request).not.toBeNull()
    expect(request?.id).toBe('REQ-001')
  })

  it('should return null for non-existent id', () => {
    const request = db.getById('REQ-999')
    expect(request).toBeNull()
  })

  it('should create a new request', () => {
    const newRequest = db.create({
      title: 'Test Request',
      description: 'Test description for request',
      requester: 'Test User',
      category: 'software',
      priority: 'low',
      status: 'pending',
    })
    expect(newRequest.id).toBeDefined()
    expect(newRequest.title).toBe('Test Request')
    expect(newRequest.status).toBe('pending')
    expect(newRequest.creationDate).toBeDefined()
  })

  it('should update a request', () => {
    const updated = db.update('REQ-001', { title: 'Updated Title' })
    expect(updated).not.toBeNull()
    expect(updated?.title).toBe('Updated Title')
  })

  it('should return null when updating non-existent request', () => {
    const updated = db.update('REQ-999', { title: 'Updated' })
    expect(updated).toBeNull()
  })

  it('should delete a request', () => {
    const deleted = db.delete('REQ-002')
    expect(deleted).toBe(true)
    expect(db.getById('REQ-002')).toBeNull()
  })

  it('should return false when deleting non-existent request', () => {
    const deleted = db.delete('REQ-999')
    expect(deleted).toBe(false)
  })
})