const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

function daysAgo(n) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d
}

function nextWeekday(targetDay) {
  // targetDay: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  const d = new Date()
  const currentDay = d.getDay()
  let diff = targetDay - currentDay
  if (diff <= 0) diff += 7
  d.setDate(d.getDate() + diff)
  return d
}

async function main() {
  // Clear existing data
  await prisma.offer.deleteMany()
  await prisma.slot.deleteMany()
  await prisma.customer.deleteMany()
  await prisma.business.deleteMany()

  const business = await prisma.business.create({
    data: {
      name: 'Glow & Go Salon',
      ownerName: 'Sarah',
      type: 'Hair Salon',
    },
  })

  // 8 customers: mix of regulars, lapsed, new leads
  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        businessId: business.id,
        name: 'Maria Gonzalez',
        phone: '555-201-4892',
        lastVisitDate: daysAgo(8),
        visitCount: 14,
        isNewLead: false,
      },
    }),
    prisma.customer.create({
      data: {
        businessId: business.id,
        name: 'Tanya Brooks',
        phone: '555-348-7721',
        lastVisitDate: daysAgo(22),
        visitCount: 9,
        isNewLead: false,
      },
    }),
    prisma.customer.create({
      data: {
        businessId: business.id,
        name: 'Jessica Lee',
        phone: '555-493-1155',
        lastVisitDate: daysAgo(47),
        visitCount: 6,
        isNewLead: false,
      },
    }),
    prisma.customer.create({
      data: {
        businessId: business.id,
        name: 'Priya Patel',
        phone: '555-612-0034',
        lastVisitDate: daysAgo(63),
        visitCount: 4,
        isNewLead: false,
      },
    }),
    prisma.customer.create({
      data: {
        businessId: business.id,
        name: 'Dana Williams',
        phone: '555-719-2280',
        lastVisitDate: daysAgo(88),
        visitCount: 2,
        isNewLead: false,
      },
    }),
    prisma.customer.create({
      data: {
        businessId: business.id,
        name: 'Ashley Turner',
        phone: '555-824-5560',
        lastVisitDate: daysAgo(15),
        visitCount: 19,
        isNewLead: false,
      },
    }),
    prisma.customer.create({
      data: {
        businessId: business.id,
        name: 'Keisha Moody',
        phone: '555-937-8847',
        lastVisitDate: null,
        visitCount: 0,
        isNewLead: true,
      },
    }),
    prisma.customer.create({
      data: {
        businessId: business.id,
        name: 'Fatima Hassan',
        phone: '555-105-3369',
        lastVisitDate: null,
        visitCount: 0,
        isNewLead: true,
      },
    }),
  ])

  // Compute slot dates dynamically so demo always looks current
  const tuesdayDate = nextWeekday(2)
  tuesdayDate.setHours(14, 0, 0, 0)

  const wednesdayDate = nextWeekday(3)
  wednesdayDate.setHours(11, 0, 0, 0)

  const thursdayDate = nextWeekday(4)
  thursdayDate.setHours(15, 0, 0, 0)

  const lastTuesdayDate = new Date(tuesdayDate)
  lastTuesdayDate.setDate(lastTuesdayDate.getDate() - 7)

  const slots = await Promise.all([
    prisma.slot.create({
      data: {
        businessId: business.id,
        date: tuesdayDate,
        label: 'Tuesday 2:00 PM',
        isFilled: false,
      },
    }),
    prisma.slot.create({
      data: {
        businessId: business.id,
        date: wednesdayDate,
        label: 'Wednesday 11:00 AM',
        isFilled: false,
      },
    }),
    prisma.slot.create({
      data: {
        businessId: business.id,
        date: thursdayDate,
        label: 'Thursday 3:00 PM',
        isFilled: true,
      },
    }),
    prisma.slot.create({
      data: {
        businessId: business.id,
        date: lastTuesdayDate,
        label: 'Last Tuesday 2:00 PM',
        isFilled: true,
      },
    }),
  ])

  // 5 offers: 2 sent, 1 redeemed, 2 draft
  await Promise.all([
    // Jessica → Tuesday slot (sent)
    prisma.offer.create({
      data: {
        customerId: customers[2].id,
        slotId: slots[0].id,
        message:
          "Hey Jessica! It's Sarah from Glow & Go Salon. We have a rare opening Tuesday at 2pm — want to grab it? I'd love to do something special: 15% off. Just reply YES 💇",
        discountCode: 'JESS15',
        status: 'sent',
        sentAt: daysAgo(1),
      },
    }),
    // Priya → Tuesday slot (sent)
    prisma.offer.create({
      data: {
        customerId: customers[3].id,
        slotId: slots[0].id,
        message:
          "Hi Priya, haven't seen you in a while and we miss you! Got a spot open Tuesday at 2pm with 20% off if you'd like to come in. — Glow & Go Salon 🌟",
        discountCode: 'PRIY20',
        status: 'sent',
        sentAt: daysAgo(1),
      },
    }),
    // Dana → Last Tuesday slot (redeemed — shows the loop closing)
    prisma.offer.create({
      data: {
        customerId: customers[4].id,
        slotId: slots[3].id,
        message:
          "Dana! We just had a cancellation last Tuesday. First to reply gets 25% off. Hope to see you soon! — Glow & Go Salon",
        discountCode: 'DANA25',
        status: 'redeemed',
        sentAt: daysAgo(8),
      },
    }),
    // Keisha → Wednesday slot (draft)
    prisma.offer.create({
      data: {
        customerId: customers[6].id,
        slotId: slots[1].id,
        message:
          "Hey Keisha! Saving you a spot Wednesday at 11am with 10% off — a little welcome gift for your first visit. Let us know! — Glow & Go Salon ✂️",
        discountCode: 'KEIS10',
        status: 'draft',
      },
    }),
    // Fatima → Wednesday slot (draft)
    prisma.offer.create({
      data: {
        customerId: customers[7].id,
        slotId: slots[1].id,
        message:
          "Hi Fatima! We'd love to have you as our newest client. We have an opening Wednesday at 11am — here's 10% off to make your first visit easy. — Glow & Go Salon",
        discountCode: 'FATI10',
        status: 'draft',
      },
    }),
  ])

  console.log('✅ Seed complete: 1 business, 8 customers, 4 slots, 5 offers')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
