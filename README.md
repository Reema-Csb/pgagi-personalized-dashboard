# PGAGI Personalized Content Dashboard

A responsive personalized content dashboard built with Next.js, React, TypeScript, Redux Toolkit, RTK Query, Tailwind CSS, and Framer Motion.

The application combines content from multiple sources into a unified feed and allows users to personalize their experience through categories, favorites, search, drag-and-drop ordering, and theme preferences.

## Features

### Personalized Feed

- Technology
- Sports
- Finance
- Entertainment
- User-selected categories are persisted locally
- Unified content cards from multiple sources

### Content Sources

- NewsAPI for news content
- TMDB for recommendations
- Mock social content API
- Server-side Next.js API routes protect external API credentials

### Feed Interactions

- Load More pagination
- Exactly six additional cards per pagination action
- Drag-and-drop card reordering
- Favorite/unfavorite content
- Persistent favorites
- Responsive content grid
- Loading and empty states
- Error handling

### Search

- Search across content
- Debounced search input
- Dedicated search results page
- Search loading and empty states

### Dashboard Pages

- Personalized dashboard
- Trending
- Favorites
- Settings
- Search

### Settings

- Technology preference
- Sports preference
- Finance preference
- Entertainment preference
- Light mode
- Dark mode
- Preferences persisted using localStorage

### UI / UX

- Responsive layout
- Sidebar navigation
- Mobile navigation
- Sticky header
- Dark mode
- Accessible buttons and labels
- Keyboard focus states
- Framer Motion animations
- Responsive content cards

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Redux Toolkit
- RTK Query
- Framer Motion
- Lucide React
- Vitest
- React Testing Library
- Playwright

## Project Structure

```text
src/
├── app/
│   ├── api/
│   │   ├── news/
│   │   ├── recommendations/
│   │   ├── search/
│   │   └── social/
│   ├── favorites/
│   ├── search/
│   ├── settings/
│   ├── trending/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── dashboard/
│   ├── layout/
│   ├── settings/
│   └── ui/
│
├── data/
│   └── mockContent.ts
│
├── lib/
│
├── store/
│   ├── api/
│   └── slices/
│
├── test/
│
└── types/
```
