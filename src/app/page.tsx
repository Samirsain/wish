"use client";
import type { Variants } from "framer-motion";

import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  LayoutTemplate,
  Gift,
  ChevronRight,
  ArrowDown,
} from "lucide-react";
import { motion } from "framer-motion";
import { templateData } from "./templates";


const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 28, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const stats = [
  { icon: Gift, value: "1M+", label: "Greetings Shared" },
  { icon: LayoutTemplate, value: "100+", label: "Unique Templates" },
  { icon: Heart, value: "Free", label: "Forever to Use" },
];

export default function Home() {
  const categories = Object.values(templateData);

  return (
    <div className="min-h-screen mesh-bg selection:bg-[var(--primary)] selection:text-white overflow-x-hidden pb-32">

      {/* ── Ambient Background Orbs ── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        <div className="glow-orb w-[700px] h-[700px] bg-pink-400 opacity-[0.15] -top-[200px] -left-[150px]" />
        <div className="glow-orb w-[500px] h-[500px] bg-rose-300 opacity-[0.10] top-[25%] -right-[150px]" />
        <div className="glow-orb w-[350px] h-[350px] bg-fuchsia-300 opacity-[0.12] bottom-[15%] left-[35%]" />
      </div>

      {/* ── Navbar ── */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-black/[0.04] px-6 sm:px-16 py-3.5 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="font-bold text-xl tracking-tight text-[var(--foreground)] flex items-center gap-2.5"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] flex items-center justify-center shadow-md">
            <Heart className="w-3.5 h-3.5 text-white" />
          </div>
          WishCraft
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden sm:flex items-center gap-8 text-sm font-medium"
        >
          <Link href="#categories" className="text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors duration-200">
            Categories
          </Link>
          <Link href="#how-it-works" className="text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors duration-200">
            How it Works
          </Link>
          <Link
            href="#categories"
            className="glass border border-black/5 hover:border-[var(--primary)]/20 text-[var(--foreground)]/80 hover:text-[var(--primary)] px-5 py-2 rounded-full transition-all duration-200 text-xs"
          >
            Browse All →
          </Link>
        </motion.div>

        {/* Mobile hamburger placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="sm:hidden"
        >
          <Link
            href="#categories"
            className="glass border border-black/5 text-[var(--foreground)]/80 px-4 py-1.5 rounded-full text-xs font-medium"
          >
            Browse
          </Link>
        </motion.div>
      </nav>

      {/* ── Hero Section ── */}
      <main className="relative z-10 pt-36 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-black/5 text-sm mb-8 text-[var(--foreground)]/70 shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
          <Heart className="w-3.5 h-3.5 text-[var(--primary-light)]" />
          <span className="font-medium">The Premier Personalization Platform</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-5xl sm:text-7xl lg:text-[88px] font-bold tracking-tighter leading-[1.04] mb-6 max-w-5xl text-[var(--foreground)]"
        >
          Make Wishes
          <br className="hidden sm:block" />
          <span className="gradient-text"> More Magical.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-[520px] text-lg sm:text-xl text-[var(--foreground)]/60 mb-10 leading-[1.7] font-normal"
        >
          Choose a template, personalize with a name, and share instantly.
          Beautiful greetings for every occasion —{" "}
          <span className="text-[var(--primary)] font-medium">free forever.</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-3 mb-24"
        >
          <motion.a
            href="#categories"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary px-8 py-3.5 flex items-center gap-2 text-sm shadow-xl"
          >
            <Heart className="w-4 h-4" />
            Explore Collection
          </motion.a>
          <motion.a
            href="#categories"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="glass border border-[var(--border)] hover:border-[var(--primary)]/30 text-[var(--foreground)]/70 hover:text-[var(--primary)] font-medium px-8 py-3.5 rounded-full transition-all duration-300 text-sm"
          >
            View All Templates
          </motion.a>
        </motion.div>

        {/* Stats — Apple Pill Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center gap-3 mb-32 w-full justify-center"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="glass-card border border-white/[0.075] rounded-2xl px-6 py-4 flex items-center gap-4 min-w-[188px] cursor-default"
            >
              <div className="w-9 h-9 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center flex-shrink-0">
                <stat.icon className="w-4 h-4 text-[var(--primary)]" />
              </div>
              <div className="text-left">
                <p className="font-bold text-[var(--foreground)] text-lg leading-none tracking-tight">
                  {stat.value}
                </p>
                <p className="text-[var(--foreground)]/60 text-xs mt-1 font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          href="#categories"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[var(--foreground)]/30 hover:text-[var(--primary)] transition-colors"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </motion.a>

        {/* ═══════════════════════════════════════════
            How it Works Section
        ════════════════════════════════════════════ */}
        <motion.section
          id="how-it-works"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="w-full scroll-mt-20 mb-32"
        >
          {/* Heading */}
          <div className="text-center mb-16">
            <p className="text-xs text-[var(--primary)] uppercase tracking-[0.18em] mb-3 font-semibold">
              Simple Process
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
              How it{" "}
              <span className="gradient-text">Works</span>
            </h2>
            <p className="text-[var(--foreground)]/60 text-sm mt-4 max-w-sm mx-auto leading-relaxed">
              Three steps — that&apos;s all it takes to create and share a
              magical greeting.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 relative">
            {/* Connector line (desktop only) */}
            <div className="hidden sm:block absolute top-[44px] left-[calc(16.66%+16px)] right-[calc(16.66%+16px)] h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent pointer-events-none" />

            {[
              {
                step: "01",
                title: "Choose a Template",
                desc: "Browse our curated library of festival and occasion cards. Pick the one that matches your vibe.",
                emoji: "🎨",
              },
              {
                step: "02",
                title: "Add a Name",
                desc: "Enter the recipient\u2019s name. Watch it animate live on the card with a magical glitter effect.",
                emoji: "✏️",
              },
              {
                step: "03",
                title: "Share Instantly",
                desc: "Send via WhatsApp, Facebook, or copy the link for Instagram. No login, no fees — ever.",
                emoji: "🚀",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -3, scale: 1.01 }}
                className="glass-card border border-[var(--border)] hover:border-[var(--primary)]/30 rounded-xl p-5 flex flex-col gap-3 relative overflow-hidden transition-all duration-300 cursor-default shadow-sm"
              >
                {/* Subtle orb per card */}
                <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-[var(--primary)] rounded-full blur-[40px] opacity-[0.04] pointer-events-none" />

                {/* Step number + emoji */}
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--primary)]/80">
                    Step {item.step}
                  </span>
                  <span className="text-xl opacity-80">{item.emoji}</span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[var(--foreground)] mb-1.5 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[var(--foreground)]/50 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════
            Categories Section
        ════════════════════════════════════════════ */}
        <div id="categories" className="w-full flex flex-col gap-24 scroll-mt-20">
          {categories.map((category) => (
            <motion.section
              key={category.id}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: [0.25, 0.4, 0.25, 1] }}
              className="flex flex-col text-left w-full"
            >
              {/* Section Header */}
              <div className="flex justify-between items-end border-b border-[var(--border)] pb-5 mb-8">
                <div>
                  <p className="text-xs text-[var(--primary)] uppercase tracking-[0.18em] mb-2 font-semibold">
                    Collection
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
                    {category.name}{" "}
                    <span className="text-[var(--foreground)]/40 font-medium">Wishes</span>
                  </h2>
                </div>
                <Link
                  href="#"
                  className="hidden sm:flex items-center gap-1 text-sm font-medium text-[var(--foreground)]/40 hover:text-[var(--primary)] transition-colors duration-200"
                >
                  Explore All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Template Cards */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
              >
                {category.templates.map((template) => (
                  <motion.div
                    key={template.id}
                    variants={itemVariants}
                    className="group relative rounded-2xl overflow-hidden glass-card border border-[var(--border)] card-hover flex flex-col bg-white"
                  >
                    {/* Card Image */}
                    <div className="aspect-[4/5] w-full relative overflow-hidden bg-slate-50">
                      <Image
                        src={template.thumbnail}
                        alt={template.name}
                        fill
                        className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
                        unoptimized
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent opacity-50" />

                      {/* Quick create overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Link
                          href={`/card/${category.id}/${template.id}`}
                          className="bg-white/80 backdrop-blur-sm border border-white/20 text-[var(--primary)] text-xs font-bold px-5 py-2.5 rounded-full hover:bg-white hover:scale-105 transition-all shadow-[0_8px_20px_rgba(255,45,85,0.15)]"
                        >
                          + Create Now
                        </Link>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="px-4 py-3.5 flex justify-between items-center border-t border-[var(--border)] group-hover:bg-[var(--primary)]/5 transition-colors duration-300">
                      <span className="font-semibold text-[var(--foreground)]/80 text-sm truncate max-w-[110px]">
                        {template.name}
                      </span>
                      <Link
                        href={`/card/${category.id}/${template.id}`}
                        className="bg-[var(--primary)] hover:bg-[var(--primary-light)] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex-shrink-0 ml-2 shadow-[0_4px_12px_rgba(255,45,85,0.25)]"
                      >
                        Create
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          ))}
        </div>
      </main>
    </div>
  );
}
