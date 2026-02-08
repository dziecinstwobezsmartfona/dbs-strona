# Dzieciństwo Bez Smartfona (DBS)

A movement uniting families committed to protecting childhood from smartphones and social media. This is the official website for the DBS initiative, built with modern web technologies.

## Project Overview

**Dzieciństwo Bez Smartfona** is a community-driven movement where families collectively commit to:
- Not giving children smartphones before age 14
- Limiting access to social media before age 16
- Building stronger communities of like-minded parents
- Reclaiming childhood from algorithms and screen time

This website serves as the central hub for the movement, providing information about the initiative, allowing parents to sign the Parents' Pact, and connecting families through community channels.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org) (strict mode)
- **Styling**: [TailwindCSS 4](https://tailwindcss.com) + custom CSS variables
- **Forms**: [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) validation
- **Database**: [MongoDB](https://www.mongodb.com) with [Mongoose](https://mongoosejs.com)
- **UI Components**: Custom React components + [Embla Carousel](https://www.embla-carousel.com)

## Project Structure

```
app/                          # Next.js App Router pages and API routes
  ├── page.tsx               # Home page
  ├── layout.tsx             # Global layout with Header and Footer
  ├── globals.css            # Global styles and CSS variables
  ├── api/
  │   └── pakty/
  │       └── route.ts       # API endpoint for pact submissions
  └── [route]/page.tsx       # Various content pages
components/                   # Reusable React components
  ├── Header.tsx             # Navigation header with menus
  ├── Footer.tsx             # Footer component
  ├── PactForm.tsx           # Form for signing the Parents' Pact
  ├── ImpactCard.tsx         # Card component for impact display
  └── Tag.tsx                # Tag/badge component
lib/                          # Utility functions and database models
  ├── mongodb.ts             # MongoDB connection
  └── models/
      └── Pact.ts            # Mongoose schema for pact signatures
public/                       # Static assets
  ├── images/                # Images and icons
  ├── videos/                # Background videos
  └── data/
      └── lista_szkol.json   # School list data
```

## Key Pages

- **Home** (`/`) - Main landing page with call-to-action
- **Our Mission** (`/nasza-misja`) - Project mission and vision
- **Our Impact** (`/nasz-wplyw`) - Statistics and community impact
- **Situation** (`/sytuacja`) - The problem: childhood and screens
- **Solution** (`/rozwiazanie`) - DBS approach and benefits
- **What Can I Do?** (`/co-moge-zrobic`) - Action items for parents
- **Sign the Pact** (`/pakt-rodzicow`) - Interactive form to sign the Parents' Pact
- **Thank You** (`/podpisz-pakt-dziekujemy`) - Confirmation page after signing
- **Privacy Policy** (`/polityka-prywatnosci`) - Legal documentation
- **Newsletter Terms** (`/regulamin-newslettera`) - Newsletter terms of service
- **Code of Conduct** (`/kodeks-postepowania`) - Community guidelines

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd strona-DBS
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with your MongoDB connection string:
```
MONGODB_URI=<your-mongodb-uri>
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

The app will hot-reload as you edit files.

### Building for Production

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

### Linting

Run ESLint to check for code quality issues:

```bash
npm run lint
```

## Design & Styling

- **CSS Variables**: Custom color and font variables defined in `app/globals.css`
  - `--background`, `--foreground`, `--main-accent`, `--secondary-accent`
  - `--font-montserrat`, `--font-anton`, `--font-victor`
- **Fonts**: 
  - [Montserrat](https://fonts.google.com/specimen/Montserrat) - Body text
  - [Anton](https://fonts.google.com/specimen/Anton) - Title styling (`font-title`)
  - [Victor Mono](https://fonts.google.com/specimen/Victor+Mono) - Mono text
- **TailwindCSS**: Utility-first CSS with custom theme integration

## Navigation & Routing

The Header component builds navigation menus with automatic slug generation from Polish characters. When adding new pages:

1. Create page file: `app/<slug>/page.tsx`
2. Update menus in `components/Header.tsx`
3. Ensure slug matches the `slugify()` helper output

## Database

The project uses MongoDB with Mongoose for storing pact signatures. The Pact model stores:
- Parent name and contact information
- Children information
- Signature timestamp
- Newsletter subscription preference

## Community

- **WhatsApp Community**: Join the official DBS WhatsApp group for support and discussion
- **Local Schools**: The site tracks participating schools to show community reach

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com) (recommended) or any Node.js hosting platform supporting Next.js.

### Environment Variables Required

- `MONGODB_URI` - MongoDB connection string (for production)

## Contributing

We welcome contributions! Please ensure:
- Code follows the existing patterns and conventions
- TypeScript strict mode compliance
- ESLint passes (`npm run lint`)
- Components use the project's CSS variable system

## License

This project is part of the Dzieciństwo Bez Smartfona movement. For licensing questions, contact the project maintainers.

## More Information

- 📖 [Next.js Documentation](https://nextjs.org/docs)
- 🎨 [TailwindCSS Documentation](https://tailwindcss.com/docs)
- 📝 [TypeScript Handbook](https://www.typescriptlang.org/docs/)
