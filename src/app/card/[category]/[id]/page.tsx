"use client";

import { use, useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ChevronLeft,
  Share2,
  MessageCircle,
  PartyPopper,
  Copy,
} from "lucide-react";
import { Confetti, type ConfettiRef } from "@/components/ui/confetti";
import { templateData } from "../../../templates";

export default function CardPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const unwrappedParams = use(params);
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);
  const [isReceived, setIsReceived] = useState(false);
  const [copied, setCopied] = useState(false);
  const confettiRef = useRef<ConfettiRef>(null);

  useEffect(() => {
    const sharedName = searchParams.get("n");
    if (sharedName) {
      setName(sharedName);
      setIsGenerated(true);
      setIsReceived(true);
    }
  }, [searchParams]);

  // Fire side-cannons confetti when card is generated
  useEffect(() => {
    if (!isGenerated) return;
    const colors = ["#a78bfa", "#7c3aed", "#f0abfc", "#c084fc", "#fbbf24", "#fb7185"];
    const end = Date.now() + 2500;
    const frame = () => {
      if (Date.now() > end) return;
      confettiRef.current?.fire({
        particleCount: 3,
        angle: 60,
        spread: 55,
        startVelocity: 55,
        origin: { x: 0, y: 0.6 },
        colors,
      });
      confettiRef.current?.fire({
        particleCount: 3,
        angle: 120,
        spread: 55,
        startVelocity: 55,
        origin: { x: 1, y: 0.6 },
        colors,
      });
      requestAnimationFrame(frame);
    };
    frame();
  }, [isGenerated]);

  const category = templateData[unwrappedParams.category];
  const template = category?.templates.find((t) => t.id === unwrappedParams.id);

  const festivalData: Record<string, { title: string; desc: React.ReactNode }> =
    {
      holi: {
        title: "Happy Holi!",
        desc: (
          <>
            May your life be as colorful and joyful as the festival of colors.
            <br />
            Wishing you love, prosperity, and happiness.
          </>
        ),
      },
      diwali: {
        title: "Happy Diwali!",
        desc: (
          <>
            May the festival of lights brighten your life
            <br />
            and bring you peace, happiness, and prosperity.
          </>
        ),
      },
      xmas: {
        title: "Merry Christmas!",
        desc: (
          <>
            May your days sparkle bright,
            <br />
            May love fill every moment,
            <br />
            And peace surround your heart tonight.
          </>
        ),
      },
      ny: {
        title: "Happy New Year!",
        desc: (
          <>
            Wishing you a wonderful year ahead
            <br />
            filled with joy, success, and endless blessings.
          </>
        ),
      },
      birthday: {
        title: "Happy Birthday!",
        desc: (
          <>
            Sending you smiles for every moment of your special day.
            <br />
            Have a wonderful time and a very happy birthday!
          </>
        ),
      },
    };

  const fest =
    festivalData[unwrappedParams.category] || festivalData.xmas;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) setIsGenerated(true);
  };

  const handleCopy = (url: string, label?: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    if (label) alert(label);
  };

  if (!template)
    return (
      <div className="min-h-screen mesh-bg flex items-center justify-center text-[var(--foreground)]/50">
        Template not found
      </div>
    );

  return (
    <div className="min-h-screen mesh-bg overflow-x-hidden pb-32">
      {/* Magic UI Confetti Canvas — fixed full-screen */}
      <Confetti
        ref={confettiRef}
        className="fixed inset-0 z-[999] pointer-events-none w-full h-full"
        manualstart
      />
      {/* Ambient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        <div className="glow-orb w-[500px] h-[500px] bg-pink-400 opacity-[0.15] -top-[100px] -right-[150px]" />
        <div className="glow-orb w-[400px] h-[400px] bg-rose-300 opacity-[0.12] bottom-[10%] -left-[100px]" />
      </div>

      {/* ── Minimal Navbar ── */}
      <nav className="relative z-50 glass border-b border-black/[0.04] px-6 sm:px-16 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm font-medium text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors duration-200"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Collection
        </Link>
        <div className="font-bold text-lg tracking-tight text-[var(--foreground)] flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[var(--primary)] flex items-center justify-center shadow-sm">
            <Heart className="w-3 h-3 text-white" />
          </div>
          WishCraft
        </div>
      </nav>

      {/* ── Main Content ── */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 sm:px-12 pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ══ Card Preview ══ */}
          <div className="relative flex flex-col items-center">
            {/* Animated Name Overlay */}
            <AnimatePresence>
              {name && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: -20 }}
                  animate={{
                    opacity: isGenerated ? 1 : 0.7,
                    scale: 1,
                    y: [0, -10, 0],
                  }}
                  transition={{
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.4 },
                  }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="absolute top-8 z-20 font-bold text-4xl sm:text-5xl tracking-tight sname-animated drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
                >
                  {name}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Card Stack */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="relative w-full max-w-sm rounded-2xl overflow-hidden flex flex-col items-center"
            >
              {template.wishImage && (
                <div className="relative w-full h-[60px] mb-2 z-10">
                  <Image
                    src={template.wishImage}
                    alt="Wish Banner"
                    fill
                    style={{ objectFit: "contain" }}
                    unoptimized
                  />
                </div>
              )}

              <div className="relative w-full aspect-[4/5]">
                <Image
                  src={template.mainImage}
                  alt={template.name}
                  fill
                  style={{ objectFit: "cover" }}
                  unoptimized
                  className="rounded-2xl"
                />
              </div>

              {template.underImage && (
                <div className="relative w-full h-[150px] mt-4">
                  <Image
                    src={template.underImage}
                    alt="Card Decoration"
                    fill
                    style={{ objectFit: "contain" }}
                    unoptimized
                  />
                </div>
              )}
            </motion.div>

            {/* Poetic Greeting */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 text-center px-4"
            >
              <p className="font-serif text-[var(--primary)] text-xl italic mb-2 font-medium">
                {fest.title}
              </p>
              <p className="text-[var(--foreground)]/60 text-sm leading-relaxed max-w-sm mx-auto">
                {fest.desc}
              </p>
            </motion.div>
          </div>

          {/* ══ Interaction Panel ══ */}
          <div className="flex flex-col h-full justify-center lg:pt-4">
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="glass-card border border-[var(--border)] rounded-2xl p-8 sm:p-10 relative overflow-hidden shadow-sm"
            >
              {/* Orb inside card */}
              <div className="absolute -top-28 -right-28 w-56 h-56 bg-[var(--primary)] rounded-full blur-[100px] opacity-[0.05] pointer-events-none" />

              <AnimatePresence mode="wait">
                {!isGenerated ? (
                  /* ── Editor State ── */
                  <motion.div
                    key="editor"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-[var(--border)] text-xs mb-6 text-[var(--foreground)]/60">
                      <Heart className="w-3 h-3 text-[var(--primary)]" />
                      Personalize this card
                    </div>
                    <h2 className="text-3xl font-bold mb-3 tracking-tight text-[var(--foreground)]">
                      Personalize &amp; Share
                    </h2>
                    <p className="text-[var(--foreground)]/50 mb-8 text-sm leading-relaxed">
                      Enter a name to bring this card to life. No signup
                      required — sharing takes just 10 seconds.
                    </p>

                    <form onSubmit={handleGenerate} className="flex flex-col gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[var(--foreground)]/70 ml-1">
                          Recipient Name
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g., Alex"
                          required
                          className="glass-input rounded-xl px-5 py-4 font-medium text-lg w-full"
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="btn-primary mt-2 px-8 py-4 rounded-xl flex justify-center items-center gap-2 text-sm shadow-lg"
                      >
                        <Heart className="w-4 h-4" />
                        Generate Wish
                      </motion.button>
                    </form>
                  </motion.div>
                ) : (
                  /* ── Share State ── */
                  <motion.div
                    key="share"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isReceived ? (
                      <div className="mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-[var(--primary)]/20 bg-[var(--primary)]/5 text-xs mb-5 text-[var(--primary)]">
                          <PartyPopper className="w-3 h-3" />
                          Special Wish for You
                        </div>
                        <h2 className="text-3xl font-bold mb-3 tracking-tight text-[var(--foreground)]">
                          Magical Surprise! ✨
                        </h2>
                        <p className="text-[var(--foreground)]/60 text-sm leading-relaxed">
                          <strong className="text-[var(--foreground)]">{name}</strong> has
                          sent you this beautiful greeting. Hope it brings a
                          smile to your face!
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-emerald-500/20 bg-emerald-500/10 text-xs mb-5 text-emerald-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Card Ready!
                        </div>
                        <h2 className="text-3xl font-bold mb-3 tracking-tight text-[var(--primary)]">
                          It&apos;s Ready! 🎉
                        </h2>
                        <p className="text-[var(--foreground)]/60 mb-8 text-sm leading-relaxed">
                          Your personalized card for{" "}
                          <strong className="text-[var(--foreground)]">{name}</strong> is ready
                          to bring a smile. Share it directly below.
                        </p>
                      </>
                    )}

                    <div className="flex flex-col gap-3">
                      {!isReceived ? (
                        <>
                          {/* WhatsApp */}
                          <motion.button
                            whileHover={{ scale: 1.02, y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              const shareUrl = `${window.location.origin}/card/${unwrappedParams.category}/${unwrappedParams.id}?n=${encodeURIComponent(name)}`;
                              const text = `🎉 *${name}* ne aapke liye ek special surprise bheja hai! ✨\n\nIs magical wish ko dekhne ke liye niche link par click karein:\n\n`;
                              window.open(
                                `https://api.whatsapp.com/send?text=${encodeURIComponent(text + shareUrl)}`,
                                "_blank"
                              );
                            }}
                            className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-8 py-4 rounded-xl flex justify-center items-center gap-2.5 shadow-[0_4px_20px_rgba(37,211,102,0.25)] transition-all text-sm"
                          >
                            <MessageCircle className="w-4 h-4" />
                            Send via WhatsApp
                          </motion.button>

                          {/* Facebook */}
                          <motion.button
                            whileHover={{ scale: 1.02, y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              const shareUrl = `${window.location.origin}/card/${unwrappedParams.category}/${unwrappedParams.id}?n=${encodeURIComponent(name)}`;
                              window.open(
                                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                                "_blank"
                              );
                            }}
                            className="bg-[#1877F2] hover:bg-[#1464d4] text-white font-semibold px-8 py-4 rounded-xl flex justify-center items-center gap-2.5 shadow-[0_4px_20px_rgba(24,119,242,0.25)] transition-all text-sm"
                          >
                            <Share2 className="w-4 h-4" />
                            Share on Facebook
                          </motion.button>

                          {/* Instagram */}
                          <motion.button
                            whileHover={{ scale: 1.02, y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              const shareUrl = `${window.location.origin}/card/${unwrappedParams.category}/${unwrappedParams.id}?n=${encodeURIComponent(name)}`;
                              handleCopy(shareUrl, "Link Copied for Instagram!");
                            }}
                            className="bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-90 text-white font-semibold px-8 py-4 rounded-xl flex justify-center items-center gap-2.5 shadow-[0_4px_20px_rgba(220,39,67,0.25)] transition-all text-sm"
                          >
                            <Share2 className="w-4 h-4" />
                            Copy for Instagram
                          </motion.button>

                          {/* Copy link */}
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              const shareUrl = `${window.location.origin}/card/${unwrappedParams.category}/${unwrappedParams.id}?n=${encodeURIComponent(name)}`;
                              handleCopy(shareUrl);
                            }}
                            className="glass border border-[var(--border)] hover:border-[var(--primary)] text-[var(--foreground)]/70 hover:text-[var(--primary)] font-medium px-8 py-4 rounded-xl flex justify-center items-center gap-2.5 transition-all mt-1 text-sm bg-white"
                          >
                            <Copy className="w-4 h-4" />
                            {copied ? "Copied!" : "Copy Direct Link"}
                          </motion.button>
                        </>
                      ) : (
                        <Link href="/" className="w-full">
                          <motion.div
                            whileHover={{ scale: 1.02, y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn-primary w-full px-8 py-4 rounded-xl flex justify-center items-center gap-2 text-sm cursor-pointer shadow-lg"
                          >
                            <Heart className="w-4 h-4" />
                            Create Your Own Free Wish
                          </motion.div>
                        </Link>
                      )}
                    </div>

                    {!isReceived && (
                      <button
                        onClick={() => setIsGenerated(false)}
                        className="mt-7 text-sm text-[var(--foreground)]/40 hover:text-[var(--primary)] transition-colors w-full text-center"
                      >
                        ← Edit Details
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="divider my-20" />

        {/* ── More Templates ── */}
        <div className="flex flex-col items-center text-center">
          <p className="text-xs text-[var(--primary)] uppercase tracking-[0.18em] mb-3 font-semibold">
            Discover More
          </p>
          <h3 className="text-2xl font-bold tracking-tight mb-10 text-[var(--foreground)]">
            More Templates
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
            {Object.values(templateData)
              .flatMap((cat) =>
                cat.templates.map((t) => ({ ...t, catId: cat.id }))
              )
              .filter(
                (t) =>
                  !(
                    t.catId === unwrappedParams.category &&
                    t.id === unwrappedParams.id
                  )
              )
              .slice(0, 6)
              .map((t) => (
                <Link
                  href={`/card/${t.catId}/${t.id}`}
                  key={`${t.catId}-${t.id}`}
                  className="group relative rounded-xl overflow-hidden glass-card border border-[var(--border)] card-hover flex flex-col aspect-[4/5] bg-white"
                >
                  <Image
                    src={t.thumbnail}
                    alt={t.name}
                    fill
                    className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 w-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-[9px] uppercase tracking-widest text-[var(--foreground)]/60 mb-0.5">
                      {templateData[t.catId].name}
                    </p>
                    <span className="text-xs font-bold text-[var(--primary)]">
                      Use Design →
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}
