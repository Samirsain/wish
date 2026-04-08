import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "WishCraft — Personalised Greeting Cards",
  description: "Create and share beautiful animated greeting cards for Diwali, Eid, Birthday, Christmas, New Year and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh flex flex-col" style={{ background: "#ffffff" }}>
        <Navbar />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <footer className="border-t py-6 text-center text-sm" style={{ borderColor: "rgba(0,0,0,0.07)", color: "#9ca3af" }}>
          © {new Date().getFullYear()} WishCraft · Made with ❤️
        </footer>
      </body>
    </html>
  );
}
