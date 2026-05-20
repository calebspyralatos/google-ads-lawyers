# CLAUDE.md 

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with:
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI + Tailwind)
- **Routing**: React Router v6
- **Data Fetching**: TanStack React Query v5
- **Forms**: React Hook Form with Zod validation
- **Hosted on**: Lovable platform

The site showcases a professional portfolio with testimonials, project showcases, and a contact form.

## Development Commands

```bash
# Start development server (runs on http://localhost:8080)
npm run dev

# Build for production
npm build

# Build for development mode (with Lovable component tagger)
npm run build:dev

# Run ESLint
npm run lint

# Preview production build locally
npm run preview

# Install dependencies
npm i
```

## Code Architecture

### Directory Structure

- **src/pages/**: Page components (Index.tsx is the main landing page, NotFound.tsx is 404)
- **src/components/ui/**: shadcn/ui component library (pre-built, Radix UI primitives wrapped with Tailwind)
- **src/lib/**: Utility functions (cn() for class merging)
- **src/hooks/**: Custom React hooks (use-toast, use-mobile for responsive design)
- **src/assets/**: Static images and media files

### Key Components & Patterns

- **App.tsx**: Root component that sets up routing, React Query, tooltips, and notification toasters
- **Index.tsx**: Main landing page with hero section, testimonial carousel, projects, and contact form
- **Routing**: Uses React Router with a catch-all "*" route for NotFound. Add new routes in App.tsx Routes component before the "*" route
- **Tailwind + shadcn**: All UI components use Tailwind classes and Radix UI for accessibility
- **Animations**: Custom Tailwind keyframes configured in tailwind.config.ts (fade-in, scale-in, glow-pulse, scroll-right, accordion animations)

### Form Handling

- Uses React Hook Form with Zod schema validation
- Forms should use the shadcn/ui form wrapper which integrates with React Hook Form
- Contact form is in Index.tsx

### State Management

- **Global state**: React Query for server state (configured in App.tsx)
- **UI state**: useState for local component state
- **Tooltips**: TooltipProvider wraps app for tooltip functionality
- **Notifications**: Sonner toast notifications (imported in App.tsx)

### Theme & Colors

- Tailwind darkMode uses "class" strategy
- Custom color variables defined in tailwind.config.ts and applied via CSS variables in index.css
- Custom colors: cta (call-to-action), sidebar variants, plus standard material colors
- Custom CSS variables available: --primary, --secondary, --accent, --destructive, --muted, --cta, --sidebar-*, etc.

## TypeScript Configuration

- Relaxed: noImplicitAny is disabled, strictNullChecks is disabled
- Path alias: `@/*` maps to `src/*`

## ESLint Rules

- React Hooks rules enabled
- React Refresh component export rules enabled (warns if non-component files use default export)
- Unused vars and params are allowed (`@typescript-eslint/no-unused-vars` is off)

## Build & Deployment

- Vite with React SWC compiler for fast builds
- Lovable integration: componentTagger plugin used in development mode
- Deploy via Lovable platform's Share > Publish
- Custom domains can be connected via Project > Settings > Domains

## Important Notes

- This project is generated/managed by Lovable - changes via the Lovable UI are auto-committed
- The codebase uses loose TypeScript for rapid development
- All shadcn/ui components in src/components/ui/ are library code - extend functionality in new components, don't modify the library
- When adding new routes, always add them to App.tsx before the catch-all route
