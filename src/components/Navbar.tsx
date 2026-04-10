"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-black/[0.04] px-6 sm:px-16 py-3.5 flex justify-between items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/"
          className="font-bold text-xl tracking-tight text-[var(--foreground)] flex items-center gap-2.5"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] flex items-center justify-center shadow-md">
            <Heart className="w-3.5 h-3.5 text-white" />
          </div>
          WishCraft
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden sm:flex items-center gap-8 text-sm font-medium"
      >
        <Link
          href="/#categories"
          className="text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors duration-200"
        >
          Categories
        </Link>
        <Link
          href="/#how-it-works"
          className="text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors duration-200"
        >
          How it Works
        </Link>
        <Link
          href="/#categories"
          className="glass border border-black/5 hover:border-[var(--primary)]/20 text-[var(--foreground)]/80 hover:text-[var(--primary)] px-5 py-2 rounded-full transition-all duration-200 text-xs"
        >
          Browse All →
        </Link>
      </motion.div>

      {/* Mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="sm:hidden"
      >
        <Link
          href="/#categories"
          className="glass border border-black/5 text-[var(--foreground)]/80 px-4 py-1.5 rounded-full text-xs font-medium"
        >
          Browse
        </Link>
      </motion.div>
    </nav>
  );
}
