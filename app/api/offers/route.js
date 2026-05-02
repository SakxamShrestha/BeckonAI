import { prisma } from '@/lib/prisma'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')

  const business = await prisma.business.findFirst()
  const where = { customer: { businessId: business.id } }
  if (status && status !== 'all') {
    where.status = status
  }

  const offers = await prisma.offer.findMany({
    where,
    include: { customer: true, slot: true },
    orderBy: { createdAt: 'desc' },
  })
  return Response.json(offers)
}

export async function PATCH(request) {
  const { offerId } = await request.json()
  const offer = await prisma.offer.update({
    where: { id: offerId },
    data: { status: 'redeemed' },
    include: { customer: true, slot: true },
  })
  return Response.json(offer)
}
