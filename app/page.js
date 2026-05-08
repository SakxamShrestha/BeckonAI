'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Lock, ArrowRight, ArrowUpRight, CheckCircle } from 'lucide-react'

const PROBLEMS = [
  {
    tag: 'Revenue lost forever',
    headline: 'Empty slots can\'t be recovered.',
    body: 'A chair sitting idle on Tuesday afternoon is money that\'s gone the moment the clock passes. No tool today helps you fill it before it happens — they only help you count what you lost.',
    accent: '#FF4444',
    accentBg: 'rgba(255,68,68,0.08)',
  },
  {
    tag: 'Brand destruction',
    headline: 'Groupon sends deal-hunters, not loyal clients.',
    body: 'Discount platforms take up to 50% of your revenue, flood your schedule with one-time bargain seekers, and train your real customers to wait for a sale. You work twice as hard for half the pay.',
    accent: '#FF8C00',
    accentBg: 'rgba(255,140,0,0.08)',
  },
  {
    tag: 'No time, no team',
    headline: 'You\'re the stylist, the chef, the receptionist.',
    body: 'Marketing tools were built for people with marketing teams. You have 20 minutes between clients. Mailchimp, Instagram ads, and loyalty programs weren\'t designed for your reality.',
    accent: '#FF4444',
    accentBg: 'rgba(255,68,68,0.08)',
  },
]

const STEALTH_FEATURES = [
  {
    number: '01',
    teaser: 'Fill your slowest days before they become dead.',
    hint: 'Timing × Customer intelligence',
  },
  {
    number: '02',
    teaser: 'Win back regulars before they\'re gone for good.',
    hint: 'Recency × Loyalty signals',
  },
  {
    number: '03',
    teaser: 'New clients — without Groupon, ads, or guesswork.',
    hint: 'Personalization × Local reach',
  },
]

const AUDIENCE = [
  { label: 'Hair Salons', icon: '✂️' },
  { label: 'Barbershops', icon: '💈' },
  { label: 'Nail Studios', icon: '💅' },
  { label: 'Restaurants', icon: '🍽️' },
  { label: 'Massage & Spa', icon: '💆' },
  { label: 'Cafés', icon: '☕' },
  { label: 'Tattoo Shops', icon: '🎨' },
  { label: 'Dog Groomers', icon: '🐾' },
  { label: 'Fitness Studios', icon: '🏋️' },
  { label: 'Personal Trainers', icon: '🤸' },
]

function WaitlistForm({ dark = false }) {
  const [email, setEmail] = useState('')
  const [bizType, setBizType] = useState('')
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, businessType: bizType }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 py-4">
        <CheckCircle size={22} style={{ color: '#FFE500', flexShrink: 0 }} />
        <div>
          <p className="font-bold text-sm" style={{ color: dark ? '#fff' : '#1A1A1A' }}>
            You&apos;re on the list.
          </p>
          <p className="text-xs mt-0.5" style={{ color: dark ? '#888' : '#666' }}>
            We&apos;ll reach out before we launch. No spam.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="waitlist-input flex-1 px-4 py-3 rounded-xl text-sm font-medium"
        style={{
          background: dark ? '#1A1A1A' : '#F5F5F5',
          border: `1.5px solid ${dark ? '#2A2A2A' : '#E0E0E0'}`,
          color: dark ? '#fff' : '#1A1A1A',
          outline: 'none',
        }}
      />
      <select
        value={bizType}
        onChange={e => setBizType(e.target.value)}
        className="waitlist-input px-4 py-3 rounded-xl text-sm font-medium"
        style={{
          background: dark ? '#1A1A1A' : '#F5F5F5',
          border: `1.5px solid ${dark ? '#2A2A2A' : '#E0E0E0'}`,
          color: bizType ? (dark ? '#fff' : '#1A1A1A') : '#888',
          outline: 'none',
          minWidth: '160px',
        }}
      >
        <option value="">Business type</option>
        {AUDIENCE.map(a => (
          <option key={a.label} value={a.label}>{a.label}</option>
        ))}
        <option value="Other">Other</option>
      </select>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="waitlist-btn px-5 py-3 rounded-xl text-sm font-extrabold flex items-center justify-center gap-2 whitespace-nowrap"
        style={{
          background: '#FFE500',
          color: '#0A0A0A',
          opacity: status === 'loading' ? 0.7 : 1,
        }}
      >
        {status === 'loading' ? 'Joining…' : <>Join the Waitlist <ArrowRight size={15} /></>}
      </button>
      {status === 'error' && (
        <p className="text-xs mt-1" style={{ color: '#FF4444' }}>
          Something went wrong. Try again.
        </p>
      )}
    </form>
  )
}

export default function LandingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        body { background: #0A0A0A; }

        .beckon-land * {
          font-family: 'DM Sans', sans-serif;
          box-sizing: border-box;
        }
        .beckon-land h1,
        .beckon-land h2,
        .beckon-land h3,
        .beckon-land .syne {
          font-family: 'Syne', sans-serif;
        }

        /* Grain overlay */
        .beckon-land::after {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.03;
          pointer-events: none;
          z-index: 999;
        }

        /* Focus styles */
        .waitlist-input:focus {
          border-color: #FFE500 !important;
          box-shadow: 0 0 0 3px rgba(255, 229, 0, 0.15);
        }

        /* Button */
        .waitlist-btn {
          transition: transform 0.1s ease, box-shadow 0.15s ease;
          cursor: pointer;
        }
        .waitlist-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(255,229,0,0.35);
        }
        .waitlist-btn:active { transform: translateY(0); }

        /* Nav link */
        .nav-link {
          transition: color 0.15s ease;
          color: #888;
        }
        .nav-link:hover { color: #fff; }

        /* Problem card */
        .problem-card {
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .problem-card:hover {
          transform: translateY(-3px);
          border-color: #333 !important;
        }

        /* Stealth card */
        .stealth-card {
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .stealth-card:hover {
          border-color: #FFE500 !important;
          background: rgba(255,229,0,0.03) !important;
        }

        /* Audience cell */
        .audience-cell {
          transition: background 0.15s ease, color 0.15s ease;
        }
        .audience-cell:hover {
          background: rgba(255,229,0,0.08) !important;
          color: #FFE500 !important;
        }

        /* Animations */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fu { animation: fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) forwards; opacity: 0; }
        .fu-1 { animation-delay: 0.05s; }
        .fu-2 { animation-delay: 0.15s; }
        .fu-3 { animation-delay: 0.25s; }
        .fu-4 { animation-delay: 0.40s; }

        /* Yellow underline on headline */
        .yellow-mark {
          position: relative;
          display: inline;
          color: #FFE500;
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0A0A0A; }
        ::-webkit-scrollbar-thumb { background: #2A2A2A; border-radius: 3px; }
      `}</style>

      <div className="beckon-land min-h-screen" style={{ background: '#0A0A0A', color: '#fff' }}>

        {/* ── Nav ── */}
        <header style={{
          borderBottom: '1px solid #1A1A1A',
          background: 'rgba(10,10,10,0.9)',
          backdropFilter: 'blur(12px)',
          position: 'sticky', top: 0, zIndex: 50,
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: '#FFE500', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 14, color: '#0A0A0A' }}>B</span>
              </div>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 18, color: '#fff', letterSpacing: '-0.3px' }}>Beckon</span>
            </Link>

            {/* Links */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
              <Link href="/how-it-works" className="nav-link" style={{ fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>How it Works</Link>
              <Link href="/contact" className="nav-link" style={{ fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>Contact</Link>
            </nav>

            {/* CTA */}
            <Link
              href="#waitlist"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '8px 16px', borderRadius: 10,
                background: '#FFE500', color: '#0A0A0A',
                fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 13,
                textDecoration: 'none',
                transition: 'box-shadow 0.15s ease, transform 0.1s ease',
              }}
            >
              Join Waitlist <ArrowRight size={13} />
            </Link>
          </div>
        </header>

        {/* ── Hero ── */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '90px 20px 80px' }}>

          {/* Stealth badge */}
          <div className="fu fu-1" style={{ marginBottom: 28 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 14px', borderRadius: 999,
              border: '1px solid #2A2A2A', background: '#141414',
              fontSize: 12, fontWeight: 600, color: '#888',
              letterSpacing: '0.05em',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#FFE500', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              IN STEALTH MODE · EARLY ACCESS
            </span>
          </div>

          {/* Headline */}
          <h1 className="fu fu-2 syne" style={{
            fontSize: 'clamp(2.8rem, 7vw, 5.2rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-2.5px',
            maxWidth: '14ch',
            marginBottom: 24,
          }}>
            The Uber for{' '}
            <span className="yellow-mark">local service</span>
            {' '}businesses.
          </h1>

          {/* Subtext */}
          <p className="fu fu-3" style={{
            fontSize: 18,
            lineHeight: 1.7,
            color: '#888',
            maxWidth: '52ch',
            marginBottom: 40,
          }}>
            We&apos;re building the first AI that fills empty chairs, wins back lapsed
            clients, and brings in new ones — automatically, personally, and without
            Groupon. Set it up in an afternoon. Then let it run.
          </p>

          {/* Waitlist form */}
          <div className="fu fu-4" id="waitlist">
            <WaitlistForm dark />
            <p style={{ fontSize: 12, color: '#555', marginTop: 12 }}>
              No credit card · No spam · Early access only
            </p>
          </div>
        </section>

        {/* ── Divider bar ── */}
        <div style={{ borderTop: '1px solid #1A1A1A', borderBottom: '1px solid #1A1A1A', background: '#0F0F0F', padding: '18px 20px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center' }}>
            {[
              'Built for local, not e-commerce',
              'Zero marketing expertise required',
              'Works with your existing booking tool',
              'Launching soon',
            ].map((item, i) => (
              <span key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#555', fontWeight: 500 }}>
                {i > 0 && <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#2A2A2A' }} />}
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ── Problem Section ── */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '90px 20px' }}>
          <div style={{ marginBottom: 56 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: '#555', textTransform: 'uppercase', marginBottom: 14 }}>
              The real problem
            </p>
            <h2 className="syne" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-1.5px', maxWidth: '22ch', lineHeight: 1.1 }}>
              The tools you have were built for someone else.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {PROBLEMS.map((p) => (
              <div
                key={p.tag}
                className="problem-card"
                style={{
                  background: '#0F0F0F',
                  border: '1px solid #1A1A1A',
                  borderRadius: 16,
                  padding: 28,
                }}
              >
                <span style={{
                  display: 'inline-block',
                  padding: '4px 10px',
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  background: p.accentBg,
                  color: p.accent,
                  marginBottom: 16,
                }}>
                  {p.tag}
                </span>
                <h3 className="syne" style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, letterSpacing: '-0.4px', lineHeight: 1.3 }}>
                  {p.headline}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: '#666' }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Stealth Features ── */}
        <section style={{ background: '#0F0F0F', borderTop: '1px solid #1A1A1A', borderBottom: '1px solid #1A1A1A', padding: '90px 20px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ marginBottom: 56, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: '#555', textTransform: 'uppercase', marginBottom: 14 }}>
                  What we&apos;re building
                </p>
                <h2 className="syne" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1 }}>
                  Three things,{' '}
                  <span style={{ color: '#FFE500' }}>done automatically.</span>
                </h2>
              </div>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '7px 14px', borderRadius: 8,
                border: '1px solid #2A2A2A', background: '#141414',
                fontSize: 12, fontWeight: 600, color: '#555',
              }}>
                <Lock size={12} /> Full details at launch
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {STEALTH_FEATURES.map((f) => (
                <div
                  key={f.number}
                  className="stealth-card"
                  style={{
                    background: '#0A0A0A',
                    border: '1px solid #1A1A1A',
                    borderRadius: 16,
                    padding: 28,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Lock badge */}
                  <div style={{
                    position: 'absolute', top: 20, right: 20,
                    width: 28, height: 28, borderRadius: 8,
                    background: '#1A1A1A',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Lock size={13} color="#444" />
                  </div>

                  <span className="syne" style={{ fontSize: 40, fontWeight: 800, color: '#1E1E1E', display: 'block', marginBottom: 20, letterSpacing: '-2px' }}>
                    {f.number}
                  </span>

                  <p className="syne" style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.35, letterSpacing: '-0.4px', marginBottom: 14, paddingRight: 24 }}>
                    {f.teaser}
                  </p>

                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '5px 10px', borderRadius: 6,
                    background: 'rgba(255,229,0,0.08)',
                    fontSize: 11, fontWeight: 600, color: '#FFE500',
                    letterSpacing: '0.04em',
                  }}>
                    {f.hint}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Audience ── */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '90px 20px' }}>
          <div style={{ marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: '#555', textTransform: 'uppercase', marginBottom: 14 }}>
              Who it&apos;s for
            </p>
            <h2 className="syne" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              Built for businesses that run on{' '}
              <span style={{ color: '#FFE500' }}>repeat clients.</span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            border: '1px solid #1A1A1A',
            borderRadius: 16,
            overflow: 'hidden',
          }}>
            {AUDIENCE.map((a, i) => (
              <div
                key={a.label}
                className="audience-cell"
                style={{
                  padding: '20px 16px',
                  display: 'flex', alignItems: 'center', gap: 10,
                  borderRight: (i + 1) % 5 !== 0 ? '1px solid #1A1A1A' : 'none',
                  borderBottom: i < AUDIENCE.length - (AUDIENCE.length % 5 || 5) ? '1px solid #1A1A1A' : 'none',
                  cursor: 'default',
                  color: '#666',
                }}
              >
                <span style={{ fontSize: 20 }}>{a.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{a.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Final Waitlist CTA ── */}
        <section style={{
          borderTop: '1px solid #1A1A1A',
          background: '#0F0F0F',
          padding: '90px 20px',
        }}>
          <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              width: 56, height: 56, borderRadius: 14,
              background: '#FFE500',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px',
            }}>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 22, color: '#0A0A0A' }}>B</span>
            </div>

            <h2 className="syne" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: 16, lineHeight: 1.1 }}>
              Be first in line.
            </h2>
            <p style={{ fontSize: 16, color: '#666', lineHeight: 1.7, marginBottom: 36, maxWidth: '44ch', margin: '0 auto 36px' }}>
              We&apos;re opening access to a small group of local businesses first.
              Join the waitlist and we&apos;ll reach out personally before we launch.
            </p>

            <WaitlistForm dark />

            <p style={{ fontSize: 12, color: '#444', marginTop: 14 }}>
              No credit card required · You&apos;ll hear from us, not a bot
            </p>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer style={{ borderTop: '1px solid #1A1A1A', padding: '28px 20px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: '#FFE500', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 11, color: '#0A0A0A' }}>B</span>
              </div>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 14, color: '#fff' }}>Beckon</span>
            </div>

            <p style={{ fontSize: 12, color: '#444' }}>
              Built for local businesses, by people who care about them.
            </p>

            <div style={{ display: 'flex', gap: 20 }}>
              <Link href="/how-it-works" style={{ fontSize: 13, color: '#555', textDecoration: 'none', fontWeight: 500, transition: 'color 0.15s' }}>How it Works</Link>
              <Link href="/contact" style={{ fontSize: 13, color: '#555', textDecoration: 'none', fontWeight: 500 }}>Contact</Link>
              <Link href="/login" style={{ fontSize: 13, color: '#555', textDecoration: 'none', fontWeight: 500 }}>Sign In</Link>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}
