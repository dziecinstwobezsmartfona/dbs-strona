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

## License

This project is part of the Dzieciństwo Bez Smartfona movement. For licensing questions, contact the project maintainers.
