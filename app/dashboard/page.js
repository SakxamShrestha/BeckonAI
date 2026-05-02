export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Nav } from '@/components/Nav'
import { StatCard } from '@/components/StatCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles } from 'lucide-react'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

function formatRelativeTime(date) {
  const diff = Date.now() - new Date(date).getTime()
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (hours < 1) return 'Just now'
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

const STATUS_STYLES = {
  draft: 'bg-muted text-muted-foreground',
  sent: 'bg-blue-100 text-blue-700',
  redeemed: 'bg-green-100 text-green-700',
}

export default async function DashboardPage() {
  const business = await prisma.business.findFirst({
    include: {
      customers: true,
      slots: {
        include: { offers: true },
        orderBy: { date: 'asc' },
      },
    },
  })

  const now = new Date()
  const weekEnd = new Date(now)
  weekEnd.setDate(weekEnd.getDate() + 7)

  const slotsThisWeek = business.slots.filter(
    (s) => new Date(s.date) >= now && new Date(s.date) <= weekEnd
  )
  const openSlots = slotsThisWeek.filter((s) => !s.isFilled)
  const allOffers = business.slots.flatMap((s) => s.offers)
  const offersSent = allOffers.filter(
    (o) => o.status === 'sent' || o.status === 'redeemed'
  ).length
  const slotsFilled = business.slots.filter((s) => s.isFilled).length

  const recentOffers = await prisma.offer.findMany({
    where: { customer: { businessId: business.id } },
    include: { customer: true, slot: true },
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  return (
    <div className="flex h-screen bg-muted/20">
      <Nav />
      <main className="flex-1 overflow-auto pb-20 lg:pb-0">
        <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
          {/* Welcome */}
          <div>
            <h1 className="text-2xl font-bold">
              {getGreeting()}, {business.ownerName} 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              {openSlots.length > 0
                ? `You have ${openSlots.length} open slow slot${openSlots.length !== 1 ? 's' : ''} coming up this week. Time to fill them.`
                : "You're all booked up this week. Nice work!"}
            </p>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Customers"
              value={business.customers.length}
              icon="👥"
              subtitle="in your client list"
            />
            <StatCard
              title="Slots This Week"
              value={slotsThisWeek.length}
              icon="📅"
              subtitle={`${openSlots.length} open`}
            />
            <StatCard
              title="Offers Sent"
              value={offersSent}
              icon="📱"
              subtitle="total to date"
              trend="↑ filling seats"
            />
            <StatCard
              title="Slots Filled"
              value={slotsFilled}
              icon="✅"
              subtitle="via Beckon"
              trend="↑ revenue saved"
            />
          </div>

          {/* Upcoming slow slots */}
          {openSlots.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Slow Slots This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {openSlots.map((slot) => (
                  <div
                    key={slot.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-lg bg-amber-50 border border-amber-100"
                  >
                    <div>
                      <p className="font-medium text-sm">{slot.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(slot.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <Link href={`/offers/generate?slotId=${slot.id}`}>
                      <Button size="sm" className="gap-1.5 flex-shrink-0">
                        <Sparkles size={14} />
                        Generate Offers
                      </Button>
                    </Link>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Recent activity */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Offer Activity</CardTitle>
              <Link href="/offers">
                <Button variant="ghost" size="sm" className="text-primary">
                  View all
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {recentOffers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-2xl mb-2">📭</p>
                  <p className="text-sm">No offers sent yet. Generate your first one!</p>
                  <Link href="/offers/generate">
                    <Button size="sm" className="mt-3">Generate Offers</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentOffers.map((offer) => (
                    <div
                      key={offer.id}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">
                            {offer.customer.name}
                          </span>
                          <Badge className={`${STATUS_STYLES[offer.status]} hover:${STATUS_STYLES[offer.status]} text-xs`}>
                            {offer.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate max-w-xs">
                          {offer.slot.label} · {offer.discountCode}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {formatRelativeTime(offer.createdAt)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
