# The Keeper's Tide-Chart — Frontend

Personalized AI study planner MVP (frontend only, mock data).

## Setup

```bash
cd frontend
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Demo flow

1. **Home** — landing page with product overview
2. **Create Plan** — add subjects, topics, weak flags, deadlines, and daily hours (or click "Load demo data")
3. **Generate Plan** — navigates to the dashboard
4. **Dashboard** — view prioritized sessions, mark complete, adjust today's hours and regenerate

## Tech stack

- React + Vite
- Tailwind CSS v4
- React Router
- Lucide React icons

## Notes

- All plan generation uses mock logic in `src/data/planGenerator.js`
- State persists in `localStorage` for demo continuity
- Backend / AI integration is intentionally out of scope for this MVP
