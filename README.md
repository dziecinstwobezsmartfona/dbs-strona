# Dzieciństwo Bez Smartfona (DBS)

A movement uniting families committed to protecting childhood from smartphones and social media. This is the official website for the DBS initiative, built with modern web technologies.

## Project Overview

**Dzieciństwo Bez Smartfona** is a community-driven movement where families collectively commit to:
- Not giving children smartphones before age 14
- Limiting access to social media before age 16
- Building stronger communities of like-minded parents
- Reclaiming childhood from algorithms and screen time

This website serves as the central hub for the movement, providing information about the initiative, allowing parents to sign the Parents' Pact, and connecting families through community channels.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                           Next.js 16 App                            │
├─────────────────────────────────────────────────────────────────────┤
│  Route Groups                                                       │
│  ┌────────────────────────┐    ┌─────────────────────────────────┐  │
│  │      (app)             │    │         (payload)               │  │
│  │  Public Website        │    │  CMS Admin Panel                │  │
│  │  • Pages & Routes      │    │  • Content Management           │  │
│  │  • API Endpoints       │    │  • GraphQL API                  │  │
│  │  • Components          │    │  • Media Management             │  │
│  └────────────────────────┘    └─────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│                           Data Layer                                │
│  ┌────────────────────────┐    ┌─────────────────────────────────┐  │
│  │   MongoDB + Mongoose   │    │        Payload CMS              │  │
│  │   • Pact Signatures    │    │  • Articles Collection          │  │
│  │   • Direct Access      │    │  • Media Collection             │  │
│  └────────────────────────┘    │  • Users Collection             │  │
│                                └─────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│                        External Services                            │
│  • Brevo (Transactional Emails)    • UploadThing (Media Storage)    │
└─────────────────────────────────────────────────────────────────────┘
```

### Key Architectural Decisions

1. **Dual Data Access Pattern**: The project uses two complementary data access patterns:
   - **Payload CMS**: Manages editorial content (Articles, Media) with a full admin UI and GraphQL API
   - **Direct Mongoose**: Handles Pact signatures with custom API routes for full control over validation and business logic

2. **Route Groups**: Next.js route groups separate the public-facing website from the CMS admin:
   - `(app)`: Public website pages and API routes
   - `(payload)`: Payload CMS admin panel and its API endpoints

3. **Hybrid API Architecture**: Custom Next.js API routes handle Pact operations, while Payload provides its built-in REST and GraphQL APIs for content management

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org) (strict mode) |
| **CMS** | [Payload CMS 3.x](https://payloadcms.com) |
| **Database** | [MongoDB](https://www.mongodb.com) with [Mongoose](https://mongoosejs.com) |
| **Styling** | [TailwindCSS 4](https://tailwindcss.com) + CSS Variables |
| **Forms** | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) |
| **Media Storage** | [UploadThing](https://uploadthing.com) (via Payload plugin) |
| **Email Service** | [Brevo](https://brevo.com) API |
| **UI Components** | Custom React components + [Embla Carousel](https://www.embla-carousel.com) |

---

## Project Structure

```
├── app/                              # Next.js App Router
│   ├── (app)/                        # Public website route group
│   │   ├── layout.tsx               # Main layout (Header, Footer, fonts)
│   │   ├── page.tsx                 # Home page
│   │   ├── globals.css              # Global styles & CSS variables
│   │   ├── api/                     # Custom API routes
│   │   │   ├── pakty/               # POST: Save pact signatures
│   │   │   ├── pakty-count/         # GET: Count of signed pacts
│   │   │   ├── statystyki/          # GET: Statistics by voivodship
│   │   │   └── szkoly-count/        # GET: Count of participating schools
│   │   ├── nasza-misja/             # Our Mission page
│   │   ├── nasz-wplyw/              # Our Impact page
│   │   ├── sytucja/                 # Situation page
│   │   ├── rozwiazanie/             # Solution page
│   │   ├── co-moge-zrobic/          # What Can I Do page
│   │   ├── pakt-rodzicow/           # Parents' Pact info page
│   │   ├── pakt-rodzicow-wyniki/    # Pact results/statistics
│   │   ├── podpisz-pakt/            # Sign the Pact form
│   │   ├── podpisz-pakt-dziekujemy/ # Thank you page
│   │   ├── zasoby/                  # Resources page
│   │   ├── kodeks-postepowania/     # Code of Conduct
│   │   ├── polityka-prywatnosci/    # Privacy Policy
│   │   └── regulamin-newslettera/   # Newsletter Terms
│   │
│   └── (payload)/                    # Payload CMS route group
│       ├── layout.tsx               # Payload admin layout
│       ├── admin/                   # Admin panel routes
│       └── api/                     # Payload REST & GraphQL APIs
│           ├── [...slug]/           # REST API
│           ├── graphql/             # GraphQL endpoint
│           └── graphql-playground/  # GraphQL IDE
│
├── collections/                      # Payload CMS collections
│   ├── Articles.ts                  # Blog/articles content type
│   ├── Media.ts                     # Media library
│   └── Users.ts                     # Admin users
│
├── components/                       # Reusable React components
│   ├── Header.tsx                   # Navigation header with menus
│   ├── Footer.tsx                   # Site footer
│   ├── PactForm.tsx                 # Parents' Pact signature form
│   ├── PactCounter.tsx              # Live pact counter display
│   ├── PactStatsTable.tsx           # Statistics table component
│   ├── ArticleCard.tsx              # Article preview card
│   ├── ImpactCard.tsx               # Impact display card
│   └── Tag.tsx                      # Tag/badge component
│
├── lib/                              # Utilities and database
│   ├── mongodb.ts                   # MongoDB connection singleton
│   └── models/
│       └── Pact.ts                  # Mongoose schema for signatures
│
├── public/                           # Static assets
│   ├── images/                      # Optimized images
│   ├── videos/                      # Background videos
│   └── data/
│       └── lista_szkol.json         # Schools reference data
│
├── payload.config.ts                 # Payload CMS configuration
├── payload-types.ts                  # Auto-generated Payload types
└── next.config.ts                    # Next.js configuration
```

---

## Key Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with call-to-action |
| `/nasza-misja` | Project mission and vision |
| `/nasz-wplyw` | Statistics and community impact |
| `/sytuacja` | The problem: childhood and screens |
| `/rozwiazanie` | DBS approach and solutions |
| `/co-moge-zrobic` | Action items for parents |
| `/pakt-rodzicow` | Parents' Pact information |
| `/pakt-rodzicow-wyniki` | Live statistics by region |
| `/podpisz-pakt` | Interactive form to sign the Pact |
| `/podpisz-pakt-dziekujemy` | Post-signature confirmation |
| `/zasoby` | Resources and materials |
| `/admin` | Payload CMS admin panel |
| `/api/graphql` | GraphQL API endpoint |

---

## API Endpoints

### Custom API Routes (Pact Management)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/pakty` | POST | Submit new pact signature |
| `/api/pakty-count` | GET | Total count of signed pacts |
| `/api/szkoly-count` | GET | Count of participating schools |
| `/api/statystyki` | GET | Aggregated statistics by voivodship |

### Payload CMS APIs

Payload automatically provides:
- REST API at `/api/{collection}` (e.g., `/api/articles`)
- GraphQL API at `/api/graphql`
- GraphQL Playground at `/api/graphql-playground`

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB database (local or Atlas)
- UploadThing account (for media storage)
- Brevo account (for transactional emails)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dziecinstwobezsmartfona/dbs-strona.git
cd dbs-strona
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with:
```env
# Database
DATABASE_URL=mongodb://localhost:27017/dbs

# Payload CMS
PAYLOAD_SECRET=your-secret-key-min-32-chars

# UploadThing (Media Storage)
UPLOADTHING_TOKEN=your-uploadthing-token

# Brevo (Email Service)
BREVO_API_KEY=your-brevo-api-key
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site, or [http://localhost:3000/admin](http://localhost:3000/admin) for the Payload CMS admin panel.

### Building for Production

```bash
npm run build
npm run start
```

### Code Quality

```bash
npm run lint          # Run ESLint
```

---

## Design System

### CSS Variables

Custom properties defined in `app/(app)/globals.css`:

```css
/* Colors */
--background          /* Page background */
--foreground          /* Primary text color */
--main-accent         /* Primary brand color */
--secondary-accent    /* Secondary brand color */

/* Typography */
--font-montserrat     /* Body text (customizable via Tailwind) */
--font-anton          /* Display/titles (font-title class) */
--font-victor         /* Monospace text */
```

### Fonts

- **Montserrat** - Primary body font
- **Anton** - Display font for titles (applied via `font-title` class)
- **Victor Mono** - Monospace font

---

## Database Schemas

### Pact (Mongoose)

Stored directly in MongoDB for custom API access:

```typescript
{
  firstName: string,
  lastName: string,
  email: string,
  schoolId: string,
  schoolVoivodship: string,    // Polish "województwo"
  schoolDistrict: string,      // Polish "powiat"
  schoolCounty: string,        // Polish "gmina"
  schoolName: string,
  numberOfChildren: number,
  gdpr_consent: boolean,
  newsletter_consent: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Articles (Payload CMS)

```typescript
{
  visible: boolean,           // Publication status
  slug: string,               // URL-friendly identifier
  image: relationship,        // Media reference
  title: string,
  content: richText           // Lexical editor content
}
```

---

## Deployment

The project is optimized for deployment on [Vercel](https://vercel.com) or Netlify with Node.js runtime support.

### Required Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | MongoDB connection string |
| `PAYLOAD_SECRET` | Payload CMS encryption key (32+ chars) |
| `UPLOADTHING_TOKEN` | UploadThing API token |
| `BREVO_API_KEY` | Brevo email API key |

---

## Contributing

We welcome contributions! Please ensure:

- Code follows existing patterns and conventions
- TypeScript strict mode compliance
- ESLint passes (`npm run lint`)
- Components use the project's CSS variable system
- Polish language for user-facing content

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Payload CMS Documentation](https://payloadcms.com/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [MongoDB with Next.js](https://www.mongodb.com/developer/languages/javascript/nextjs-with-mongodb/)

---

## License

This project is part of the Dzieciństwo Bez Smartfona movement. For licensing questions, contact the project maintainers.