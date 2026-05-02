const TEMPLATES = [
  "Hey [NAME]! It's Sarah from [BUSINESS]. We have a rare opening [DAY] — want to grab it? I'd love to do something special: [DISCOUNT] off. Just reply YES 💇",
  "Hi [NAME], haven't seen you in a while and we miss you! Got a spot open [DAY] with [DISCOUNT] off if you'd like to come in. — [BUSINESS] 🌟",
  "[NAME]! We just had a cancellation [DAY]. First to reply gets [DISCOUNT] off. Hope to see you soon! — [BUSINESS]",
  "Hey [NAME]! Saving you a spot [DAY] with [DISCOUNT] off — just for our regulars. Let us know! — [BUSINESS] ✂️",
  "Hi [NAME]! We're holding a slot open [DAY] just for you. As a thank-you for being such a loyal client, here's [DISCOUNT] off your next visit. — [BUSINESS] 💜",
  "[NAME], it's been too long! We'd love to have you back. Opening available [DAY] — [DISCOUNT] off, just because we miss you. — [BUSINESS]",
  "Hey [NAME]! First time visiting us? We'd love to meet you. Grab your spot [DAY] with [DISCOUNT] off to make it easy to say yes. — [BUSINESS] 🌸",
  "Hi [NAME]! Sarah here from [BUSINESS]. You're always welcome back — and [DAY] we have a perfect opening with [DISCOUNT] off waiting for you.",
  "[NAME]! Quick note from [BUSINESS] — we have an opening [DAY] that has your name on it. [DISCOUNT] off if you can make it work. Hope to see you! 💇‍♀️",
  "Hey [NAME], [BUSINESS] here. We're keeping a spot just for you [DAY]. Come in and treat yourself — [DISCOUNT] off, on us. 🌟",
]

function pickDiscount(customer) {
  if (customer.isNewLead) return '10%'
  if (!customer.lastVisitDate) return '15%'
  const daysSince = Math.floor(
    (Date.now() - new Date(customer.lastVisitDate).getTime()) / 86400000
  )
  if (daysSince > 90) return '25%'
  if (daysSince > 60) return '20%'
  if (daysSince > 30) return '15%'
  return '10%'
}

function generateCode(name, discount) {
  const prefix = name.slice(0, 4).toUpperCase().replace(/\s/g, '')
  return `${prefix}${discount.replace('%', '')}`
}

export async function generateOffer(customer, slot, business) {
  // Simulate AI thinking — 1.2s delay makes it feel real
  await new Promise((r) => setTimeout(r, 1200))

  const template = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)]
  const discount = pickDiscount(customer)
  const dayLabel = new Date(slot.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })

  const firstName = customer.name.split(' ')[0]

  const message = template
    .replace('[NAME]', firstName)
    .replace('[BUSINESS]', business.name)
    .replace('[DAY]', dayLabel)
    .replace('[DISCOUNT]', discount)

  const discountCode = generateCode(customer.name, discount)

  return { message, discountCode, discount }
}
