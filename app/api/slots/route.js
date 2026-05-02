import { prisma } from '@/lib/prisma'

export async function GET() {
  const business = await prisma.business.findFirst()
  const slots = await prisma.slot.findMany({
    where: { businessId: business.id },
    include: {
      offers: {
        include: { customer: true },
      },
    },
    orderBy: { date: 'asc' },
  })
  return Response.json(slots)
}

export async function POST(request) {
  const body = await request.json()
  const business = await prisma.business.findFirst()
  const slot = await prisma.slot.create({
    data: {
      businessId: business.id,
      date: new Date(body.date),
      label: body.label,
    },
  })
  return Response.json(slot, { status: 201 })
}
