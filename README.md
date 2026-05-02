# Beckon

**AI-powered personalized offers for local service businesses.**

Beckon helps local businesses fill empty time slots by automatically sending the right offer to the right customer at the right moment — without Groupon, without blasting discounts to everyone, and without any ongoing manual effort.

> *"Not everyone needs a discount. Giving one to someone who would have booked anyway is wasted margin. Giving one to someone on the fence is what makes the difference."*

---

## What It Does

| Feature | Description |
|---|---|
| **Slow Day Intelligence** | Detects historically slow slots and sends personalized offers to lapsed customers before the slot goes empty |
| **First Visit Offer** | Converts new leads with a one-time welcome offer — controlled by the business, not a Groupon deal |
| **Lapsed Win-Back** | Automatically flags customers who haven't returned and reaches out before they're gone for good |
| **Offer Generation** | Mocks AI-generated personalized SMS messages with discount codes tailored to each customer's visit history |
| **Offer History** | Tracks every offer from draft → sent → redeemed, closing the loop on what actually worked |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Database | PostgreSQL via [Neon](https://neon.tech) (serverless) |
| ORM | Prisma |
| Auth | NextAuth.js v4 (credentials provider) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Toasts | Sonner |
| Deployment | Vercel |

No TypeScript. No Twilio. No OpenAI API key required. SMS generation is mocked with realistic templates and a simulated delay.

---

## Getting Started

### Prerequisites

- Node.js 18+
- A free [Neon](https://neon.tech) PostgreSQL database

### 1. Clone and install

```bash
git clone <your-repo-url>
cd beckon
npm install
```

### 2. Set up environment variables

Copy the example and fill in your values:

```bash
cp .env.example .env
```

```env
# Neon PostgreSQL — get both strings from your Neon dashboard
DATABASE_URL="postgresql://USER:PASS@HOST/DBNAME?sslmode=require"
DIRECT_URL="postgresql://USER:PASS@HOST/DBNAME?sslmode=require"

# NextAuth
NEXTAUTH_SECRET="any_random_string_here"
NEXTAUTH_URL="http://localhost:3000"

# Demo account credentials
DEMO_EMAIL="demo@beckon.app"
DEMO_PASSWORD="beckon2024"

NEXT_PUBLIC_APP_NAME="Beckon"
```

> **Neon tip:** From your Neon dashboard, use the **pooled** connection string for `DATABASE_URL` and the **direct** connection string for `DIRECT_URL`. Prisma requires the direct URL for migrations on serverless.

### 3. Push schema and seed the database

```bash
npx prisma db push
npx prisma db seed
```

The seed creates a fully loaded demo state:
- 1 business: *Glow & Go Salon* (owner: Sarah)
- 8 customers with a realistic mix of regulars, lapsed clients, and new leads
- 4 time slots (2 open, 1 filled, 1 historical)
- 5 offers (2 sent, 1 redeemed, 2 draft)

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Sign in at `/login` with:

```
Email:    demo@beckon.app
Password: beckon2024
```

---

## Project Structure

```
/app
  /page.js                         # Landing page (marketing)
  /login/page.js                   # Auth page
  /dashboard/page.js               # Main dashboard
  /customers/page.js               # Customer list with search + add
  /slots/page.js                   # Slow slot manager
  /offers/page.js                  # Offer history with filter tabs
  /offers/generate/page.js         # Hero screen — AI offer generator
  /api/auth/[...nextauth]/route.js # NextAuth credentials handler
  /api/customers/route.js
  /api/slots/route.js
  /api/offers/route.js             # GET (filter) + PATCH (mark redeemed)
  /api/offers/generate/route.js    # POST — runs mock AI generation
  /api/offers/send/route.js        # POST — marks offer as sent

/lib
  /prisma.js                       # Singleton Prisma client
  /mockOffers.js                   # Mock SMS generation (10 templates, 1.2s delay)

/components
  /Nav.js                          # Sidebar (desktop) + bottom nav (mobile)
  /StatCard.js                     # Dashboard stat card
  /CustomerTable.js                # Searchable customer table with status badges
  /SlotList.js                     # Slot cards with expand/collapse offers
  /OfferCard.js                    # Offer card with state machine (generating → sent)
  /SessionProvider.js              # Client-side NextAuth session wrapper

/prisma
  /schema.prisma                   # Business → Customer, Slot, Offer models
  /seed.js                         # Demo data seeder
```

---

## Key Design Decisions

**Mock AI, real UX.** The offer generator uses pre-written SMS templates with `[NAME]`, `[BUSINESS]`, `[DAY]`, `[DISCOUNT]` placeholders, a 1.2-second artificial delay per card, and discount logic based on visit recency. To a demo observer, it looks and feels like live AI generation.

**Discount depth is intelligent.** New leads get 10%. Customers lapsed 30 days get 15%. Lapsed 60 days get 20%. Lapsed 90+ days get 25%. Loyal, frequent customers who would book anyway get no offer at all — because wasting margin on them is the whole problem Beckon solves.

**Seed data uses relative dates.** The seed script computes "next Tuesday," "next Wednesday," etc. at runtime, so the demo always shows upcoming slots rather than past dates — regardless of when someone views it.

**Server Components for reads, API routes for mutations.** The dashboard calls Prisma directly on the server. Client-side buttons (`Send`, `Add Customer`, `Mark Redeemed`) use API routes. No Redux, no complex state management.

---

## Deployment

### Vercel (recommended)

1. Push this repo to GitHub
2. Import it at [vercel.com/new](https://vercel.com/new)
3. Add all environment variables from `.env` in the Vercel dashboard
4. Deploy

After the first deployment, seed the production database once:

```bash
DATABASE_URL="your_neon_prod_url" DIRECT_URL="your_neon_direct_url" npx prisma db seed
```

### Environment variables for Vercel

| Variable | Value |
|---|---|
| `DATABASE_URL` | Neon pooled connection string |
| `DIRECT_URL` | Neon direct connection string |
| `NEXTAUTH_SECRET` | Any random string (generate with `openssl rand -base64 32`) |
| `NEXTAUTH_URL` | Your Vercel domain (e.g. `https://beckon.vercel.app`) |
| `DEMO_EMAIL` | `demo@beckon.app` |
| `DEMO_PASSWORD` | `beckon2024` |
| `NEXT_PUBLIC_APP_NAME` | `Beckon` |

---

## Database Schema

```prisma
model Business {
  id        String     @id @default(cuid())
  name      String
  ownerName String
  type      String
  customers Customer[]
  slots     Slot[]
}

model Customer {
  id            String    @id @default(cuid())
  businessId    String
  name          String
  phone         String
  lastVisitDate DateTime?
  visitCount    Int       @default(0)
  isNewLead     Boolean   @default(false)
  offers        Offer[]
}

model Slot {
  id         String   @id @default(cuid())
  businessId String
  date       DateTime
  label      String
  isFilled   Boolean  @default(false)
  offers     Offer[]
}

model Offer {
  id           String    @id @default(cuid())
  customerId   String
  slotId       String
  message      String
  discountCode String
  status       String    @default("draft") # draft | sent | redeemed
  sentAt       DateTime?
}
```

---

## Target Businesses

Beckon is purpose-built for local service businesses with appointment-based or walk-in models:

- Hair salons & barbershops
- Nail studios
- Massage & spa
- Restaurants & cafés
- Tattoo shops
- Personal trainers & fitness studios
- Dog groomers

---

## Pricing Model

| Plan | Price | For |
|---|---|---|
| Starter | $19/mo | Solo operator, under 100 customers |
| Growth | $49/mo | Small team, 100–500 customers |
| Full House | $89/mo | Multi-location, 500+ customers |

Flat monthly fee — no percentage of revenue, no per-message fees. Local business owners live on unpredictable margins. A flat fee feels like hiring a part-time marketing assistant, not a tax on success.

---

## What Beckon Is Not

- Not a booking system (integrates with Square, Vagaro, Fresha, etc.)
- Not a POS
- Not a social media scheduler
- Not Groupon — Beckon never exposes your business to deal-hunting strangers

---

Built for local businesses, by people who care about them.
