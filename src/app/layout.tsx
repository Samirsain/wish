import type { Metadata } from "next";
import { Outfit, Geist } from "next/font/google";
import Link from "next/link";
import { Heart } from "lucide-react";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WishCraft | Create & Share Magical Personalised Greetings",
  description:
    "Create stunning, personalized animated greeting cards for Holi, Diwali, Birthdays & more. Share instantly via WhatsApp, Facebook & Instagram. Free forever, no signup required.",
  keywords:
    "personalized greeting cards, digital wishes, holi cards, birthday greetings, diwali wishes, animated cards, whatsapp share",
  openGraph: {
    title: "WishCraft | Magical Personalised Greetings",
    description:
      "Connect with loved ones through fast, beautiful digital wishes.",
    type: "website",
  },
};

const footerLinks = {
  Product: [
    { label: "Occasions", href: "#categories" },
    { label: "Trending Cards", href: "#" },
    { label: "How it Works", href: "#" },
    { label: "Pricing", href: "#" },
  ],
  Resources: [
    { label: "Help Center", href: "#" },
    { label: "Design Guide", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Community", href: "#" },
  ],
  Connect: [
    { label: "Instagram", href: "#" },
    { label: "Twitter / X", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "Contact Us", href: "#" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", outfit.variable, "font-sans", geist.variable)}>
      <head>
        <link
          rel="icon"
          href="https://bestanimations.com/media/newyear/328918394happy-new-year-gif-neon-sparkling-lights-animated.gif"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[var(--background)] text-[var(--foreground)]">
        {children}

        {/* ── Footer ── */}
        <footer className="mt-auto relative z-10 border-t border-[var(--border)] bg-[var(--background)] pt-20 pb-10 px-6 sm:px-12 overflow-hidden">
          {/* Top divider glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[2px] bg-gradient-to-r from-transparent via-[var(--primary)]/30 to-transparent blur-sm" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-px bg-gradient-to-r from-transparent via-[var(--primary)]/80 to-transparent" />

          {/* Ambient Glow */}
          <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[var(--primary)] rounded-full blur-[120px] opacity-[0.04] pointer-events-none" />

          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 sm:gap-8 relative z-10">
            {/* Brand */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="font-extrabold text-2xl tracking-tighter text-[var(--foreground)] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-rose-400 flex items-center justify-center shadow-lg shadow-[var(--primary)]/20">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                WishCraft
              </div>
              <p className="text-[var(--foreground)]/60 text-sm max-w-sm leading-relaxed font-medium">
                Empowering millions to share joy through fast, beautiful, and personalized digital memories. Join the celebration and spread love today.
              </p>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group} className="flex flex-col gap-4">
                <h4 className="font-bold text-[var(--foreground)] mb-1 uppercase text-xs tracking-wider">
                  {group}
                </h4>
                <ul className="space-y-3.5 text-sm font-medium text-[var(--foreground)]/50">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="hover:text-[var(--primary)] transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Row */}
          <div className="max-w-7xl mx-auto pt-8 mt-16 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-center gap-5 text-[11px] font-semibold text-[var(--foreground)]/40 uppercase tracking-widest relative z-10">
            <p>&copy; {new Date().getFullYear()} WishCraft Media. All rights reserved.</p>
            <div className="flex gap-8">
              <Link href="#" className="hover:text-[var(--primary)] transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-[var(--primary)] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
