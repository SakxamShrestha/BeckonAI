'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ChevronDown, Zap, Plug, ClipboardCheck, Menu, X, CheckCircle } from 'lucide-react'

const FEATURES = [
  {
    Icon: Zap,
    title: 'How Beckon works',
    desc: 'AI-powered personalized offers sent automatically — so you can focus on your craft, not your marketing.',
  },
  {
    Icon: Plug,
    title: 'Booking system integration',
    desc: 'Works with Square, Vagaro, Fresha, Mindbody, and more. Setup takes under 15 minutes.',
  },
  {
    Icon: ClipboardCheck,
    title: 'Custom business assessment',
    desc: "We'll walk through how Beckon fits your exact schedule, slow periods, and customer base.",
  },
]

const BUSINESS_TYPES = [
  'Hair Salons',
  'Barbershops',
  'Nail Studios',
  'Restaurants & Cafés',
  'Massage & Spas',
  'Fitness Studios',
]

const NAV_LINKS = ['Features', 'How it Works', 'Contact', 'Pricing']

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    website: '',
    role: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const subject = encodeURIComponent(
      `Beckon Contact – ${form.firstName} ${form.lastName}`
    )
    const body = encodeURIComponent(
      `Name: ${form.firstName} ${form.lastName}\nEmail: ${form.email}\nWebsite: ${form.website}\nRole: ${form.role}\n\nMessage:\n${form.message}`
    )
    window.open(
      `mailto:sakxamshrestha57@gmail.com?subject=${subject}&body=${body}`,
      '_self'
    )
    setSubmitted(true)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap');

        .beckon-contact {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        /* Subtle dot-grid background */
        .beckon-contact::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: radial-gradient(circle, #d4d8ff 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.35;
          pointer-events: none;
          z-index: 0;
        }

        .beckon-contact > * {
          position: relative;
          z-index: 1;
        }

        /* Focus ring for inputs */
        .beckon-input {
          transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
        }
        .beckon-input:focus {
          outline: none;
          border-color: #3B59FF !important;
          box-shadow: 0 0 0 3px rgba(59, 89, 255, 0.13);
          background: #ffffff !important;
        }
        .beckon-input::placeholder {
          color: #bbb;
        }

        /* Button states */
        .beckon-btn-primary {
          transition: background 0.15s ease, transform 0.1s ease, box-shadow 0.15s ease;
        }
        .beckon-btn-primary:hover {
          background: #2a47ee !important;
          box-shadow: 0 4px 16px rgba(59, 89, 255, 0.35);
          transform: translateY(-1px);
        }
        .beckon-btn-primary:active {
          transform: translateY(0);
        }

        .beckon-btn-ghost {
          transition: background 0.15s ease, color 0.15s ease;
        }
        .beckon-btn-ghost:hover {
          background: #f0f3ff !important;
        }

        /* Nav link */
        .beckon-nav-link {
          transition: color 0.15s ease;
        }
        .beckon-nav-link:hover {
          color: #3B59FF !important;
        }

        /* Feature rows */
        .beckon-feature {
          transition: transform 0.2s ease;
        }
        .beckon-feature:hover {
          transform: translateX(5px);
        }

        /* Staggered fade-up on load */
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fu { animation: fadeUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards; opacity: 0; }
        .fu-1 { animation-delay: 0.05s; }
        .fu-2 { animation-delay: 0.15s; }
        .fu-3 { animation-delay: 0.25s; }
        .fu-4 { animation-delay: 0.35s; }
        .fu-5 { animation-delay: 0.45s; }
        .fu-card { animation-delay: 0.1s; }

        /* Success checkmark pop */
        @keyframes popIn {
          0% { transform: scale(0.6); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        .pop-in { animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

        /* Business type grid hover */
        .beckon-biz-cell {
          transition: background 0.15s ease, color 0.15s ease;
        }
        .beckon-biz-cell:hover {
          background: #f0f3ff;
          color: #3B59FF !important;
        }
      `}</style>

      <div className="beckon-contact min-h-screen" style={{ background: '#FAFAFA' }}>

        {/* ── Sticky Nav ── */}
        <header
          className="sticky top-0 z-50"
          style={{
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid #EBEBEB',
          }}
        >
          <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: '#3B59FF' }}
              >
                <span className="text-white font-extrabold text-sm">B</span>
              </div>
              <span className="font-extrabold text-lg" style={{ color: '#1A1A1A', letterSpacing: '-0.3px' }}>
                Beckon
              </span>
            </Link>

            {/* Center links — desktop */}
            <nav className="hidden md:flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link}
                  href={
                    link === 'Contact' ? '/contact'
                    : link === 'How it Works' ? '/how-it-works'
                    : '/'
                  }
                  className="beckon-nav-link flex items-center gap-1 text-sm font-semibold"
                  style={{ color: link === 'Contact' ? '#3B59FF' : '#666' }}
                >
                  {link}
                  {link === 'Features' && <ChevronDown size={13} strokeWidth={2.5} />}
                </Link>
              ))}
            </nav>

            {/* CTA — desktop */}
            <Link
              href="/"
              className="beckon-btn-ghost hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold border"
              style={{ borderColor: '#3B59FF', color: '#3B59FF', background: 'transparent' }}
            >
              Request Demo <ArrowUpRight size={14} strokeWidth={2.5} />
            </Link>

            {/* Hamburger — mobile */}
            <button
              className="md:hidden p-2 rounded-lg"
              style={{ color: '#444' }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div
              className="md:hidden px-5 py-4 flex flex-col gap-1"
              style={{ borderTop: '1px solid #EBEBEB', background: '#fff' }}
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link}
                  href={link === 'Contact' ? '/contact' : '/'}
                  className="px-3 py-2.5 rounded-lg text-sm font-semibold"
                  style={{ color: link === 'Contact' ? '#3B59FF' : '#555' }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link}
                </Link>
              ))}
              <Link
                href="/"
                className="mt-2 text-center px-4 py-2.5 rounded-lg text-sm font-bold border"
                style={{ borderColor: '#3B59FF', color: '#3B59FF' }}
                onClick={() => setMobileOpen(false)}
              >
                Request Demo
              </Link>
            </div>
          )}
        </header>

        {/* ── Main Content ── */}
        <main className="max-w-6xl mx-auto px-5 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* ── LEFT COLUMN ── */}
            <div>
              {/* "Contact Us" badge */}
              <div
                className="fu fu-1 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-6"
                style={{ background: '#EEF1FF', color: '#3B59FF' }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#3B59FF' }} />
                Contact Us
              </div>

              {/* Heading */}
              <h1
                className="fu fu-2 font-extrabold leading-[1.1] mb-5"
                style={{ color: '#1A1A1A', fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', letterSpacing: '-1.5px' }}
              >
                Get{' '}
                <span style={{ color: '#3B59FF' }}>in touch.</span>
              </h1>

              {/* Supporting text */}
              <p
                className="fu fu-3 text-base leading-relaxed mb-10"
                style={{ color: '#666', maxWidth: '38ch' }}
              >
                Whether you want to see Beckon in action, have questions about
                setup, or just want a real conversation — we&apos;re here for it.
              </p>

              {/* Feature list */}
              <div className="fu fu-4 space-y-5 mb-12">
                {FEATURES.map(({ Icon, title, desc }) => (
                  <div key={title} className="beckon-feature flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: '#EEF1FF' }}
                    >
                      <Icon size={18} style={{ color: '#3B59FF' }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold mb-0.5" style={{ color: '#1A1A1A' }}>
                        {title}
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: '#888' }}>
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* ── RIGHT COLUMN — Form Card ── */}
            <div
              className="fu fu-card rounded-2xl p-7 md:p-8"
              style={{
                background: '#ffffff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.08)',
                border: '1px solid #EBEBEB',
              }}
            >
              {submitted ? (
                /* Success state */
                <div className="text-center py-8 px-2">
                  <div className="pop-in inline-flex items-center justify-center w-16 h-16 rounded-full mb-5"
                    style={{ background: '#EEF1FF' }}>
                    <CheckCircle size={30} style={{ color: '#3B59FF' }} />
                  </div>
                  <h3
                    className="font-extrabold text-xl mb-2"
                    style={{ color: '#1A1A1A', letterSpacing: '-0.4px' }}
                  >
                    Message sent!
                  </h3>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: '#666' }}>
                    Your email app should have opened with a pre-filled message.
                    If it didn&apos;t, reach us directly at:
                  </p>
                  <a
                    href="mailto:sakxamshrestha57@gmail.com"
                    className="inline-block text-sm font-bold break-all"
                    style={{ color: '#3B59FF' }}
                  >
                    sakxamshrestha57@gmail.com
                  </a>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ firstName: '', lastName: '', email: '', website: '', role: '', message: '' }) }}
                    className="mt-7 block w-full py-2.5 rounded-xl text-sm font-semibold transition-colors"
                    style={{ background: '#F5F5F5', color: '#666' }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                /* Form */
                <>
                  <h2
                    className="font-extrabold text-xl mb-1"
                    style={{ color: '#1A1A1A', letterSpacing: '-0.4px' }}
                  >
                    Send us a message
                  </h2>
                  <p className="text-sm mb-6" style={{ color: '#999' }}>
                    We&apos;ll get back to you within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name row */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { name: 'firstName', label: 'First name', placeholder: 'Maria', required: true },
                        { name: 'lastName', label: 'Last name', placeholder: 'Garcia', required: true },
                      ].map((field) => (
                        <div key={field.name}>
                          <label
                            className="block text-xs font-bold mb-1.5"
                            style={{ color: '#555' }}
                          >
                            {field.label}
                          </label>
                          <input
                            name={field.name}
                            required={field.required}
                            value={form[field.name]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            className="beckon-input w-full px-3.5 py-2.5 rounded-xl text-sm border"
                            style={{
                              background: '#F5F5F5',
                              borderColor: '#EBEBEB',
                              color: '#1A1A1A',
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Single-column fields */}
                    {[
                      {
                        name: 'email',
                        type: 'email',
                        label: 'Email',
                        placeholder: 'maria@salon.com',
                        required: true,
                      },
                      {
                        name: 'website',
                        type: 'text',
                        label: 'Business website',
                        placeholder: 'mariassalon.com',
                        required: false,
                      },
                      {
                        name: 'role',
                        type: 'text',
                        label: 'Your role (optional)',
                        placeholder: 'Owner, Manager…',
                        required: false,
                      },
                    ].map((field) => (
                      <div key={field.name}>
                        <label
                          className="block text-xs font-bold mb-1.5"
                          style={{ color: '#555' }}
                        >
                          {field.label}
                        </label>
                        <input
                          name={field.name}
                          type={field.type}
                          required={field.required}
                          value={form[field.name]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          className="beckon-input w-full px-3.5 py-2.5 rounded-xl text-sm border"
                          style={{
                            background: '#F5F5F5',
                            borderColor: '#EBEBEB',
                            color: '#1A1A1A',
                          }}
                        />
                      </div>
                    ))}

                    {/* Message */}
                    <div>
                      <label
                        className="block text-xs font-bold mb-1.5"
                        style={{ color: '#555' }}
                      >
                        Message (optional)
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your business and what you'd love Beckon to help with…"
                        rows={4}
                        className="beckon-input w-full px-3.5 py-2.5 rounded-xl text-sm border resize-none"
                        style={{
                          background: '#F5F5F5',
                          borderColor: '#EBEBEB',
                          color: '#1A1A1A',
                        }}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="beckon-btn-primary w-full py-3.5 rounded-xl text-sm font-extrabold text-white mt-1"
                      style={{ background: '#3B59FF', letterSpacing: '0.02em' }}
                    >
                      Submit
                    </button>

                    <p className="text-xs text-center" style={{ color: '#BBB' }}>
                      No spam. No pressure. Just a real conversation.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </main>

        {/* ── Minimal Footer ── */}
        <footer
          className="max-w-6xl mx-auto px-5 pb-10 flex items-center justify-between"
          style={{ borderTop: '1px solid #EBEBEB', paddingTop: '2rem' }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ background: '#3B59FF' }}
            >
              <span className="text-white font-extrabold text-xs">B</span>
            </div>
            <span className="text-sm font-bold" style={{ color: '#1A1A1A' }}>Beckon</span>
          </div>
          <p className="text-xs" style={{ color: '#BBB' }}>
            Built for local businesses, by people who care about them.
          </p>
        </footer>
      </div>
    </>
  )
}
