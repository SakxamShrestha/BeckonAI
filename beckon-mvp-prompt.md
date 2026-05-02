You are building **Beckon** — a pitch competition demo app for a product that helps local service businesses (salons, barbershops, restaurants, nail studios) automatically send personalized offers to customers to fill empty time slots and attract new clients.

Read `CLAUDE.md` in this project for full context before writing a single line of code.

---

## Context: This Is a Pitch Demo

This app will be deployed on a live domain and shown to competition judges. That means:

- **No real services need to work** — SMS sends are simulated, AI generation uses pre-written realistic mock responses
- **Everything must look and feel real** — realistic names, realistic messages, realistic numbers on the dashboard
- **The UI is the product** — judges will click around, so every screen needs to be polished, descriptive, and self-explanatory
- **The value proposition must be obvious in 10 seconds** — someone landing on the dashboard should immediately understand what Beckon does and why it matters

---

## Tech Stack (Deployment-Ready)

- **Framework:** Next.js 14 (App Router)
- **Database:** PostgreSQL via Neon (https://neon.tech — free tier, serverless, works perfectly on Vercel)
- **ORM:** Prisma
- **Auth:** NextAuth.js with credentials provider (single demo account)
- **Styling:** Tailwind CSS + shadcn/ui (polished components fast)
- **Deployment:** Vercel (connect GitHub repo, one-click deploy)
- **No TypeScript** — plain JavaScript for speed
- **SMS:** Fully mocked — no Twilio needed
- **AI offer generation:** Mocked with pre-written realistic SMS templates — no API key needed

---

## Deployment Setup (Do This First)

### Neon (Database)
1. Create a free project at neon.tech
2. Copy the connection string into DATABASE_URL env var
3. Also add DIRECT_URL for Prisma migrations on serverless

### Vercel
1. Push repo to GitHub
2. Import to Vercel, set env vars
3. Every git push auto-deploys

### prisma/schema.prisma must include:
```
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

---

## Database Schema

```prisma
model Business {
  id        String     @id @default(cuid())
  name      String
  ownerName String
  type      String
  createdAt DateTime   @default(now())
  customers Customer[]
  slots     Slot[]
}

model Customer {
  id            String    @id @default(cuid())
  businessId    String
  business      Business  @relation(fields: [businessId], references: [id])
  name          String
  phone         String
  lastVisitDate DateTime?
  visitCount    Int       @default(0)
  isNewLead     Boolean   @default(false)
  offers        Offer[]
  createdAt     DateTime  @default(now())
}

model Slot {
  id         String   @id @default(cuid())
  businessId String
  business   Business @relation(fields: [businessId], references: [id])
  date       DateTime
  label      String
  isFilled   Boolean  @default(false)
  offers     Offer[]
  createdAt  DateTime @default(now())
}

model Offer {
  id           String    @id @default(cuid())
  customerId   String
  customer     Customer  @relation(fields: [customerId], references: [id])
  slotId       String
  slot         Slot      @relation(fields: [slotId], references: [id])
  message      String
  discountCode String
  status       String    @default("draft")
  createdAt    DateTime  @default(now())
  sentAt       DateTime?
}
```

---

## Seed Data (Critical for Demo)

prisma/seed.js must create a fully loaded, realistic demo state so judges land on a live-looking dashboard.

**Business:** "Glow & Go Salon", owner "Sarah", type "Hair Salon"

**Customers (8 total):**
- Mix of regulars (high visit count, recent last visit) and lapsed (45-90 days since last visit)
- 2 marked as new leads (isNewLead: true, no prior visit)
- Realistic names and US phone numbers (555-xxx-xxxx format)

**Slots (4 total):**
- 2 upcoming slow slots (this coming Tuesday 2pm, Wednesday 11am)
- 1 slot marked as filled (to show the system working)
- 1 slot from last week (historical)

**Offers (5 total):**
- 2 with status "sent"
- 1 with status "redeemed" (shows the loop closing — most impressive for judges)
- 2 with status "draft" (ready to interact with)

---

## Mock SMS Generation

Do NOT call any external API. Create lib/mockOffers.js with a generateOffer(customer, slot, business) function that:

1. Picks from a bank of 10 pre-written SMS templates
2. Fills in [NAME], [BUSINESS], [DAY], [DISCOUNT] placeholders
3. Generates a random 6-character discount code (e.g., GLOW15)
4. Returns after a fake 1.2 second delay to simulate AI thinking:
   await new Promise(r => setTimeout(r, 1200))

Example templates:
- "Hey [NAME]! It's Sarah from [BUSINESS]. We have a rare opening [DAY] — want to grab it? I'd love to do something special: [DISCOUNT] off. Just reply YES 💇"
- "Hi [NAME], haven't seen you in a while and we miss you! Got a spot open [DAY] with [DISCOUNT] off if you'd like to come in. — [BUSINESS] 🌟"
- "[NAME]! We just had a cancellation [DAY]. First to reply gets [DISCOUNT] off. Hope to see you soon! — [BUSINESS]"
- "Hey [NAME]! Saving you a spot [DAY] with [DISCOUNT] off — just for our regulars. Let us know! — [BUSINESS] ✂️"

The fake delay + realistic copy makes it feel like live AI generation to any observer.

---

## Mock SMS Send

When "Send" is clicked:
1. Show a sending spinner for 800ms
2. Update offer status to "sent" and set sentAt in the DB
3. Show a success toast: "✓ Message sent to [NAME]"
4. No Twilio. No real SMS. Just the UI state change.

---

## Pages to Build (In This Order)

### 1. `/` — Landing Page (Build This First, Most Important for Pitch)

A clean, modern marketing page explaining Beckon. Must include:

- **Hero:** Bold headline ("Fill Your Empty Chairs. Automatically."), 1-line subheadline, CTA button ("See the Demo →") linking to /dashboard
- **Problem section:** 3 cards — Groupon destroys your brand, blanket discounts train customers to wait for sales, empty slow-day slots are revenue lost forever
- **How It Works:** 3-step visual — (1) Add your customers, (2) Mark your slow slots, (3) Beckon sends the right offer to the right person automatically
- **Results:** Plausible stats — "Avg. 2.3 empty slots filled per week", "68% of lapsed customers return after a personalized message", "Setup in under 15 minutes"
- **Business types row:** Hair Salon · Barbershop · Restaurant · Nail Studio · Massage Spa · Café · Tattoo Shop
- **Footer:** "Beckon — Built for local businesses, by people who care about them."

### 2. `/dashboard` — Home
- Welcome bar: "Good morning, Sarah 👋 You have 2 slow slots coming up this week."
- 4 stat cards: Total Customers, Slots This Week, Offers Sent, Slots Filled
- "Slow Slots This Week" list with a "Generate Offers" button per slot
- "Recent Offer Activity" feed with status badges and timestamps
- Nav linking to all pages

### 3. `/customers` — Customer List
- Table: Name, Phone, Last Visit, Total Visits, Status badge (Regular / Lapsed / New Lead), Actions
- Color-coded badges: green = regular, amber = lapsed, blue = new lead
- "Add Customer" inline form
- Search bar

### 4. `/slots` — Slow Slot Manager
- List of upcoming slots with status badge: Open (red) / Filled (green)
- "Add Slow Slot" form: date, time, optional label
- Click a slot to see which offers were sent for it

### 5. `/offers/generate` — Offer Generator (The Hero Screen)
- Pick a slow slot from a dropdown
- Show eligible customers (lapsed 30+ days or new leads)
- "Generate Offers" button — triggers mock AI with per-card loading animation
- Each card: customer name, last visit, editable generated SMS, discount code, "Send" button
- After send: card turns green with "✓ Sent" badge

### 6. `/offers` — Offer History
- Full list: customer name, slot, message preview, status badge, sent date
- Filter tabs: All / Draft / Sent / Redeemed
- "Mark as Redeemed" button on sent offers

### 7. `/login` — Auth
- Centered login form
- Demo credentials shown on the page: demo@beckon.app / beckon2024
- Redirect to /dashboard on login

---

## UI/UX Rules

- **Mobile-first** — every page must work on 390px viewport
- **shadcn/ui throughout** — Card, Badge, Button, Table, Toast, Skeleton for loading states
- **Color system:** Primary #4F46E5 (indigo), success #16A34A (green), warning #D97706 (amber)
- **Skeletons on all data pages** — no blank white screens while loading
- **Empty states** — every list needs a friendly empty state with emoji and CTA
- **Toasts for every action** — nothing happens silently

---

## Env Vars

```
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
NEXTAUTH_SECRET=any_random_string_here
NEXTAUTH_URL=https://yourdomain.com
DEMO_EMAIL=demo@beckon.app
DEMO_PASSWORD=beckon2024
NEXT_PUBLIC_APP_NAME=Beckon
```

---

## File Structure

```
/app
  /page.js                          ← Landing page
  /dashboard/page.js
  /customers/page.js
  /slots/page.js
  /offers/page.js
  /offers/generate/page.js
  /login/page.js
  /api/auth/[...nextauth]/route.js
  /api/customers/route.js
  /api/slots/route.js
  /api/offers/route.js
  /api/offers/generate/route.js
  /api/offers/send/route.js
/lib
  /mockOffers.js
  /prisma.js
/prisma
  /schema.prisma
  /seed.js
/components
  /ui/                              ← shadcn components
  /StatCard.js
  /CustomerTable.js
  /SlotList.js
  /OfferCard.js
  /Nav.js
```

---

## Build Order & Rules

1. **Schema + seed first** — DB must be working and seeded before any UI
2. **Landing page second** — judges see this first; must be polished
3. **Dashboard third** — needs seed data to look alive
4. **Remaining pages in order** — customers → slots → generate → history → login
5. **Commit after each page is working**
6. **No over-engineering** — no Redux, no complex state, use server actions or simple API routes
7. **Do not ask clarifying questions** — pick the simpler option and keep moving
