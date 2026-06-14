import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/infrastructure/data/store'
import { logger } from '@/config/logger'
import { PAGINATION } from '@/config/constants'
import type { Request, CreateRequestDTO } from '@/domain/models/Request'
import type { PaginatedResponse } from '@/domain/ports/RequestRepository'

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = req.nextUrl
    const status = searchParams.get('status') as Request['status'] | null
    const priority = searchParams.get('priority') as Request['priority'] | null
    const search = searchParams.get('search') ?? ''
    const page = Number(searchParams.get('page') ?? PAGINATION.DEFAULT_PAGE)
    const limit = Number(searchParams.get('limit') ?? PAGINATION.DEFAULT_LIMIT)

    let data = db.getAll()

    if (status) data = data.filter(r => r.status === status)
    if (priority) data = data.filter(r => r.priority === priority)
    if (search) data = data.filter(r =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase())
    )

    const total = data.length
    const totalPages = Math.ceil(total / limit)
    const paginated = data.slice((page - 1) * limit, page * limit)

    const response: PaginatedResponse<Request> = {
      data: paginated,
      total,
      page,
      limit,
      totalPages,
    }

    logger.info('Requests fetched', { total, page })
    return NextResponse.json(response)
  } catch (error) {
    logger.error('Failed to fetch requests', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json() as CreateRequestDTO

    if (!body.title || !body.description || !body.requester) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const newRequest = db.create({
      ...body,
      status: 'pending',
    })

    logger.info('Request created', { id: newRequest.id })
    return NextResponse.json(newRequest, { status: 201 })
  } catch (error) {
    logger.error('Failed to create request', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}