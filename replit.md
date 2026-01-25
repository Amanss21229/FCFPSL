# Sansa Learn - Free Concept Foundation Program

## Overview

This is a dedicated website for the "Free Concept Foundation Program" run by SANSA LEARN, an offline coaching center in Patna, India. The application serves as a registration and information portal for a 15-day free academic program targeting students from Class 5th to 12th, covering Mathematics, Science, and English Grammar.

The platform includes:
- Public-facing landing page with program information
- Student registration system with photo upload
- Admin dashboard for managing registrations
- PDF generation for registration confirmations and class routines
- Excel export functionality for registration data
- Bilingual support (English/Hindi)
- Dark/Light theme toggle

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for smooth transitions
- **Form Handling**: React Hook Form with Zod validation
- **PDF Generation**: jsPDF with jspdf-autotable for tables
- **Excel Export**: xlsx library

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript compiled with tsx
- **API Pattern**: RESTful endpoints defined in shared routes file
- **Session Management**: express-session with MemoryStore (development) or connect-pg-simple (production)
- **Build System**: Vite for frontend, esbuild for server bundling

### Data Storage
- **Database**: PostgreSQL via Drizzle ORM
- **Schema Location**: `shared/schema.ts` - single source of truth
- **Migrations**: Drizzle Kit with `db:push` command
- **Schema Validation**: drizzle-zod for automatic Zod schema generation

### Authentication
- Simple password-based admin authentication
- Session-based auth stored server-side
- Default admin password configurable via `ADMIN_PASSWORD` environment variable
- Protected routes for admin dashboard and registration management

### Key Design Decisions

1. **Shared Schema Pattern**: Database schema and validation types are defined in `shared/` directory, allowing both frontend and backend to import the same types and validation schemas.

2. **Monorepo Structure**: Client code in `client/`, server code in `server/`, shared types in `shared/`. Single TypeScript config covers all.

3. **Component Library**: Uses shadcn/ui (New York style) with custom "brutal" styling theme featuring black and golden color scheme.

4. **Internationalization**: Custom context-based i18n supporting English and Hindi translations.

5. **Theme System**: CSS custom properties with dark mode support via Tailwind's class-based dark mode.

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries and schema management

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Secret for session encryption (optional, has default)
- `ADMIN_PASSWORD`: Admin login password (optional, defaults to "admin123")

### Third-Party Libraries
- **Radix UI**: Accessible component primitives (dialogs, dropdowns, forms)
- **Lucide React**: Icon library
- **date-fns**: Date formatting utilities
- **Zod**: Runtime type validation

### Replit-Specific Integrations
- `@replit/vite-plugin-runtime-error-modal`: Error overlay in development
- `@replit/vite-plugin-cartographer`: Development tooling
- `@replit/vite-plugin-dev-banner`: Development banner