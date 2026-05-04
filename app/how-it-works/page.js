'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
  Clock,
  TrendingDown,
  Heart,
  Brain,
  CalendarCheck,
  UserPlus,
  RotateCcw,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react'

const NAV_LINKS = ['How it Works', 'Contact']

/* ── The three signals Beckon tracks ── */
const SIGNALS = [
  {
    Icon: Clock,
    label: 'Recency',
    color: '#3B59FF',
    bgColor: '#EEF1FF',
    headline: 'When did they last visit?',
    desc: "Beckon tracks every customer's last appointment. If Maria usually comes every 30 days but it's been 45, that's a signal. The longer the gap, the stronger the nudge.",
    example: 'Maria last visited 47 days ago. Her usual cycle is 28 days.',
    badge: 'At risk',
    badgeBg: '#FFF3E0',
    badgeColor: '#E65100',
  },
  {
    Icon: TrendingDown,
    color: '#059669',
    bgColor: '#ECFDF5',
    label: 'Price Sensitivity',
    headline: 'Do they respond to deals?',
    desc: 'Beckon watches whether a customer has ever booked after receiving an offer. Loyal regulars who book without discounts get a smaller nudge — or none. Price-sensitive customers get a better deal.',
    example: 'James has booked twice after a 10% offer. Full-price rate: 40%.',
    badge: 'Offer-responsive',
    badgeBg: '#ECFDF5',
    badgeColor: '#059669',
  },
  {
    Icon: Heart,
    color: '#DC2626',
    bgColor: '#FEF2F2',
    label: 'Loyalty Signal',
    headline: 'How loyal are they?',
    desc: "Visit frequency, referrals, and rebooking patterns combine into a loyalty score. Your best regulars get personal touches — not discounts. They'd feel insulted by a coupon.",
    example: "Sofia visits every 3 weeks and has referred 2 new clients.",
    badge: 'VIP regular',
    badgeBg: '#FEF2F2',
    badgeColor: '#DC2626',
  },
]

/* ── Three decisions the AI makes ── */
const DECISIONS = [
  {
    number: '01',
    question: 'Should we even send anything?',
    answer:
      'A loyal customer who just visited last week gets nothing. Sending them a discount would be wasteful — and it trains them to expect one. Beckon only acts when there\'s a real reason.',
    icon: Brain,
  },
  {
    number: '02',
    question: 'How generous should the offer be?',
    answer:
      'Not everyone needs 20% off. A semi-loyal customer who\'s slightly overdue might just need a friendly reminder. A lapsed customer who hasn\'t been back in 3 months gets a more meaningful incentive.',
    icon: Sparkles,
  },
  {
    number: '03',
    question: 'When is the perfect moment?',
    answer:
      "Beckon looks at your upcoming slow slots and the customer's personal visit rhythm. The message lands at the exact moment they're statistically most likely to say yes.",
    icon: CalendarCheck,
  },
]

/* ── The three playbooks ── */
const PLAYBOOKS = [
  {
    Icon: CalendarCheck,
    color: '#3B59FF',
    bg: '#EEF1FF',
    title: 'Slow Day Intelligence',
    tagline: 'Fill Tuesday before it becomes dead',
    steps: [
      'Beckon learns your historically slow periods',
      'Before the slot goes empty, it identifies who is overdue for a visit',
      'A personalized message goes out: "Hey Maria, rare opening this Tuesday at 2pm — just for you."',
      'Offer depth is calibrated: 5% nudge for a semi-loyal regular, 15% for someone on the fence',
    ],
  },
  {
    Icon: RotateCcw,
    color: '#059669',
    bg: '#ECFDF5',
    title: 'Lapsed Customer Win-Back',
    tagline: "Recover regulars before they're gone",
    steps: [
      "Beckon notices when a regular hasn't returned past their usual cycle",
      'At 1.5× their average gap: a warm, personal re-engagement message',
      'At 3× their gap: a more generous offer — because losing them for good is costlier',
      'Message reads like it\'s from you, not a bot: "We miss you, James."',
    ],
  },
  {
    Icon: UserPlus,
    color: '#7C3AED',
    bg: '#F5F3FF',
    title: 'First Visit Offer',
    tagline: 'Convert curious strangers into paying clients',
    steps: [
      'A unique link or QR code for your window, Instagram bio, or Google listing',
      'New visitors only — once they book, the offer disappears forever',
      'You control the minimum spend and which services qualify',
      'After their first visit, they graduate to the regular tier automatically',
    ],
  },
]

/* ── What Beckon never does ── */
const NEVERS = [
  'Send a discount to someone who was going to book anyway',
  'Blast the same offer to your entire list',
  'Expose your business to deal-hunting strangers',
  'Require you to review or approve every message',
  'Undercut your brand by making you look desperate',
]

export default function HowItWorksPage() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openSignal, setOpenSignal] = useState(null)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap');

        .hiw-page {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        /* Dot grid background */
        .hiw-page::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: radial-gradient(circle, #d4d8ff 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.3;
          pointer-events: none;
          z-index: 0;
        }
        .hiw-page > * { position: relative; z-index: 1; }

        /* Nav */
        .hiw-nav-link { transition: color 0.15s ease; }
        .hiw-nav-link:hover { color: #3B59FF !important; }

        .hiw-btn-ghost { transition: background 0.15s ease; }
        .hiw-btn-ghost:hover { background: #f0f3ff !important; }

        /* Signal cards */
        .signal-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: pointer;
        }
        .signal-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.1) !important;
        }

        /* Decision row */
        .decision-row {
          transition: background 0.15s ease;
        }
        .decision-row:hover {
          background: #f8f9ff !important;
        }

        /* Playbook card */
        .playbook-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .playbook-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.1) !important;
        }

        /* Step dot connector */
        .step-line {
          position: absolute;
          left: 9px;
          top: 22px;
          bottom: -16px;
          width: 2px;
          background: linear-gradient(to bottom, currentColor, transparent);
          opacity: 0.2;
        }

        /* Animations */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fu { animation: fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) forwards; opacity: 0; }
        .fu-1 { animation-delay: 0.05s; }
        .fu-2 { animation-delay: 0.15s; }
        .fu-3 { animation-delay: 0.25s; }
        .fu-4 { animation-delay: 0.35s; }

        /* Hero accent line */
        .hero-rule {
          display: inline-block;
          width: 40px;
          height: 4px;
          border-radius: 9999px;
          background: #3B59FF;
          margin-bottom: 1.5rem;
        }

        /* CTA button */
        .hiw-cta-btn {
          transition: background 0.15s ease, transform 0.1s ease, box-shadow 0.15s ease;
        }
        .hiw-cta-btn:hover {
          background: #2a47ee !important;
          box-shadow: 0 4px 20px rgba(59,89,255,0.35);
          transform: translateY(-1px);
        }

        /* Never list item */
        .never-item {
          transition: background 0.15s ease;
        }
        .never-item:hover {
          background: #fff8f8 !important;
        }
      `}</style>

      <div className="hiw-page min-h-screen" style={{ background: '#FAFAFA' }}>

        {/* ── Nav ── */}
        <header
          className="sticky top-0 z-50"
          style={{
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid #EBEBEB',
          }}
        >
          <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#3B59FF' }}>
                <span className="text-white font-extrabold text-sm">B</span>
              </div>
              <span className="font-extrabold text-lg" style={{ color: '#1A1A1A', letterSpacing: '-0.3px' }}>
                Beckon
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link}
                  href={
                    link === 'Contact' ? '/contact'
                    : link === 'How it Works' ? '/how-it-works'
                    : '/'
                  }
                  className="hiw-nav-link flex items-center gap-1 text-sm font-semibold"
                  style={{ color: link === 'How it Works' ? '#3B59FF' : '#666' }}
                >
                  {link}
                  {link === 'Features' && <ChevronDown size={13} strokeWidth={2.5} />}
                </Link>
              ))}
            </nav>

            <Link
              href="/contact"
              className="hiw-btn-ghost hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold border"
              style={{ borderColor: '#3B59FF', color: '#3B59FF', background: 'transparent' }}
            >
              Request Demo <ArrowUpRight size={14} strokeWidth={2.5} />
            </Link>

            <button
              className="md:hidden p-2 rounded-lg"
              style={{ color: '#444' }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {mobileOpen && (
            <div className="md:hidden px-5 py-4 flex flex-col gap-1"
              style={{ borderTop: '1px solid #EBEBEB', background: '#fff' }}>
              {NAV_LINKS.map((link) => (
                <Link key={link} href="/"
                  className="px-3 py-2.5 rounded-lg text-sm font-semibold"
                  style={{ color: link === 'How it Works' ? '#3B59FF' : '#555' }}
                  onClick={() => setMobileOpen(false)}>
                  {link}
                </Link>
              ))}
            </div>
          )}
        </header>

        <main className="max-w-6xl mx-auto px-5">

          {/* ── Hero ── */}
          <section className="py-20 md:py-28 text-center max-w-3xl mx-auto">
            <div className="fu fu-1">
              <span className="hero-rule" />
            </div>
            <div
              className="fu fu-1 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-6"
              style={{ background: '#EEF1FF', color: '#3B59FF' }}
            >
              <Brain size={12} />
              The AI Engine
            </div>
            <h1
              className="fu fu-2 font-extrabold leading-[1.1] mb-5"
              style={{ color: '#1A1A1A', fontSize: 'clamp(2.4rem, 5.5vw, 3.6rem)', letterSpacing: '-2px' }}
            >
              Smart enough to know{' '}
              <span style={{ color: '#3B59FF' }}>who needs a nudge.</span>
            </h1>
            <p
              className="fu fu-3 text-lg leading-relaxed mx-auto"
              style={{ color: '#666', maxWidth: '52ch' }}
            >
              Beckon doesn&apos;t blast discounts. It reads three signals per customer
              and decides — automatically — whether to send an offer, how generous to
              be, and exactly when. Here&apos;s how it works.
            </p>
          </section>

          {/* ── Three Signals ── */}
          <section className="pb-20">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#AAA', letterSpacing: '0.12em' }}>
                Step 1 — What Beckon reads
              </p>
              <h2 className="font-extrabold text-2xl md:text-3xl" style={{ color: '#1A1A1A', letterSpacing: '-0.8px' }}>
                Three signals per customer
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {SIGNALS.map((s, i) => (
                <div
                  key={s.label}
                  className="signal-card rounded-2xl p-6"
                  style={{
                    background: '#fff',
                    border: '1px solid #EBEBEB',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  }}
                  onClick={() => setOpenSignal(openSignal === i ? null : i)}
                >
                  {/* Icon + label */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: s.bgColor }}
                    >
                      <s.Icon size={18} style={{ color: s.color }} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#AAA', letterSpacing: '0.1em' }}>
                        Signal {i + 1}
                      </p>
                      <p className="font-extrabold text-base" style={{ color: '#1A1A1A', letterSpacing: '-0.3px' }}>
                        {s.label}
                      </p>
                    </div>
                  </div>

                  <h3 className="font-bold text-sm mb-2" style={{ color: '#333' }}>
                    {s.headline}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#888' }}>
                    {s.desc}
                  </p>

                  {/* Example chip */}
                  <div
                    className="rounded-xl p-3 text-xs leading-relaxed font-medium"
                    style={{ background: s.bgColor, color: s.color }}
                  >
                    <span className="font-bold">Example: </span>{s.example}
                  </div>

                  {/* Badge */}
                  <div className="mt-3 flex items-center justify-between">
                    <span
                      className="inline-block px-2.5 py-1 rounded-full text-xs font-bold"
                      style={{ background: s.badgeBg, color: s.badgeColor }}
                    >
                      {s.badge}
                    </span>
                    <ArrowRight size={14} style={{ color: '#CCC' }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Three Decisions ── */}
          <section className="pb-20">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#AAA', letterSpacing: '0.12em' }}>
                Step 2 — What Beckon decides
              </p>
              <h2 className="font-extrabold text-2xl md:text-3xl" style={{ color: '#1A1A1A', letterSpacing: '-0.8px' }}>
                Three questions, answered in seconds
              </h2>
            </div>

            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid #EBEBEB', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
            >
              {DECISIONS.map((d, i) => (
                <div
                  key={d.number}
                  className="decision-row flex items-start gap-5 p-6 md:p-7"
                  style={{
                    background: '#fff',
                    borderBottom: i < DECISIONS.length - 1 ? '1px solid #F0F0F0' : 'none',
                  }}
                >
                  {/* Number + icon */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-2">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: '#EEF1FF' }}
                    >
                      <d.icon size={18} style={{ color: '#3B59FF' }} />
                    </div>
                    <span className="text-xs font-bold" style={{ color: '#CCC' }}>{d.number}</span>
                  </div>

                  <div className="pt-1">
                    <h3
                      className="font-extrabold text-base mb-2"
                      style={{ color: '#1A1A1A', letterSpacing: '-0.3px' }}
                    >
                      {d.question}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#777', maxWidth: '60ch' }}>
                      {d.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Three Playbooks ── */}
          <section className="pb-20">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#AAA', letterSpacing: '0.12em' }}>
                Step 3 — What Beckon does
              </p>
              <h2 className="font-extrabold text-2xl md:text-3xl" style={{ color: '#1A1A1A', letterSpacing: '-0.8px' }}>
                Three playbooks, running automatically
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {PLAYBOOKS.map((p) => (
                <div
                  key={p.title}
                  className="playbook-card rounded-2xl p-6"
                  style={{
                    background: '#fff',
                    border: '1px solid #EBEBEB',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  }}
                >
                  {/* Header */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: p.bg }}
                  >
                    <p.Icon size={20} style={{ color: p.color }} />
                  </div>
                  <h3 className="font-extrabold text-base mb-1" style={{ color: '#1A1A1A', letterSpacing: '-0.3px' }}>
                    {p.title}
                  </h3>
                  <p className="text-xs font-semibold mb-5" style={{ color: p.color }}>
                    {p.tagline}
                  </p>

                  {/* Steps */}
                  <div className="space-y-3">
                    {p.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-3 relative">
                        <div
                          className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                          style={{ background: p.bg, color: p.color }}
                        >
                          {i + 1}
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: '#777' }}>
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── What Beckon Never Does ── */}
          <section className="pb-20">
            <div
              className="rounded-2xl p-8 md:p-10"
              style={{
                background: '#fff',
                border: '1px solid #EBEBEB',
                boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#FEF2F2' }}>
                  <ShieldCheck size={18} style={{ color: '#DC2626' }} />
                </div>
                <div>
                  <h2 className="font-extrabold text-xl" style={{ color: '#1A1A1A', letterSpacing: '-0.4px' }}>
                    What Beckon never does
                  </h2>
                  <p className="text-sm" style={{ color: '#999' }}>
                    Protecting your brand is part of the product.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-2">
                {NEVERS.map((item) => (
                  <div
                    key={item}
                    className="never-item flex items-start gap-3 px-4 py-3 rounded-xl"
                    style={{ background: '#FAFAFA' }}
                  >
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                      style={{ background: '#FEE2E2', color: '#DC2626' }}
                    >
                      ✕
                    </span>
                    <p className="text-sm" style={{ color: '#555' }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── CTA ── */}
          <section className="pb-24 text-center">
            <div
              className="rounded-2xl px-8 py-14 md:py-16 max-w-2xl mx-auto"
              style={{
                background: 'linear-gradient(135deg, #3B59FF 0%, #6B7FFF 100%)',
                boxShadow: '0 8px 40px rgba(59,89,255,0.25)',
              }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '0.12em' }}>
                Ready to see it live?
              </p>
              <h2
                className="font-extrabold mb-4"
                style={{ color: '#fff', fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', letterSpacing: '-1px' }}
              >
                See Beckon work on your actual customers.
              </h2>
              <p className="text-base mb-8" style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '38ch', margin: '0 auto 2rem' }}>
                We&apos;ll do a live walkthrough using your business type and slow periods. No pitch. Just the product.
              </p>
              <Link
                href="/contact"
                className="hiw-cta-btn inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-extrabold"
                style={{ background: '#fff', color: '#3B59FF' }}
              >
                Request a Demo <ArrowUpRight size={16} strokeWidth={2.5} />
              </Link>
            </div>
          </section>
        </main>

        {/* ── Footer ── */}
        <footer
          className="max-w-6xl mx-auto px-5 pb-10 flex items-center justify-between"
          style={{ borderTop: '1px solid #EBEBEB', paddingTop: '2rem' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: '#3B59FF' }}>
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
