'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { X, CheckCircle } from 'lucide-react'

const BUSINESS_TYPES = [
  'Hair Salon',
  'Barbershop',
  'Restaurant',
  'Nail Studio',
  'Massage / Spa',
  'Café',
  'Tattoo Shop',
  'Dog Groomer',
  'Fitness Studio',
  'Personal Trainer',
  'Other',
]

export function RequestDemoModal({ children }) {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', business: '', type: '' })

  function handleSubmit(e) {
    e.preventDefault()
    const subject = encodeURIComponent(`Demo Request – ${form.business || form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nBusiness: ${form.business}\nType: ${form.type}\nEmail: ${form.email}`
    )
    window.location.href = `mailto:hello@beckon.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleClose() {
    setOpen(false)
    setTimeout(() => setSubmitted(false), 300)
  }

  return (
    <>
      <span onClick={() => setOpen(true)} className="cursor-pointer">
        {children}
      </span>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={handleClose}
        >
          <div
            className="bg-background rounded-2xl p-6 max-w-md w-full shadow-2xl border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-bold text-xl">Request a Demo</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  We&apos;ll reach out within 24 hours to walk you through Beckon.
                </p>
              </div>
              <button
                onClick={handleClose}
                className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-muted"
              >
                <X size={18} />
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-1">You&apos;re on the list!</h3>
                <p className="text-muted-foreground text-sm">
                  We&apos;ll be in touch within 24 hours to set up your personal walkthrough.
                </p>
                <Button className="mt-5" onClick={handleClose}>
                  Close
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Your name</label>
                  <input
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Maria"
                    className="w-full px-3 py-2 rounded-lg border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Business name</label>
                  <input
                    name="business"
                    required
                    value={form.business}
                    onChange={handleChange}
                    placeholder="Maria's Salon"
                    className="w-full px-3 py-2 rounded-lg border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Type of business</label>
                  <select
                    name="type"
                    required
                    value={form.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select one…</option>
                    {BUSINESS_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="maria@salon.com"
                    className="w-full px-3 py-2 rounded-lg border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Button type="submit" className="w-full mt-2">
                  Request My Demo
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  No pressure. No spam. Just a quick walkthrough.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
