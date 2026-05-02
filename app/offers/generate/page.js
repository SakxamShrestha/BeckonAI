'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Nav } from '@/components/Nav'
import { OfferCard, OfferCardSkeleton } from '@/components/OfferCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { Sparkles, Loader2, Info } from 'lucide-react'

function GeneratePageInner() {
  const searchParams = useSearchParams()
  const preselectedSlotId = searchParams.get('slotId')

  const [slots, setSlots] = useState([])
  const [selectedSlotId, setSelectedSlotId] = useState(preselectedSlotId || '')
  const [generating, setGenerating] = useState(false)
  // offers array items: { status: 'generating' | 'generated', offer: {...} | null }
  const [offerItems, setOfferItems] = useState([])
  const [generated, setGenerated] = useState(false)

  useEffect(() => {
    fetch('/api/slots')
      .then((r) => r.json())
      .then((data) => {
        // Only show open (unfilled) slots
        const open = data.filter((s) => !s.isFilled)
        setSlots(open)
        if (!selectedSlotId && open.length > 0) {
          setSelectedSlotId(open[0].id)
        }
      })
      .catch(() => toast.error('Failed to load slots'))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleGenerate() {
    if (!selectedSlotId) {
      toast.error('Please select a slow slot first')
      return
    }

    setGenerating(true)
    setGenerated(false)
    setOfferItems([])

    try {
      // First, get eligible customers count for this slot to show skeleton placeholders
      const res = await fetch('/api/offers/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slotId: selectedSlotId }),
      })

      if (!res.ok) throw new Error('Generation failed')

      const offers = await res.json()

      if (offers.length === 0) {
        toast.info('No eligible customers found for this slot. Try a different slot or add lapsed customers.')
        setGenerating(false)
        return
      }

      // Simulate the cards appearing one-by-one (they're all ready, but we reveal sequentially)
      // First show all as 'generating' (skeleton state)
      setOfferItems(offers.map(() => ({ status: 'generating', offer: null })))

      // Reveal each card sequentially with 1.2s delay between them
      for (let i = 0; i < offers.length; i++) {
        await new Promise((r) => setTimeout(r, i === 0 ? 400 : 1200))
        setOfferItems((prev) =>
          prev.map((item, idx) =>
            idx === i ? { status: 'generated', offer: offers[i] } : item
          )
        )
      }

      setGenerated(true)
      toast.success(`${offers.length} personalized offer${offers.length !== 1 ? 's' : ''} ready to send!`)
    } catch {
      toast.error('Failed to generate offers. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  const selectedSlot = slots.find((s) => s.id === selectedSlotId)

  return (
    <div className="flex h-screen bg-muted/20">
      <Nav />
      <main className="flex-1 overflow-auto pb-20 lg:pb-0">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold">Generate Offers</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Beckon crafts a personalized message for each eligible customer — lapsed
              regulars and new leads who need a nudge.
            </p>
          </div>

          {/* Controls */}
          <Card>
            <CardContent className="pt-5 pb-5">
              <div className="flex flex-col sm:flex-row gap-4 items-end">
                <div className="flex-1 space-y-1.5">
                  <label className="text-sm font-medium">Select a slow slot</label>
                  <Select value={selectedSlotId} onValueChange={setSelectedSlotId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a time slot..." />
                    </SelectTrigger>
                    <SelectContent>
                      {slots.length === 0 ? (
                        <SelectItem value="none" disabled>
                          No open slots available
                        </SelectItem>
                      ) : (
                        slots.map((slot) => (
                          <SelectItem key={slot.id} value={slot.id}>
                            {slot.label}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleGenerate}
                  disabled={generating || !selectedSlotId}
                  className="gap-2 sm:flex-shrink-0"
                  size="lg"
                >
                  {generating ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      Generate Offers
                    </>
                  )}
                </Button>
              </div>

              {selectedSlot && (
                <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                  <Info size={12} />
                  <span>
                    Offers will be sent to customers who are lapsed (30+ days since their last visit) or new leads.
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Offer cards */}
          {offerItems.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">
                  {generated
                    ? `${offerItems.length} Offer${offerItems.length !== 1 ? 's' : ''} Ready`
                    : 'Crafting personalized messages...'}
                </h2>
                {generated && (
                  <span className="text-xs text-muted-foreground">
                    Edit any message before sending
                  </span>
                )}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {offerItems.map((item, i) =>
                  item.status === 'generating' ? (
                    <OfferCardSkeleton key={i} />
                  ) : (
                    <OfferCard
                      key={item.offer.id}
                      offer={item.offer}
                      onSent={() => {}}
                    />
                  )
                )}
              </div>
            </div>
          )}

          {/* Empty state before generation */}
          {offerItems.length === 0 && !generating && (
            <div className="text-center py-16 text-muted-foreground">
              <div className="text-5xl mb-4">✨</div>
              <p className="font-medium text-foreground text-lg mb-2">
                Ready to fill your chairs?
              </p>
              <p className="text-sm max-w-sm mx-auto">
                Select a slow slot and click &quot;Generate Offers&quot; — Beckon will craft a
                personalized message for each eligible customer.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default function GeneratePage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-muted-foreground">Loading...</div>}>
      <GeneratePageInner />
    </Suspense>
  )
}
