# Project: Beckon — AI-Powered Customer Offers for Local Service Businesses

## Overview

**Beckon** is an AI-driven personalized offer platform built exclusively for **local service businesses** — think hair salons, barbershops, nail studios, restaurants, cafés, massage parlors, tattoo shops, and similar brick-and-mortar businesses that rely on foot traffic and repeat visits to survive.

Beckon is inspired by the mechanics of enterprise discount personalization tools (like Promi.ai), but completely reimagined for a business owner who cuts hair for a living, not one who manages a growth team. The core idea: **send the right offer, to the right person, at the right moment** — automatically — so local businesses can fill their seats, tables, and appointment books without resorting to margin-destroying platforms like Groupon or generic "10% off" posts on Instagram.

---

## The Core Problem We're Solving

> Local service businesses don't have a pricing problem. They have an **empty chair problem**.

A salon chair sitting idle on a Tuesday afternoon is revenue that's gone forever. A restaurant table empty during a slow lunch shift can't be recovered. These businesses face:

- **No reliable way to attract new customers** beyond word-of-mouth and hoping someone finds them on Google Maps
- **Groupon dependency** — the most common "solution," which attracts deal-hunters who never come back and destroys brand value
- **Generic social media promotions** that get ignored because they're not personal
- **No time or expertise** to run marketing campaigns — the owner is also the stylist, the chef, the receptionist
- **Feast-or-famine scheduling** — packed on Saturdays, empty on Tuesdays
- **Zero retention system** — no way to notice when a regular customer has stopped coming back

**Beckon's job:** Be the invisible marketing assistant that works 24/7 in the background, nudging the right people with the right offer so that the business owner can focus on their craft.

---

## Product Vision

A simple, mobile-first app that connects to a business's booking system (or just a phone number list) and automatically sends personalized offers via SMS and Instagram/Facebook DM. No website required. No data science degree required. Set it up in an afternoon, then let it run.

### Three Things Beckon Does Well

1. **Fill slow slots** — Automatically offer deals during historically dead periods before they become dead
2. **Hook first-timers** — Convert someone who heard about the business into an actual paying customer, without giving away the farm
3. **Win back lapsed regulars** — Detect when a loyal customer hasn't returned and reach out before they're gone for good

---

## Core Features

### 1. Slow Day Intelligence
- Beckon learns the business's historically slow days and time slots (e.g., Tuesday 1–4pm, first week of January)
- Before a slow period approaches, it automatically sends targeted offers to customers who are due for a return visit: "Hey Maria, it's been a while — we have a rare opening this Tuesday at 2pm, just for you: 15% off your next cut."
- Offers are only sent to real past customers, not blasted publicly — preserving brand value
- Owner sets a maximum discount depth; Beckon decides whether 5%, 10%, or 15% is needed based on how far out the slot is and how price-responsive that customer has been historically

### 2. First Visit Offer (The Anti-Groupon)
- A shareable link or QR code (for windows, Instagram bio, Google Business profile) that gives **new customers only** a personalized welcome offer
- Unlike Groupon, the offer is controlled entirely by the business: minimum spend, specific services, one-time use only
- After the first visit, the customer is graduated into the loyalty/regular tier — Beckon never shows them the new-customer offer again
- Optional: "Soft introduction" messaging style — instead of "GET 20% OFF NOW," it reads like a personal invitation: "First time visiting us? We'd love to meet you. Here's a little something to make it easy to say yes."

### 3. Lapsed Customer Win-Back
- Beckon tracks visit recency per customer
- When a regular customer crosses a configurable threshold (e.g., hasn't returned in 45 days when they usually come every 30), Beckon flags them as "at risk" and sends a personalized re-engagement message
- The offer depth scales with how long they've been gone — a nudge for 45 days, a more generous offer at 90 days
- Owner approves message templates once; Beckon handles the timing automatically

### 4. Referral Reward System
- After a positive visit (detected by return booking or manual "happy customer" tag), Beckon sends a referral prompt: "Know someone who'd love us? Send them this link — you'll both get something special."
- Both the referrer and the new customer receive a personalized offer
- Tracks which customers are your best referrers so you can treat them accordingly

### 5. Social DM Trigger
- Integrates with Instagram and Facebook DMs
- When someone DMs the business asking "do you have openings?" or "what are your prices?", Beckon can auto-respond with a personalized first-visit offer link
- Catches warm leads at exactly the moment they're considering a visit

### 6. Plain-English Weekly Digest
- Every Monday morning, the owner gets a simple text or email summary:
  - "You had 3 empty slots last Tuesday. Beckon filled 2 of them."
  - "Maria hasn't been back in 6 weeks. We sent her a message — she booked for Thursday."
  - "Your slowest upcoming period: next Wednesday afternoon. Want Beckon to reach out to 4 customers who are overdue?"
- No dashboard login required. No charts. Just what happened and what's coming.

### 7. Review Accelerator
- After a completed visit, Beckon sends a gentle follow-up asking for a Google or Yelp review
- If the customer responds positively, they're prompted to leave a review
- If they had a concern, the message routes to the owner privately — damage control before it becomes a 1-star review
- More reviews = better local SEO = more new customers organically

---

## What Beckon Is NOT

- Not a booking system (integrates with Square, Vagaro, Fresha, OpenTable, etc.)
- Not a POS system
- Not a social media scheduler
- Not a replacement for the owner's personality and relationship with customers
- Not Groupon — Beckon never exposes your business to deal-hunting strangers at a loss

---

## Target Business Profiles

| Business Type | Key Pain Point | Primary Beckon Use Case |
|---|---|---|
| Hair salon / barbershop | Empty chairs mid-week | Slow Day Intelligence + Lapsed Win-Back |
| Nail studio | Hard to stand out locally | First Visit Offer + Referral Reward |
| Restaurant / café | Slow lunch shifts, seasonal dips | Slow Day Intelligence + Social DM Trigger |
| Massage / spa | High no-show rate | Lapsed Win-Back + personalized re-booking nudge |
| Tattoo shop | Long sales cycle, price shoppers | First Visit Offer via Instagram DM |
| Personal trainer / fitness studio | Churn after initial package | Lapsed Win-Back + Referral Reward |
| Dog groomer | Clients forget to rebook | Recency tracking + automated rebook nudge |

---

## How the AI Works (Simply Put)

Beckon tracks three things per customer:

1. **Recency** — When did they last visit?
2. **Price sensitivity** — Did they respond to a past offer? Did they book when given a deal vs. not?
3. **Loyalty signal** — How often do they come? Do they refer others?

From this, it decides:
- **Whether** to send an offer (maybe a loyal, frequent customer doesn't need one)
- **How deep** the offer should be (a price-sensitive customer gets 15%; a loyal regular who just needs a nudge gets 5% or a free add-on)
- **When** to send it (based on their typical visit cycle and upcoming slow slots)

This is the core insight borrowed from enterprise discount personalization: **not everyone needs a discount.** Giving a discount to someone who would have booked anyway is wasted margin. Giving a discount to someone on the fence is what makes the difference.

---

## Pricing Model

Flat monthly fee — no percentage of revenue, no per-message fees (within generous limits).

| Plan | Price | Best For |
|---|---|---|
| Starter | $19/mo | 1-chair salon, solo operator, under 100 customers |
| Growth | $49/mo | Small team, 100–500 active customers |
| Full House | $89/mo | Multi-location or high-volume (500+ customers) |

Why flat fee: local business owners live on tight, unpredictable margins. A "% of revenue" model feels like a tax on success and creates distrust. A flat fee feels like hiring a part-time marketing assistant.

---

## Integrations (Phase 1 Targets)

- **Booking:** Square Appointments, Vagaro, Fresha, Mindbody, OpenTable, Resy
- **Messaging:** SMS (Twilio), Instagram DM, Facebook Messenger
- **Reviews:** Google Business Profile, Yelp
- **Manual fallback:** CSV upload of customer names + phone numbers for businesses with no booking software

---

## Success Metrics (Framed for Real Business Owners)

Skip the enterprise KPIs. Beckon measures things owners actually care about:

- **Slots filled per month** that would have otherwise been empty
- **New customers acquired** vs. prior month
- **Lapsed customers recovered** — how many "lost" regulars came back
- **Review count growth** on Google/Yelp
- **Referrals generated** — new customers who came from an existing customer

---

## Competitive Landscape

| Competitor | Why It Falls Short for Local Businesses |
|---|---|
| Groupon / LivingSocial | Attracts deal-hunters, destroys brand, takes 50% cut |
| Mailchimp / Klaviyo | Built for e-commerce, requires marketing knowledge, too complex |
| Generic loyalty punch cards | No intelligence, no personalization, easily forgotten |
| Podium / Birdeye | Primarily review management, not offer personalization |
| Instagram ads | Expensive, requires creative skills, no personalization |

**Beckon's edge:** It's the only tool that combines offer personalization + timing intelligence + local service business simplicity in one product. It works on top of the booking and communication tools they already use.

---

## Open Questions / Areas to Explore

1. **No-show problem:** Can Beckon help reduce no-shows with smart reminder + re-commitment nudges?
2. **Multi-location:** How does the product scale when a salon owner opens a second location?
3. **Seasonal businesses:** How does Beckon handle businesses that are intentionally closed for months (e.g., a beach town café)?
4. **Language / accessibility:** Many local business owners are non-native English speakers. Should the product offer multilingual SMS templates out of the box?
5. **Cash-only businesses:** Some local businesses don't track customers digitally at all. What's the minimum viable onboarding for a business with just a list of phone numbers?

---

## Instructions for Claude

When working on this project:

- The user is a **local business owner**, not a marketer or developer — write for them at all times
- Prioritize **mobile-first** thinking — the owner manages everything from their phone between clients
- Avoid all e-commerce language: no "conversion rate," no "revenue per visitor," no "AOV" — say "bookings," "clients," "appointments," "tables"
- When designing features, ask: *"Could a hair stylist set this up during a 20-minute lunch break?"*
- The business owner's **time** is the scarcest resource — never design a feature that requires ongoing manual effort
- Frame offers as **personal and human**, not automated and algorithmic — the magic is that it feels like the owner remembered to reach out, not that a bot did
- Keep the tone warm, local, and community-oriented — Beckon should feel like it belongs in a small town, not a Silicon Valley pitch deck
- Business goal priority order: (1) fill empty time slots, (2) get new local customers, (3) keep existing customers coming back
