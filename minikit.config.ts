const ROOT_URL = process.env.NEXT_PUBLIC_APP_URL || "https://arkanoid-jade.vercel.app";

export const minikitConfig = {
  accountAssociation: {
    header: "eyJmaWQiOjI1ODIyODIsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHgzNjYxOWEwNGMxRTg1QTdlZWQ2Y2QwYjI5OGJEMWY0MDIxNmYwQjM3In0",
    payload: "eyJkb21haW4iOiJhcmthbm9pZC1qYWRlLnZlcmNlbC5hcHAifQ",
    signature: "EcuLpVFDcEudyZTBTjQKGrUlND+lcvUBCoggBBs1nZ0dIFN49hl3TSM+e/t4Oi8EvO1+/MhxCWHc4Ql2eWMNbRw=",
  },
  miniapp: {
    version: "1",
    name: "Arkanoid - Brick Breaker",
    subtitle: "Break bricks. Get power-ups.",
    description:
      "Classic arcade block breaker with 33 levels, power-ups, and futuristic neon visuals. Challenge your friends on the leaderboard!",
    screenshotUrls: [
      `${ROOT_URL}/screenshot-1.png`,
      `${ROOT_URL}/screenshot-2.png`,
    ],
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/hero-image.png`,
    splashBackgroundColor: "#0a0a0f",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "games",
    tags: ["arcade", "action", "retro", "competitive"],
    heroImageUrl: `${ROOT_URL}/hero-image.png`,
    tagline: "The ultimate brick breaker",
    ogTitle: "Arkanoid - Brick Breaker",
    ogDescription: "33 levels of neon-powered block breaking action",
    ogImageUrl: `${ROOT_URL}/hero-image.png`,
    requiredChains: ["eip155:8453"],
  },
} as const;
