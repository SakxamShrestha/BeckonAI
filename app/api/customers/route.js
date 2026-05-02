import { prisma } from '@/lib/prisma'

export async function GET() {
  const business = await prisma.business.findFirst()
  const customers = await prisma.customer.findMany({
    where: { businessId: business.id },
    orderBy: { createdAt: 'desc' },
  })
  return Response.json(customers)
}

export async function POST(request) {
  const body = await request.json()
  const business = await prisma.business.findFirst()
  const customer = await prisma.customer.create({
    data: {
      businessId: business.id,
      name: body.name,
      phone: body.phone,
      isNewLead: true,
    },
  })
  return Response.json(customer, { status: 201 })
}
