'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight, Menu, X, Clock, TrendingDown, Heart,
  Brain, CalendarCheck, UserPlus, RotateCcw, ShieldCheck, ArrowRight, Sparkles,
} from 'lucide-react'

const NAV_LINKS = ['How it Works', 'Contact']

const SIGNALS = [
  {
    Icon: Clock,
    label: 'Recency',
    color: '#FFE500',
    bgColor: 'rgba(255,229,0,0.1)',
    headline: 'When did they last visit?',
    desc: "Beckon tracks every customer's last appointment. If Maria usually comes every 30 days but it's been 45, that's a signal. The longer the gap, the stronger the nudge.",
    example: 'Maria last visited 47 days ago. Her usual cycle is 28 days.',
    badge: 'At risk',
    badgeBg: 'rgba(255,140,0,0.15)',
    badgeColor: '#FF8C00',
  },
  {
    Icon: TrendingDown,
    color: '#34D399',
    bgColor: 'rgba(52,211,153,0.1)',
    label: 'Price Sensitivity',
    headline: 'Do they respond to deals?',
    desc: 'Beckon watches whether a customer has ever booked after receiving an offer. Loyal regulars who book without discounts get a smaller nudge — or none. Price-sensitive customers get a better deal.',
    example: 'James has booked twice after a 10% offer. Full-price rate: 40%.',
    badge: 'Offer-responsive',
    badgeBg: 'rgba(52,211,153,0.1)',
    badgeColor: '#34D399',
  },
  {
    Icon: Heart,
    color: '#F87171',
    bgColor: 'rgba(248,113,113,0.1)',
    label: 'Loyalty Signal',
    headline: 'How loyal are they?',
    desc: "Visit frequency, referrals, and rebooking patterns combine into a loyalty score. Your best regulars get personal touches — not discounts. They'd feel insulted by a coupon.",
    example: 'Sofia visits every 3 weeks and has referred 2 new clients.',
    badge: 'VIP regular',
    badgeBg: 'rgba(248,113,113,0.1)',
    badgeColor: '#F87171',
  },
]

const DECISIONS = [
  {
    number: '01',
    question: 'Should we even send anything?',
    answer: "A loyal customer who just visited last week gets nothing. Sending them a discount would be wasteful — and it trains them to expect one. Beckon only acts when there's a real reason.",
    icon: Brain,
  },
  {
    number: '02',
    question: 'How generous should the offer be?',
    answer: "Not everyone needs 20% off. A semi-loyal customer who's slightly overdue might just need a friendly reminder. A lapsed customer who hasn't been back in 3 months gets a more meaningful incentive.",
    icon: Sparkles,
  },
  {
    number: '03',
    question: 'When is the perfect moment?',
    answer: "Beckon looks at your upcoming slow slots and the customer's personal visit rhythm. The message lands at the exact moment they're statistically most likely to say yes.",
    icon: CalendarCheck,
  },
]

const PLAYBOOKS = [
  {
    Icon: CalendarCheck,
    color: '#FFE500',
    bg: 'rgba(255,229,0,0.1)',
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
    color: '#34D399',
    bg: 'rgba(52,211,153,0.1)',
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
    color: '#C084FC',
    bg: 'rgba(192,132,252,0.1)',
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

const NEVERS = [
  'Send a discount to someone who was going to book anyway',
  'Blast the same offer to your entire list',
  'Expose your business to deal-hunting strangers',
  'Require you to review or approve every message',
  'Undercut your brand by making you look desperate',
]

export default function HowItWorksPage() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <style>{`

        body { background: #0A0A0A; }

        .hiw-page { font-family: 'Plus Jakarta Sans', sans-serif; }

        .hiw-page::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: radial-gradient(circle, #2A2A2A 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.6;
          pointer-events: none;
          z-index: 0;
        }
        .hiw-page > * { position: relative; z-index: 1; }

        .hiw-nav-link { transition: color 0.15s ease; }
        .hiw-nav-link:hover { color: #FFE500 !important; }

        .hiw-btn-ghost { transition: background 0.15s ease; }
        .hiw-btn-ghost:hover { background: rgba(255,229,0,0.08) !important; }

        .signal-card { transition: transform 0.2s ease, box-shadow 0.2s ease; cursor: default; }
        .signal-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.4) !important;
          border-color: #2A2A2A !important;
        }

        .decision-row { transition: background 0.15s ease; }
        .decision-row:hover { background: #141414 !important; }

        .playbook-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .playbook-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.4) !important;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fu { animation: fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) forwards; opacity: 0; }
        .fu-1 { animation-delay: 0.05s; }
        .fu-2 { animation-delay: 0.15s; }
        .fu-3 { animation-delay: 0.25s; }
        .fu-4 { animation-delay: 0.35s; }

        .hero-rule {
          display: inline-block;
          width: 40px; height: 4px;
          border-radius: 9999px;
          background: #FFE500;
          margin-bottom: 1.5rem;
        }

        .hiw-cta-btn { transition: background 0.15s ease, transform 0.1s ease, box-shadow 0.15s ease; }
        .hiw-cta-btn:hover {
          background: #E6CF00 !important;
          box-shadow: 0 4px 20px rgba(255,229,0,0.3);
          transform: translateY(-1px);
        }

        .never-item { transition: background 0.15s ease; }
        .never-item:hover { background: #141414 !important; }
      `}</style>

      <div className="hiw-page min-h-screen" style={{ background: '#0A0A0A', color: '#fff' }}>

        {/* Nav */}
        <header className="sticky top-0 z-50"
          style={{ background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #1A1A1A' }}>
          <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#FFE500' }}>
                <span className="font-extrabold text-sm" style={{ color: '#0A0A0A' }}>B</span>
              </div>
              <span className="font-extrabold text-lg" style={{ color: '#fff', letterSpacing: '-0.3px' }}>Beckon</span>
            </Link>

            <nav className="hidden md:flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <Link key={link}
                  href={link === 'Contact' ? '/contact' : link === 'How it Works' ? '/how-it-works' : '/'}
                  className="hiw-nav-link flex items-center gap-1 text-sm font-semibold"
                  style={{ color: link === 'How it Works' ? '#FFE500' : '#666' }}>
                  {link}
                </Link>
              ))}
            </nav>


            <button className="md:hidden p-2 rounded-lg" style={{ color: '#888' }} onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {mobileOpen && (
            <div className="md:hidden px-5 py-4 flex flex-col gap-1" style={{ borderTop: '1px solid #1A1A1A', background: '#0A0A0A' }}>
              {NAV_LINKS.map((link) => (
                <Link key={link} href={link === 'Contact' ? '/contact' : '/how-it-works'}
                  className="px-3 py-2.5 rounded-lg text-sm font-semibold"
                  style={{ color: link === 'How it Works' ? '#FFE500' : '#888' }}
                  onClick={() => setMobileOpen(false)}>
                  {link}
                </Link>
              ))}
            </div>
          )}
        </header>

        <main className="max-w-6xl mx-auto px-5">

          {/* Hero */}
          <section className="py-20 md:py-28 text-center max-w-3xl mx-auto">
            <div className="fu fu-1"><span className="hero-rule" /></div>
            <div className="fu fu-1 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-6"
              style={{ background: 'rgba(255,229,0,0.1)', color: '#FFE500' }}>
              <Brain size={12} /> The AI Engine
            </div>
            <h1 className="fu fu-2 font-extrabold leading-[1.1] mb-5"
              style={{ color: '#fff', fontSize: 'clamp(2.4rem, 5.5vw, 3.6rem)', letterSpacing: '-2px' }}>
              Smart enough to know{' '}
              <span style={{ color: '#FFE500' }}>who needs a nudge.</span>
            </h1>
            <p className="fu fu-3 text-lg leading-relaxed mx-auto" style={{ color: '#666', maxWidth: '52ch' }}>
              Beckon doesn&apos;t blast discounts. It reads three signals per customer and decides — automatically —
              whether to send an offer, how generous to be, and exactly when. Here&apos;s how it works.
            </p>
          </section>

          {/* Three Signals */}
          <section className="pb-20">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#444', letterSpacing: '0.12em' }}>
                Step 1 — What Beckon reads
              </p>
              <h2 className="font-extrabold text-2xl md:text-3xl" style={{ color: '#fff', letterSpacing: '-0.8px' }}>
                Three signals per customer
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {SIGNALS.map((s, i) => (
                <div key={s.label} className="signal-card rounded-2xl p-6"
                  style={{ background: '#0F0F0F', border: '1px solid #1A1A1A' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.bgColor }}>
                      <s.Icon size={18} style={{ color: s.color }} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#444', letterSpacing: '0.1em' }}>Signal {i + 1}</p>
                      <p className="font-extrabold text-base" style={{ color: '#fff', letterSpacing: '-0.3px' }}>{s.label}</p>
                    </div>
                  </div>
                  <h3 className="font-bold text-sm mb-2" style={{ color: '#CCC' }}>{s.headline}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#666' }}>{s.desc}</p>
                  <div className="rounded-xl p-3 text-xs leading-relaxed font-medium" style={{ background: s.bgColor, color: s.color }}>
                    <span className="font-bold">Example: </span>{s.example}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: s.badgeBg, color: s.badgeColor }}>
                      {s.badge}
                    </span>
                    <ArrowRight size={14} style={{ color: '#333' }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Three Decisions */}
          <section className="pb-20">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#444', letterSpacing: '0.12em' }}>
                Step 2 — What Beckon decides
              </p>
              <h2 className="font-extrabold text-2xl md:text-3xl" style={{ color: '#fff', letterSpacing: '-0.8px' }}>
                Three questions, answered in seconds
              </h2>
            </div>

            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #1A1A1A' }}>
              {DECISIONS.map((d, i) => (
                <div key={d.number} className="decision-row flex items-start gap-5 p-6 md:p-7"
                  style={{ background: '#0F0F0F', borderBottom: i < DECISIONS.length - 1 ? '1px solid #1A1A1A' : 'none' }}>
                  <div className="flex-shrink-0 flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,229,0,0.1)' }}>
                      <d.icon size={18} style={{ color: '#FFE500' }} />
                    </div>
                    <span className="text-xs font-bold" style={{ color: '#333' }}>{d.number}</span>
                  </div>
                  <div className="pt-1">
                    <h3 className="font-extrabold text-base mb-2" style={{ color: '#fff', letterSpacing: '-0.3px' }}>{d.question}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#666', maxWidth: '60ch' }}>{d.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Three Playbooks */}
          <section className="pb-20">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#444', letterSpacing: '0.12em' }}>
                Step 3 — What Beckon does
              </p>
              <h2 className="font-extrabold text-2xl md:text-3xl" style={{ color: '#fff', letterSpacing: '-0.8px' }}>
                Three playbooks, running automatically
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {PLAYBOOKS.map((p) => (
                <div key={p.title} className="playbook-card rounded-2xl p-6"
                  style={{ background: '#0F0F0F', border: '1px solid #1A1A1A' }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: p.bg }}>
                    <p.Icon size={20} style={{ color: p.color }} />
                  </div>
                  <h3 className="font-extrabold text-base mb-1" style={{ color: '#fff', letterSpacing: '-0.3px' }}>{p.title}</h3>
                  <p className="text-xs font-semibold mb-5" style={{ color: p.color }}>{p.tagline}</p>
                  <div className="space-y-3">
                    {p.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                          style={{ background: p.bg, color: p.color }}>
                          {i + 1}
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: '#666' }}>{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* What Beckon Never Does */}
          <section className="pb-20">
            <div className="rounded-2xl p-8 md:p-10" style={{ background: '#0F0F0F', border: '1px solid #1A1A1A' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(248,113,113,0.1)' }}>
                  <ShieldCheck size={18} style={{ color: '#F87171' }} />
                </div>
                <div>
                  <h2 className="font-extrabold text-xl" style={{ color: '#fff', letterSpacing: '-0.4px' }}>What Beckon never does</h2>
                  <p className="text-sm" style={{ color: '#555' }}>Protecting your brand is part of the product.</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-2">
                {NEVERS.map((item) => (
                  <div key={item} className="never-item flex items-start gap-3 px-4 py-3 rounded-xl" style={{ background: '#141414' }}>
                    <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                      style={{ background: 'rgba(248,113,113,0.15)', color: '#F87171' }}>✕</span>
                    <p className="text-sm" style={{ color: '#888' }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="pb-24 text-center">
            <div className="rounded-2xl px-8 py-14 md:py-16 max-w-2xl mx-auto"
              style={{ background: '#0F0F0F', border: '1px solid #2A2A2A', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
              <div className="inline-block w-12 h-0.5 mb-6 rounded-full" style={{ background: '#FFE500' }} />
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#444', letterSpacing: '0.12em' }}>
                Ready to see it live?
              </p>
              <h2 className="font-extrabold mb-4" style={{ color: '#fff', fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', letterSpacing: '-1px' }}>
                See Beckon work on your actual customers.
              </h2>
              <p className="text-base mb-8" style={{ color: '#555', maxWidth: '38ch', margin: '0 auto 2rem' }}>
                We&apos;ll do a live walkthrough using your business type and slow periods. No pitch. Just the product.
              </p>
              <Link href="/contact"
                className="hiw-cta-btn inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-extrabold"
                style={{ background: '#FFE500', color: '#0A0A0A' }}>
                Get in Touch <ArrowUpRight size={16} strokeWidth={2.5} />
              </Link>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="max-w-6xl mx-auto px-5 pb-10 flex items-center justify-between"
          style={{ borderTop: '1px solid #1A1A1A', paddingTop: '2rem' }}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: '#FFE500' }}>
              <span className="font-extrabold text-xs" style={{ color: '#0A0A0A' }}>B</span>
            </div>
            <span className="text-sm font-bold" style={{ color: '#fff' }}>Beckon</span>
          </div>
          <p className="text-xs" style={{ color: '#444' }}>Built for local businesses, by people who care about them.</p>
        </footer>
      </div>
    </>
  )
}
