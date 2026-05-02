import { prisma } from '@/lib/prisma'

export async function POST(request) {
  const { offerId, message } = await request.json()

  const offer = await prisma.offer.update({
    where: { id: offerId },
    data: {
      status: 'sent',
      sentAt: new Date(),
      // Allow updated message if the user edited it on the generate screen
      ...(message && { message }),
    },
    include: { customer: true, slot: true },
  })

  return Response.json(offer)
}
