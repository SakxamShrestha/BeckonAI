import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RequestDemoModal } from '@/components/RequestDemoModal'
import { ArrowRight, CheckCircle } from 'lucide-react'

const BUSINESS_TYPES = [
  'Hair Salon',
  'Barbershop',
  'Restaurant',
  'Nail Studio',
  'Massage Spa',
  'Café',
  'Tattoo Shop',
  'Dog Groomer',
  'Fitness Studio',
  'Personal Trainer',
]

const PROBLEMS = [
  {
    emoji: '💸',
    title: 'Deal platforms cost you more than a slow day',
    description:
      "Discount marketplaces take up to 50% commission and send deal-hunters who never return. You end up working twice as hard for half the pay — and training customers to wait for a sale.",
  },
  {
    emoji: '📣',
    title: 'Generic blasts don\'t move the needle',
    description:
      "Sending the same discount to your entire list teaches loyal customers to hold out for a deal. You give away margin to people who would have paid full price anyway.",
  },
  {
    emoji: '⏰',
    title: 'Empty slots are revenue lost forever',
    description:
      "A chair that sits empty on Tuesday afternoon can't be recovered. That's not just a missed booking — it's the most expensive hour of your week.",
  },
]

const COMPARISON = [
  {
    feature: 'Targets your own past customers',
    beckon: true,
    dealPlatforms: false,
    emailBlasts: false,
    loyaltyCards: false,
  },
  {
    feature: 'Personalizes offer depth per customer',
    beckon: true,
    dealPlatforms: false,
    emailBlasts: false,
    loyaltyCards: false,
  },
  {
    feature: 'Sends at the right moment automatically',
    beckon: true,
    dealPlatforms: false,
    emailBlasts: false,
    loyaltyCards: false,
  },
  {
    feature: 'No commission or % of revenue',
    beckon: true,
    dealPlatforms: false,
    emailBlasts: true,
    loyaltyCards: true,
  },
  {
    feature: 'Works without a marketing team',
    beckon: true,
    dealPlatforms: true,
    emailBlasts: false,
    loyaltyCards: true,
  },
  {
    feature: 'Protects your brand from deal-hunters',
    beckon: true,
    dealPlatforms: false,
    emailBlasts: true,
    loyaltyCards: true,
  },
  {
    feature: 'Tracks lapsed customers automatically',
    beckon: true,
    dealPlatforms: false,
    emailBlasts: false,
    loyaltyCards: false,
  },
  {
    feature: 'Setup in under 15 minutes',
    beckon: true,
    dealPlatforms: true,
    emailBlasts: false,
    loyaltyCards: true,
  },
]

const STEPS = [
  {
    number: '01',
    title: 'Add your customers',
    description:
      'Import from your booking system or upload a simple list of names and phone numbers. Takes 10 minutes.',
    icon: '👥',
  },
  {
    number: '02',
    title: 'Mark your slow slots',
    description:
      "Tell Beckon which days and times are historically quiet. Tuesday 2pm? First week of January? Beckon learns your rhythm.",
    icon: '📅',
  },
  {
    number: '03',
    title: 'Beckon does the rest',
    description:
      'Before a slow period hits, Beckon automatically sends a personalized offer to the right customer at exactly the right moment.',
    icon: '✨',
  },
]

const STATS = [
  { value: '2.3', label: 'empty slots filled per week', sublabel: 'average across all businesses' },
  { value: '68%', label: 'of lapsed customers return', sublabel: 'after a personalized message' },
  { value: '15 min', label: 'to set up', sublabel: 'then it runs itself' },
]

const PRICING = [
  {
    name: 'Starter',
    price: '$19',
    desc: 'Perfect for solo operators',
    features: ['Up to 100 customers', 'SMS offers', 'Slow day intelligence'],
    featured: false,
  },
  {
    name: 'Growth',
    price: '$49',
    desc: 'For small teams',
    features: [
      'Up to 500 customers',
      'Everything in Starter',
      'Referral rewards',
      'Social DM trigger',
    ],
    featured: true,
  },
  {
    name: 'Full House',
    price: '$89',
    desc: 'Multi-location or high volume',
    features: [
      '500+ customers',
      'Everything in Growth',
      'Multi-location',
      'Priority support',
    ],
    featured: false,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Sticky nav */}
      <header className="border-b bg-background/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">B</span>
            </div>
            <span className="font-bold text-lg">Beckon</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <RequestDemoModal>
              <Button size="sm" className="gap-1.5">
                Request Demo <ArrowRight size={14} />
              </Button>
            </RequestDemoModal>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28 text-center">
          <Badge className="bg-white/20 text-white hover:bg-white/20 mb-6 text-sm px-4 py-1 border-0">
            Built for local service businesses
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Fill Your Empty Chairs.
            <br />
            <span className="text-indigo-200">Automatically.</span>
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto mb-10">
            Beckon sends personalized offers to the right customer at the right
            time — so your slow Tuesday becomes a full house. No deal platforms,
            no blasting discounts, no marketing degree required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <RequestDemoModal>
              <Button
                size="lg"
                className="bg-white text-indigo-700 hover:bg-indigo-50 font-semibold px-8 gap-2 w-full sm:w-auto"
              >
                Request a Demo <ArrowRight size={18} />
              </Button>
            </RequestDemoModal>
          </div>
          <p className="mt-6 text-indigo-200 text-sm">
            No credit card required · Setup in 15 minutes · Cancel anytime
          </p>
        </div>
      </section>

      {/* Business types scroll row */}
      <section className="border-b bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 overflow-x-auto">
            <span className="text-sm text-muted-foreground whitespace-nowrap flex-shrink-0 font-medium">
              Built for:
            </span>
            {BUSINESS_TYPES.map((type, i) => (
              <span key={type} className="flex items-center gap-3 flex-shrink-0">
                <span className="text-sm font-medium text-foreground whitespace-nowrap">
                  {type}
                </span>
                {i < BUSINESS_TYPES.length - 1 && (
                  <span className="text-muted-foreground">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Problem section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The marketing tools you have don&apos;t work for you
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            They were built for e-commerce companies with marketing teams. You&apos;re a
            stylist, a chef, a therapist. You need something different.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {PROBLEMS.map((problem) => (
            <Card key={problem.title} className="border-red-100 bg-red-50/50">
              <CardContent className="pt-6">
                <div className="text-3xl mb-3">{problem.emoji}</div>
                <h3 className="font-semibold text-lg mb-2">{problem.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {problem.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-muted/30 border-y">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How Beckon works
            </h2>
            <p className="text-muted-foreground text-lg">
              Set it up once. Then let it run.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step) => (
              <div key={step.number} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-3xl mb-4">
                  {step.icon}
                </div>
                <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                  Step {step.number}
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-primary/5 border border-primary/20 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="font-semibold mb-3 text-center">The Beckon difference</h3>
            <div className="space-y-2">
              {[
                'Only sends to real past customers — not strangers',
                'Discount depth set by AI — loyal customers get smaller nudges',
                'Timing based on their personal visit cycle, not a blast schedule',
                "Reads like a text from Sarah, not an automated blast",
              ].map((point) => (
                <div key={point} className="flex items-start gap-2 text-sm">
                  <CheckCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Results that actually matter to you
          </h2>
          <p className="text-muted-foreground text-lg">
            Not conversion rates. Just: did more people show up?
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {STATS.map((stat) => (
            <div
              key={stat.value}
              className="text-center p-8 rounded-2xl bg-muted/40 border"
            >
              <div className="text-5xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="font-medium mb-1">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-muted/30 border-y">
        <div className="max-w-5xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How Beckon compares
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Other tools were built for different problems. Beckon is the only one
              built specifically to fill empty local service slots without sacrificing your brand.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border bg-card shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left px-5 py-4 font-semibold text-muted-foreground w-1/2">Feature</th>
                  <th className="px-4 py-4 text-center font-bold text-primary">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-xs">B</span>
                      </div>
                      Beckon
                    </div>
                  </th>
                  <th className="px-4 py-4 text-center font-medium text-muted-foreground">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-lg">🏷️</span>
                      Deal Platforms
                    </div>
                  </th>
                  <th className="px-4 py-4 text-center font-medium text-muted-foreground">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-lg">📧</span>
                      Email Blasts
                    </div>
                  </th>
                  <th className="px-4 py-4 text-center font-medium text-muted-foreground">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-lg">🃏</span>
                      Loyalty Cards
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i % 2 === 0 ? 'bg-muted/20' : ''}
                  >
                    <td className="px-5 py-3.5 font-medium">{row.feature}</td>
                    <td className="px-4 py-3.5 text-center">
                      {row.beckon ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 font-bold text-xs">✓</span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-500 font-bold text-xs">✕</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      {row.dealPlatforms ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 font-bold text-xs">✓</span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-500 font-bold text-xs">✕</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      {row.emailBlasts ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 font-bold text-xs">✓</span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-500 font-bold text-xs">✕</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      {row.loyaltyCards ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 font-bold text-xs">✓</span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-500 font-bold text-xs">✕</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-4">
            Deal platforms include Groupon and similar discount marketplaces. Email blasts include Mailchimp and Klaviyo. Loyalty cards include punch cards and basic points programs.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-background border-y">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Flat monthly fee. No surprises.
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              A percentage-of-revenue model feels like a tax on your success. Beckon
              is a flat fee — like hiring a part-time marketing assistant.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {PRICING.map((plan) => (
              <Card
                key={plan.name}
                className={plan.featured ? 'border-primary shadow-lg' : ''}
              >
                {plan.featured && (
                  <div className="bg-primary text-primary-foreground text-xs font-semibold text-center py-1.5 rounded-t-lg -mt-px -mx-px">
                    Most Popular
                  </div>
                )}
                <CardContent className="pt-6 pb-6">
                  <div className="mb-4">
                    <p className="font-semibold text-lg">{plan.name}</p>
                    <p className="text-sm text-muted-foreground">{plan.desc}</p>
                  </div>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/mo</span>
                  </div>
                  <div className="space-y-2 mb-6">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm">
                        <CheckCircle size={14} className="text-primary flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <RequestDemoModal>
                    <Button className="w-full" variant={plan.featured ? 'default' : 'outline'}>
                      Request a Demo
                    </Button>
                  </RequestDemoModal>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to fill your empty chairs?
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
          Join hundreds of local businesses using Beckon to turn slow days into
          their most profitable ones.
        </p>
        <RequestDemoModal>
          <Button size="lg" className="gap-2 px-8">
            Request a Demo <ArrowRight size={18} />
          </Button>
        </RequestDemoModal>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">B</span>
            </div>
            <span className="font-semibold text-sm">Beckon</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Built for local businesses, by people who care about them.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/login" className="hover:text-foreground transition-colors">Login</Link>
            <RequestDemoModal>
              <span className="hover:text-foreground transition-colors cursor-pointer">Request Demo</span>
            </RequestDemoModal>
          </div>
        </div>
      </footer>
    </div>
  )
}
