'use client'

import { useState, useEffect } from 'react'
import { Nav } from '@/components/Nav'
import { SlotList } from '@/components/SlotList'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { PlusCircle, Loader2 } from 'lucide-react'

function SlotsSkeleton() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardContent className="pt-4 pb-4 space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3 w-40" />
            <div className="flex items-center justify-between mt-3">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-8 w-32" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function SlotsPage() {
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ datetime: '', label: '' })

  async function fetchSlots() {
    try {
      const res = await fetch('/api/slots')
      const data = await res.json()
      setSlots(data)
    } catch {
      toast.error('Failed to load slots')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSlots()
  }, [])

  // Auto-generate label from datetime
  function handleDateChange(e) {
    const val = e.target.value
    let label = ''
    if (val) {
      const d = new Date(val)
      label = d.toLocaleDateString('en-US', {
        weekday: 'long',
        hour: 'numeric',
        minute: '2-digit',
      })
    }
    setForm({ datetime: val, label })
  }

  async function handleAdd(e) {
    e.preventDefault()
    if (!form.datetime || !form.label.trim()) return
    setAdding(true)
    try {
      const res = await fetch('/api/slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: form.datetime, label: form.label }),
      })
      if (!res.ok) throw new Error()
      const newSlot = await res.json()
      setSlots((prev) => [...prev, { ...newSlot, offers: [] }])
      setForm({ datetime: '', label: '' })
      setShowForm(false)
      toast.success(`${form.label} added as a slow slot`)
    } catch {
      toast.error('Failed to add slot')
    } finally {
      setAdding(false)
    }
  }

  const openCount = slots.filter(
    (s) => !s.isFilled && new Date(s.date) >= new Date()
  ).length

  return (
    <div className="flex h-screen bg-muted/20">
      <Nav />
      <main className="flex-1 overflow-auto pb-20 lg:pb-0">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Slow Slots</h1>
              <p className="text-muted-foreground text-sm mt-1">
                {slots.length} total ·{' '}
                <span className="text-red-600 font-medium">{openCount} open</span>
              </p>
            </div>
            <Button
              onClick={() => setShowForm(!showForm)}
              className="gap-2 flex-shrink-0"
            >
              <PlusCircle size={16} />
              Add Slot
            </Button>
          </div>

          {/* Add slot form */}
          {showForm && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Add Slow Time Slot</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 space-y-1">
                    <Label htmlFor="datetime" className="text-xs">Date & Time</Label>
                    <Input
                      id="datetime"
                      type="datetime-local"
                      value={form.datetime}
                      onChange={handleDateChange}
                      required
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <Label htmlFor="label" className="text-xs">Label (auto-filled, editable)</Label>
                    <Input
                      id="label"
                      placeholder="e.g. Tuesday 2:00 PM"
                      value={form.label}
                      onChange={(e) => setForm({ ...form, label: e.target.value })}
                      required
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <Button type="submit" disabled={adding} className="gap-2">
                      {adding ? <Loader2 size={16} className="animate-spin" /> : null}
                      {adding ? 'Adding...' : 'Add Slot'}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Slots list */}
          {loading ? <SlotsSkeleton /> : <SlotList slots={slots} />}
        </div>
      </main>
    </div>
  )
}
