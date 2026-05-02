'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { CheckCircle, Send, Loader2 } from 'lucide-react'

// card status: 'generating' | 'generated' | 'sending' | 'sent'

export function OfferCard({ offer, onSent }) {
  const [message, setMessage] = useState(offer.message)
  const [status, setStatus] = useState('generated')

  async function handleSend() {
    setStatus('sending')
    // Fake 800ms send delay
    await new Promise((r) => setTimeout(r, 800))

    try {
      const res = await fetch('/api/offers/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offerId: offer.id, message }),
      })

      if (!res.ok) throw new Error('Send failed')

      setStatus('sent')
      toast.success(`Message sent to ${offer.customer.name.split(' ')[0]}!`)
      onSent?.()
    } catch {
      setStatus('generated')
      toast.error('Something went wrong. Please try again.')
    }
  }

  if (status === 'sent') {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{offer.customer.name}</CardTitle>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 gap-1">
              <CheckCircle size={12} />
              Sent
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">{offer.customer.phone}</p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-green-700 italic">&quot;{message}&quot;</p>
          <p className="text-xs text-muted-foreground mt-2">
            Code: <span className="font-mono font-bold">{offer.discountCode}</span>
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{offer.customer.name}</CardTitle>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary font-mono">
            {offer.discountCode}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{offer.customer.phone}</span>
          {offer.customer.lastVisitDate && (
            <>
              <span>·</span>
              <span>
                Last visit:{' '}
                {new Date(offer.customer.lastVisitDate).toLocaleDateString(
                  'en-US',
                  { month: 'short', day: 'numeric' }
                )}
              </span>
            </>
          )}
          {offer.customer.isNewLead && (
            <>
              <span>·</span>
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-xs">
                New Lead
              </Badge>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full text-sm border rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-muted/30"
        />
        <Button
          onClick={handleSend}
          disabled={status === 'sending'}
          className="w-full gap-2"
        >
          {status === 'sending' ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send size={16} />
              Send Message
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

export function OfferCardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-3 w-24 mt-1" />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>
        <Skeleton className="h-9 w-full" />
        <p className="text-xs text-center text-muted-foreground animate-pulse">
          AI is crafting a personalized message...
        </p>
      </CardContent>
    </Card>
  )
}
