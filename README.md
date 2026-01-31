# Arkanoid - Brick Breaker Mini App

Classic arcade block breaker game for Base.app and Farcaster. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **33 levels** with unique brick layouts (10 implemented, expandable)
- **8 power-ups**: Enlarge, Laser, Slow, Catch, Disruption, Break, Extra Life, Mega
- **Swipe & touch controls** - mobile-first gameplay
- **Neon cyber aesthetic** - TRON-inspired visuals
- **Local leaderboard** - persistent storage
- **Farcaster/Base integration** - mini app manifest, embed metadata

## Setup

```bash
npm install
npm run dev
```

Set `NEXT_PUBLIC_APP_URL` to your production URL before deploying.

## Deployment (Vercel)

1. Push to GitHub
2. Import to Vercel
3. Set `NEXT_PUBLIC_APP_URL` = https://arkanoid-jade.vercel.app (or your Vercel URL)
4. Deploy

## Farcaster/Base Setup

1. Deploy to Vercel for public URL
2. Go to [Base Build Account Association](https://www.base.dev/preview?tab=account)
3. Enter your app URL, verify, copy `accountAssociation` object
4. Update `minikit.config.ts` and `public/.well-known/farcaster.json` with the signature
5. Validate at [base.dev/preview](https://base.dev/preview)

## Guidelines

- Icon: 1024×1024 px, PNG, no transparency
- Hero: 1200×630 px (1.91:1)
- Touch targets: min 44px
