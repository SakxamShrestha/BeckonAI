'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, ChevronDown, ChevronUp, Sparkles } from 'lucide-react'
import { useState } from 'react'

function formatSlotDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function SlotCard({ slot }) {
  const [expanded, setExpanded] = useState(false)
  const sentOffers = slot.offers?.filter((o) => o.status === 'sent' || o.status === 'redeemed') ?? []

  return (
    <Card className={slot.isFilled ? 'opacity-75' : 'hover:shadow-md transition-shadow'}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <Calendar size={16} className="text-muted-foreground flex-shrink-0" />
            <div className="min-w-0">
              <CardTitle className="text-base truncate">{slot.label}</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {formatSlotDate(slot.date)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge
              className={
                slot.isFilled
                  ? 'bg-green-100 text-green-700 hover:bg-green-100'
                  : 'bg-red-100 text-red-700 hover:bg-red-100'
              }
            >
              {slot.isFilled ? 'Filled' : 'Open'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between gap-2 mt-2">
          <span className="text-sm text-muted-foreground">
            {sentOffers.length} offer{sentOffers.length !== 1 ? 's' : ''} sent
          </span>
          <div className="flex items-center gap-2">
            {!slot.isFilled && (
              <Link href={`/offers/generate?slotId=${slot.id}`}>
                <Button size="sm" className="gap-1.5">
                  <Sparkles size={14} />
                  Generate Offers
                </Button>
              </Link>
            )}
            {slot.offers?.length > 0 && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setExpanded(!expanded)}
                className="gap-1"
              >
                {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                {slot.offers.length}
              </Button>
            )}
          </div>
        </div>

        {expanded && slot.offers?.length > 0 && (
          <div className="mt-3 space-y-2 border-t pt-3">
            {slot.offers.map((offer) => (
              <div
                key={offer.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-foreground font-medium">
                  {offer.customer?.name}
                </span>
                <Badge
                  className={
                    offer.status === 'redeemed'
                      ? 'bg-green-100 text-green-700 hover:bg-green-100'
                      : offer.status === 'sent'
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                      : 'bg-muted text-muted-foreground'
                  }
                >
                  {offer.status}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function SlotList({ slots }) {
  if (slots.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-3xl mb-2">📅</p>
        <p className="font-medium">No slow slots yet</p>
        <p className="text-sm">Add your first slow time slot below</p>
      </div>
    )
  }

  const upcoming = slots.filter((s) => new Date(s.date) >= new Date() && !s.isFilled)
  const filled = slots.filter((s) => s.isFilled)
  const past = slots.filter((s) => new Date(s.date) < new Date() && !s.isFilled)

  return (
    <div className="space-y-6">
      {upcoming.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Open Slots
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {upcoming.map((slot) => (
              <SlotCard key={slot.id} slot={slot} />
            ))}
          </div>
        </div>
      )}

      {filled.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Filled
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {filled.map((slot) => (
              <SlotCard key={slot.id} slot={slot} />
            ))}
          </div>
        </div>
      )}

      {past.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Past (Unfilled)
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {past.map((slot) => (
              <SlotCard key={slot.id} slot={slot} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
