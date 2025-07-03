# TableCheck – Project Overview

_For the original assignment and requirements, see [PROJECT_DESCRIPTION.MD](./PROJECT_DESCRIPTION.MD)._

## Architecture

- **Server-Side Rendered (SSR-first):** All pages are rendered server-side, with lightweight enhancements using vanilla JavaScript.
- **Backend:** Node.js + Express, no frameworks.
- **Frontend:** Pure HTML, CSS, and JavaScript—no build tools, no TypeScript, no frameworks.
- **Database:** PostgreSQL.
- **Testing:** Automated end-to-end (E2E) tests using Playwright (see below).

> Note: In a production-grade system, I would recommend adding TypeScript, ESLint, a templating engine, and basic security middleware to improve maintainability, security, and developer experience.

## Why this approach?

To challenge myself, I deliberately avoided frameworks and build systems. The goal was to create a minimalist yet functional application using only the web platform's core building blocks—resulting in a transparent, easy-to-reason-about stack.

## Features

- Join waitlist via form
- Reservation status page with real-time polling
- Automatic check-in availability updates
- Countdown progress for seated guests
- Shareable reservation links (native browser share/copy)
- Browser notifications when your table is ready
- Mobile-friendly responsive layout

## Setup

**Start the app:**

```sh
docker-compose up -d
```

The app will be available at: http://localhost:3000

**Run E2E tests:**

```sh
docker-compose --profile e2e up e2e
```

This runs Playwright end-to-end tests inside a dedicated container.

## Folder Structure

```
TableCheck/
│
├── backend/         # Node.js + Express backend
│   ├── routes/
│   ├── services/
│   ├── repositories/
│   ├── utils/
│   ├── db.js
│   └── ...
│
├── frontend/        # Raw HTML, JS, CSS
│   ├── pages/
│   ├── main.css
│   └── ...
│
├── db/              # Database schema/init
│   └── init.sql
│
├── e2e/             # Playwright E2E tests
│   ├── waitlist.spec.js
│   ├── package.json
│   └── ...
│
├── docker-compose.yaml
├── Dockerfile
├── README.MD        # (This file)
└── README_PROJECT.md # Assignment & requirements
```

## Testing Philosophy

- **Unit Tests:** Not included—while some business logic exists in the backend, setting up unit testing tooling was out of scope for this challenge.
- **API / Integration Tests:** Not implemented—since the API primarily serves HTML, higher-level testing was prioritized.
- **End-to-End Tests:** Implemented using Playwright to cover the main user journey (join → wait → check-in → seated → finished).
- **Manual QA:** All key flows have been manually tested in the browser.

## Accessibility & Responsiveness

- Semantic HTML and ARIA live regions used for key status updates
- Mobile-friendly responsive layout
- Visual focus styles preserved for keyboard users

> Note: This is not a fully accessibility-audited project. Features like keyboard navigation, skip links, and full ARIA roles were considered but not fully implemented.

## Known Limitations

- No real-time WebSockets (polling used instead)
- No formal unit or integration test coverage
- No SEO optimization (not intended for public indexing)

## Closing Thoughts

This project aims to demonstrate clean design, accessibility awareness, and a complete end-to-end experience—all while sticking to the absolute essentials of web development.

For any questions, feel free to open an issue or reach out.
