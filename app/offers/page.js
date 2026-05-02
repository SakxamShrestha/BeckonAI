'use client'

import { useState, useEffect } from 'react'
import { Nav } from '@/components/Nav'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { CheckCircle, Loader2, MessageSquare } from 'lucide-react'

const TABS = ['all', 'draft', 'sent', 'redeemed']

const STATUS_STYLES = {
  draft: 'bg-muted text-muted-foreground hover:bg-muted',
  sent: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
  redeemed: 'bg-green-100 text-green-700 hover:bg-green-100',
}

function formatDate(date) {
  if (!date) return null
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function OfferRow({ offer, onRedeem }) {
  const [redeeming, setRedeeming] = useState(false)

  async function handleRedeem() {
    setRedeeming(true)
    try {
      const res = await fetch('/api/offers', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offerId: offer.id }),
      })
      if (!res.ok) throw new Error()
      toast.success(`Marked as redeemed — ${offer.customer.name} came in!`)
      onRedeem(offer.id)
    } catch {
      toast.error('Failed to update offer')
    } finally {
      setRedeeming(false)
    }
  }

  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardContent className="py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm">{offer.customer.name}</span>
              <Badge className={`${STATUS_STYLES[offer.status]} text-xs`}>
                {offer.status}
              </Badge>
              <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-mono font-medium">
                {offer.discountCode}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {offer.slot.label}
              {offer.sentAt && ` · Sent ${formatDate(offer.sentAt)}`}
            </p>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-2">
              {offer.message}
            </p>
          </div>
          <div className="flex-shrink-0">
            {offer.status === 'sent' && (
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 text-green-600 border-green-200 hover:bg-green-50"
                onClick={handleRedeem}
                disabled={redeeming}
              >
                {redeeming ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <CheckCircle size={12} />
                )}
                {redeeming ? 'Saving...' : 'Mark Redeemed'}
              </Button>
            )}
            {offer.status === 'redeemed' && (
              <span className="text-green-600 text-xs font-medium flex items-center gap-1">
                <CheckCircle size={14} /> Redeemed
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function OffersSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardContent className="py-4 space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-5 w-14 rounded-full" />
            </div>
            <Skeleton className="h-3 w-40" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function OffersPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchOffers(status) {
    setLoading(true)
    try {
      const url = status === 'all' ? '/api/offers' : `/api/offers?status=${status}`
      const res = await fetch(url)
      const data = await res.json()
      setOffers(data)
    } catch {
      toast.error('Failed to load offers')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOffers(activeTab)
  }, [activeTab])

  function handleTabChange(tab) {
    setActiveTab(tab)
  }

  function handleRedeem(offerId) {
    setOffers((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, status: 'redeemed' } : o))
    )
  }

  const counts = {
    all: offers.length,
    draft: offers.filter((o) => o.status === 'draft').length,
    sent: offers.filter((o) => o.status === 'sent').length,
    redeemed: offers.filter((o) => o.status === 'redeemed').length,
  }

  return (
    <div className="flex h-screen bg-muted/20">
      <Nav />
      <main className="flex-1 overflow-auto pb-20 lg:pb-0">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold">Offer History</h1>
            <p className="text-muted-foreground text-sm mt-1">
              All offers generated, sent, and redeemed through Beckon.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors capitalize ${
                  activeTab === tab
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {tab}
                {activeTab === 'all' && tab !== 'all' && (
                  <span className="ml-1.5 text-xs opacity-70">
                    {counts[tab]}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Offers */}
          {loading ? (
            <OffersSkeleton />
          ) : offers.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <MessageSquare size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium text-foreground">No {activeTab !== 'all' ? activeTab : ''} offers yet</p>
              <p className="text-sm mt-1">
                {activeTab === 'all'
                  ? 'Generate your first offers from the Slow Slots page'
                  : `No offers with status "${activeTab}"`}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {offers.map((offer) => (
                <OfferRow key={offer.id} offer={offer} onRedeem={handleRedeem} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
