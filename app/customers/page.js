'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Nav } from '@/components/Nav'
import { CustomerTable } from '@/components/CustomerTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { UserPlus, Loader2 } from 'lucide-react'

function CustomersSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-10 bg-muted rounded-md animate-pulse" />
      <div className="rounded-lg border overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 border-b last:border-b-0">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CustomersPage() {
  const router = useRouter()
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '' })

  async function fetchCustomers() {
    try {
      const res = await fetch('/api/customers')
      const data = await res.json()
      setCustomers(data)
    } catch {
      toast.error('Failed to load customers')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  async function handleAdd(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) return
    setAdding(true)
    try {
      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      const newCustomer = await res.json()
      setCustomers((prev) => [newCustomer, ...prev])
      setForm({ name: '', phone: '' })
      setShowForm(false)
      toast.success(`${form.name} added as a new lead!`)
    } catch {
      toast.error('Failed to add customer')
    } finally {
      setAdding(false)
    }
  }

  const lapsedCount = customers.filter((c) => {
    if (c.isNewLead || !c.lastVisitDate) return false
    return (Date.now() - new Date(c.lastVisitDate).getTime()) / 86400000 > 45
  }).length

  const newLeadCount = customers.filter((c) => c.isNewLead).length

  return (
    <div className="flex h-screen bg-muted/20">
      <Nav />
      <main className="flex-1 overflow-auto pb-20 lg:pb-0">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Customers</h1>
              <p className="text-muted-foreground text-sm mt-1">
                {customers.length} total ·{' '}
                <span className="text-amber-600 font-medium">{lapsedCount} lapsed</span> ·{' '}
                <span className="text-blue-600 font-medium">{newLeadCount} new leads</span>
              </p>
            </div>
            <Button
              onClick={() => setShowForm(!showForm)}
              className="gap-2 flex-shrink-0"
            >
              <UserPlus size={16} />
              Add Customer
            </Button>
          </div>

          {/* Add customer form */}
          {showForm && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Add New Customer</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 space-y-1">
                    <Label htmlFor="name" className="text-xs">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g. Maria Gonzalez"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <Label htmlFor="phone" className="text-xs">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="e.g. 555-201-4892"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <Button type="submit" disabled={adding} className="gap-2">
                      {adding ? <Loader2 size={16} className="animate-spin" /> : null}
                      {adding ? 'Adding...' : 'Add'}
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

          {/* Customer table */}
          {loading ? (
            <CustomersSkeleton />
          ) : (
            <CustomerTable customers={customers} />
          )}
        </div>
      </main>
    </div>
  )
}
