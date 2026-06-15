import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/infrastructure/data/store'
import { logger } from '@/config/logger'
import type { UpdateRequestDTO, Request as RequestModel } from '@/domain/models/Request'

interface RouteParams {
  params: { id: string }
}

export async function GET(_req: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  try {
    const request = db.getById(params.id)
    logger.info('Getting request by id', { id: params.id, found: !!request })
    if (!request) {
      logger.warn('Request not found', { id: params.id })
      return NextResponse.json({ error: 'Request not found' }, { status: 404 })
    }
    return NextResponse.json(request)
  } catch (error) {
    logger.error('Failed to fetch request', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  try {
    const body = await req.json() as UpdateRequestDTO
    const updated = db.update(params.id, body)
    if (!updated) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 })
    }
    logger.info('Request updated', { id: params.id })
    return NextResponse.json(updated)
  } catch (error) {
    logger.error('Failed to update request', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  try {
    const body = await req.json() as { priority: RequestModel['priority'] }
    const updated = db.update(params.id, { priority: body.priority })
    if (!updated) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 })
    }
    logger.info('Priority updated', { id: params.id, priority: body.priority })
    return NextResponse.json(updated)
  } catch (error) {
    logger.error('Failed to update priority', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  try {
    const deleted = db.delete(params.id)
    if (!deleted) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 })
    }
    logger.info('Request deleted', { id: params.id })
    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('Failed to delete request', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}