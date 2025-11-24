# GitHub Copilot Instructions for HVAC Flow Pro

## Project Overview

HVAC Flow Pro is an AI-orchestrated SaaS application for HVAC contractors with a founding members program. The application helps contractors manage jobs, quotes, scheduling, and customer interactions.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode enabled)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS 4
- **Payment Processing**: Stripe
- **Email**: Resend
- **AI Integration**: OpenAI, Grok API, LangChain

## Project Structure

```
/app                    - Next.js app router pages and API routes
  /api                  - API endpoints
  /auth                 - Authentication pages
  /dashboard            - Dashboard pages
  /login                - Login page
/components             - React components
  /ui                   - UI components
/lib                    - Utility functions and shared logic
  /supabase             - Supabase client configurations
  agent.ts              - AI agent utilities
  grok.ts               - Grok API integration
/prisma                 - Prisma schema and migrations
```

## Code Style & Conventions

### TypeScript

- Use strict TypeScript mode (no `allowJs`)
- Prefer explicit types over inference for function parameters and return values
- Use interfaces for object shapes
- Target ES2022

### React & Next.js

- Use React Server Components by default
- Use `"use client"` directive only when necessary (client interactivity, hooks)
- Prefer functional components with hooks
- Use Next.js App Router conventions (not Pages Router)
- Export metadata from page components for SEO

### Styling

- Use Tailwind CSS utility classes
- Primary color: `#0ea5a4` (accessible via `text-primary`, `bg-primary`)
- Accent color: `#111827` (accessible via `text-accent`, `bg-accent`)
- Follow utility-first approach; avoid custom CSS unless absolutely necessary

### Database & Prisma

- All models use `cuid()` for IDs
- Use Prisma Client for database queries
- Run `prisma generate` before building
- Database migrations: `pnpm prisma:migrate`
- Models: User, FoundingMember, Job, Tech, AuditLog

### File Naming

- React components: PascalCase (e.g., `FoundingMemberCounter.tsx`)
- Utility files: camelCase (e.g., `agent.ts`, `grok.ts`)
- Config files: lowercase with hyphens or dots (e.g., `next.config.mjs`, `tailwind.config.ts`)

## Build & Development

### Commands

```bash
pnpm dev              # Start development server
pnpm build            # Build for production (includes prisma generate)
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm prisma:generate  # Generate Prisma Client
pnpm prisma:migrate   # Run database migrations
```

### Environment Variables

Required environment variables (see `.env.example`):

- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `RESEND_API_KEY` - Resend API key
- `OPENAI_API_KEY` - OpenAI API key
- `GROK_API_URL` - Grok API endpoint
- `COOKIE_SECRET` - Secret for cookie encryption

## Best Practices

### Security

- Never commit API keys or secrets
- Use environment variables for all sensitive configuration
- Validate and sanitize user inputs
- Use Supabase RLS (Row Level Security) policies when appropriate

### Error Handling

- Use try-catch blocks for async operations
- Log errors appropriately (consider audit log for important actions)
- Provide meaningful error messages to users

### API Routes

- Place API routes in `/app/api`
- Use proper HTTP methods (GET, POST, PUT, DELETE)
- Return consistent JSON responses
- Handle errors with appropriate status codes

### Database Queries

- Use Prisma Client type-safe queries
- Implement proper error handling for database operations
- Use transactions for multi-step operations
- Log important database actions to AuditLog model

### Components

- Keep components focused and single-purpose
- Use TypeScript props interfaces
- Implement loading and error states
- Prefer server components unless client interactivity is needed

## AI Features

- The app uses OpenAI and Grok for AI-powered features
- Quote generation uses AI diagnostics
- Audit logs track AI-related actions

## Dependencies Management

- Primary package manager: `pnpm`
- Node.js version: >= 20.0.0
- Keep dependencies up to date but test thoroughly before upgrading major versions
- Prisma and @prisma/client versions must match

## Testing

- Follow existing patterns when adding tests
- Test both success and error cases
- Mock external API calls in tests

## Additional Notes

- The app features a founding members program with limited slots (50 total)
- Stripe integration for payment processing
- Supabase handles authentication and real-time features
- All timestamps use DateTime with default now()
