import { describe, it, expect } from 'vitest'
import { createRequestSchema, editRequestSchema } from '@/domain/rules/RequestSchema'

describe('RequestSchema', () => {
  describe('createRequestSchema', () => {
    it('should validate a valid request', () => {
      const validData = {
        title: 'Solicitud de Laptop',
        description: 'Se requiere laptop para desarrollo',
        requester: 'Juan Pérez',
        category: 'hardware',
        priority: 'high',
      }
      const result = createRequestSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should fail if title is too short', () => {
      const result = createRequestSchema.safeParse({
        title: 'ab',
        description: 'Descripción válida aquí',
        requester: 'Juan',
        category: 'hardware',
        priority: 'high',
      })
      expect(result.success).toBe(false)
    })

    it('should fail if description is too short', () => {
      const result = createRequestSchema.safeParse({
        title: 'Título válido',
        description: 'Corto',
        requester: 'Juan',
        category: 'hardware',
        priority: 'high',
      })
      expect(result.success).toBe(false)
    })

    it('should fail if requester is empty', () => {
      const result = createRequestSchema.safeParse({
        title: 'Título válido',
        description: 'Descripción suficientemente larga',
        requester: '',
        category: 'hardware',
        priority: 'high',
      })
      expect(result.success).toBe(false)
    })

    it('should fail with invalid category', () => {
      const result = createRequestSchema.safeParse({
        title: 'Título válido',
        description: 'Descripción suficientemente larga',
        requester: 'Juan',
        category: 'invalid_category',
        priority: 'high',
      })
      expect(result.success).toBe(false)
    })

    it('should fail with invalid priority', () => {
      const result = createRequestSchema.safeParse({
        title: 'Título válido',
        description: 'Descripción suficientemente larga',
        requester: 'Juan',
        category: 'hardware',
        priority: 'ultra',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('editRequestSchema', () => {
    it('should validate with status field', () => {
      const result = editRequestSchema.safeParse({
        title: 'Título válido',
        description: 'Descripción suficientemente larga',
        requester: 'Juan',
        category: 'hardware',
        priority: 'high',
        status: 'approved',
      })
      expect(result.success).toBe(true)
    })

    it('should fail with invalid status', () => {
      const result = editRequestSchema.safeParse({
        title: 'Título válido',
        description: 'Descripción suficientemente larga',
        requester: 'Juan',
        category: 'hardware',
        priority: 'high',
        status: 'invalid_status',
      })
      expect(result.success).toBe(false)
    })
  })
})