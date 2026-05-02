import { prisma } from '@/lib/prisma'
import { generateOffer } from '@/lib/mockOffers'

export async function POST(request) {
  const { slotId } = await request.json()

  const business = await prisma.business.findFirst()
  const slot = await prisma.slot.findUnique({ where: { id: slotId } })

  if (!slot) {
    return Response.json({ error: 'Slot not found' }, { status: 404 })
  }

  // Eligible customers: new leads OR lapsed 30+ days OR no visit date
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const customers = await prisma.customer.findMany({
    where: {
      businessId: business.id,
      OR: [
        { isNewLead: true },
        { lastVisitDate: { lt: thirtyDaysAgo } },
        { lastVisitDate: null },
      ],
    },
  })

  // Delete any existing draft offers for this slot to avoid duplicates
  await prisma.offer.deleteMany({
    where: { slotId, status: 'draft' },
  })

  const offers = await Promise.all(
    customers.map(async (customer) => {
      const { message, discountCode } = await generateOffer(
        customer,
        slot,
        business
      )
      return prisma.offer.create({
        data: {
          customerId: customer.id,
          slotId: slot.id,
          message,
          discountCode,
          status: 'draft',
        },
        include: { customer: true, slot: true },
      })
    })
  )

  return Response.json(offers, { status: 201 })
}
