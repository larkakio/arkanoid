import type { Metadata } from "next";
import "./globals.css";

const ROOT_URL = process.env.NEXT_PUBLIC_APP_URL || "https://arkanoid.vercel.app";

const FC_EMBED = {
  version: "1",
  imageUrl: `${ROOT_URL}/hero-image.png`,
  button: {
    title: "Play Arkanoid",
    action: {
      type: "launch_frame",
      name: "Arkanoid - Brick Breaker",
      url: `${ROOT_URL}/`,
      splashImageUrl: `${ROOT_URL}/hero-image.png`,
      splashBackgroundColor: "#0a0a0f",
    },
  },
};

export const metadata: Metadata = {
  title: "Arkanoid - Brick Breaker",
  description:
    "Classic arcade block breaker with 33 levels, power-ups, and futuristic neon visuals. Challenge your friends on the leaderboard!",
  other: {
    viewport:
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover",
    "theme-color": "#0a0a0f",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "fc:miniapp": JSON.stringify(FC_EMBED),
    "fc:frame": JSON.stringify(FC_EMBED),
  },
  openGraph: {
    title: "Arkanoid - Brick Breaker",
    description:
      "Break bricks, collect power-ups, dominate the leaderboard! Classic arcade action meets blockchain gaming.",
    images: [{ url: `${ROOT_URL}/hero-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arkanoid - Brick Breaker",
    description: "Classic arcade action meets blockchain gaming",
    images: [`${ROOT_URL}/hero-image.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0a0a0f] antialiased">{children}</body>
    </html>
  );
}
