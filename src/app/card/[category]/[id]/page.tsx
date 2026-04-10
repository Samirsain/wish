"use client";

import { use, useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Share2,
  MessageCircle,
  PartyPopper,
  Copy,
} from "lucide-react";
import { Confetti, type ConfettiRef } from "@/components/ui/confetti";
import { templateData } from "../../../templates";

/* ─── Festival SEO Articles ───────────────────────────────── */
const festivalArticles: Record<
  string,
  { heading: string; paragraphs: string[] }
> = {
  holi: {
    heading: "Holi Greeting Card Messages — Spread Colors of Joy",
    paragraphs: [
      "Holi is a vibrant festival that celebrates the triumph of good over evil, the arrival of spring, and the joy of colors. Whether you are greeting family, friends, or colleagues, a heartfelt Holi wish card can make all the difference. This collection of Holi Greeting Card Messages is designed to help you express your feelings perfectly — from warm and emotional to funny, playful, and professional.",
      "A Holi card becomes truly memorable when your message connects personally with the reader. If you sometimes struggle to think of the right words, don't worry — we've put together a variety of thoughtful, creative, and meaningful lines to inspire you. Whether you want to spread love, share blessings, or simply add some festive cheer, you will find the right expressions here.",
      "These perfect Holi wishes work for both printed cards and digital greetings — including social media posts, WhatsApp messages, email newsletters, and gift tags. You can simply copy and share them or customize each message to make your card feel more personal and heartfelt.",
      "From classic 'Happy Holi' lines to modern and playful texts — this guide helps you bring smiles, show appreciation, and strengthen your bond with the people you love. Make every card unforgettable with sincere words that reflect the spirit of Holi — color, kindness, and togetherness. Spread happiness this festive season and let your greeting cards deliver the warmest wishes. 🎨 ✨",
    ],
  },
  diwali: {
    heading: "Diwali Greeting Card Messages — Light Up Hearts with Wishes",
    paragraphs: [
      "Diwali, the Festival of Lights, is one of the most cherished celebrations across the world. It symbolizes the victory of light over darkness, knowledge over ignorance, and good over evil. Sending a personalized Diwali wish card is the perfect way to share your love, warmth, and blessings with family, friends, and colleagues.",
      "Whether you're looking for traditional, religious, or modern Diwali messages, we've curated a beautiful collection that captures the spirit of this magnificent festival. From heartfelt prayers for prosperity to cheerful greetings filled with joy, each message is crafted to make your Diwali card truly special.",
      "Share these messages via WhatsApp, Facebook, Instagram, or use them in your printed cards. Every wish is designed to spark joy and create memorable moments during this auspicious festival of lights.",
      "Let your Diwali greetings shine as bright as the diyas and fireworks. Fill every card with love, light, and the promise of a prosperous new beginning. 🪔 ✨",
    ],
  },
  xmas: {
    heading: "Christmas Greeting Card Messages — Write Perfect Wishes",
    paragraphs: [
      "Sending Christmas cards is a beautiful tradition that helps us spread love, joy, and heartfelt wishes to the people who matter most. Whether you are writing to family, friends, colleagues, customers, or someone special, finding the right words can make all the difference. This collection of Christmas Greeting Card Messages is designed to help you express your feelings perfectly — from warm and emotional messages to funny, short, religious, professional, and unique wishes that fit every type of relationship.",
      "A Christmas card becomes truly memorable when your message connects personally with the reader. If you sometimes struggle to think of the right words, don't worry — we've put together a variety of thoughtful, creative, and meaningful lines to inspire you. Whether you want to share blessings, send seasonal cheer, spread holiday magic, or thank someone for their presence in your life, you will find the right expressions here.",
      "These perfect Christmas wishes work for both printed cards and digital greetings — including social media posts, WhatsApp messages, email newsletters, and gift tags. You can simply copy and share them or customize each message to make your card feel more personal and heartfelt.",
      "From classic 'Merry Christmas' lines to modern and playful texts — this guide helps you bring smiles, show appreciation, and strengthen your bond with the people you love. Make every card unforgettable with sincere words that reflect the spirit of Christmas — peace, kindness, and togetherness. Spread happiness this holiday season and let your greeting cards deliver the warmest festive feelings. 🎄 ✨",
    ],
  },
  ny: {
    heading: "New Year Greeting Card Messages — Welcome a Fresh Start",
    paragraphs: [
      "The New Year is a time of hope, new beginnings, and fresh resolutions. Sending a heartfelt New Year greeting card is the perfect way to express your wishes for happiness, success, and prosperity to your loved ones. Whether you're writing to family, friends, or professional contacts, the right words can set a positive tone for the year ahead.",
      "Our curated collection of New Year messages ranges from inspirational and motivational to warm and heartfelt. Each message is designed to convey your genuine wishes and help you connect with the people who matter most as a new chapter begins.",
      "Share these greetings through WhatsApp, social media, or traditional cards. Each wish is crafted to inspire and uplift, making every recipient feel special and valued as they step into a brand new year.",
      "Let your New Year cards carry the promise of wonderful days ahead. Fill them with hope, joy, and the magic of new beginnings. Welcome to a brilliant year! 🎆 ✨",
    ],
  },
  birthday: {
    heading: "Birthday Greeting Card Messages — Make Their Day Special",
    paragraphs: [
      "A birthday is one of the most personal celebrations in everyone's life. Sending a thoughtful birthday card with the perfect message can make someone's special day even more memorable. Whether you're writing for a friend, family member, partner, or colleague, choosing the right words shows how much you care.",
      "We've curated a variety of birthday wishes — from sweet and sentimental to funny and playful. Whether you prefer classic birthday greetings or want something unique and creative, you'll find the perfect message to express your feelings and make the birthday person smile.",
      "These birthday messages work beautifully for printed cards, WhatsApp messages, social media posts, and gift tags. Simply copy, customize, and share to create a birthday greeting that feels truly personal and special.",
      "Make every birthday celebration unforgettable with sincere words that come from the heart. Because everyone deserves to feel loved and celebrated on their special day! 🎂 ✨",
    ],
  },
};

/* ─── Festival Greeting Data ─────────────────────────────── */
const festivalData: Record<string, { title: string; lines: { text: string; color: string }[] }> = {
  holi: {
    title: "Happy Holi!",
    lines: [
      { text: "Happy Holi!", color: "#E63946" },
      { text: "May your life be as colorful as this festival,", color: "#D1495B" },
      { text: "May joy paint every moment,", color: "#2A9D8F" },
      { text: "May love fill every corner,", color: "#E9C46A" },
      { text: "May blessings color your way,", color: "#8ECAE6" },
      { text: "Have a vibrant celebration! 🎨 ❤️", color: "#E63946" },
    ],
  },
  diwali: {
    title: "Happy Diwali!",
    lines: [
      { text: "Happy Diwali!", color: "#E67E22" },
      { text: "May light conquer every darkness,", color: "#E63946" },
      { text: "May prosperity enter your door,", color: "#2A9D8F" },
      { text: "May joy illuminate your path,", color: "#E9C46A" },
      { text: "May harmony surround you,", color: "#8A2BE2" },
      { text: "Have a sparkling festival! 🪔 ✨", color: "#E67E22" },
    ],
  },
  xmas: {
    title: "Merry Christmas!",
    lines: [
      { text: "Merry Christmas!", color: "#2A9D8F" },
      { text: "May your days sparkle bright,", color: "#E63946" },
      { text: "May love fill every moment,", color: "#F4A261" },
      { text: "May laughter echo around you,", color: "#264653" },
      { text: "May blessings find your way,", color: "#E9C46A" },
      { text: "Have a joyful holiday season! 🎄 ❤️", color: "#2A9D8F" },
    ],
  },
  ny: {
    title: "Happy New Year!",
    lines: [
      { text: "Happy New Year!", color: "#F4A261" },
      { text: "May new dreams unfold,", color: "#E63946" },
      { text: "May opportunities arise,", color: "#2A9D8F" },
      { text: "May your spirit soar high,", color: "#8A2BE2" },
      { text: "May happiness be constant,", color: "#D1495B" },
      { text: "Welcome to a brilliant year! 🎆 ✨", color: "#F4A261" },
    ],
  },
  birthday: {
    title: "Happy Birthday!",
    lines: [
      { text: "Happy Birthday!", color: "#E63946" },
      { text: "May your day sparkle bright,", color: "#D1495B" },
      { text: "May joy fill every moment,", color: "#2A9D8F" },
      { text: "May laughter echo around you,", color: "#E9C46A" },
      { text: "May blessings find your way,", color: "#8ECAE6" },
      { text: "Have a wonderful celebration! 🎂 ❤️", color: "#E63946" },
    ],
  },
};

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
  const fest = festivalData[unwrappedParams.category] || festivalData.xmas;
  const article = festivalArticles[unwrappedParams.category] || festivalArticles.xmas;

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

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/card/${unwrappedParams.category}/${unwrappedParams.id}?n=${encodeURIComponent(name)}`
    : "";

  // Get recent cards (all templates except current)
  const recentCards = Object.values(templateData)
    .flatMap((cat) =>
      cat.templates.map((t) => ({
        ...t,
        catId: cat.id,
        catName: cat.name,
      }))
    )
    .filter(
      (t) =>
        !(t.catId === unwrappedParams.category && t.id === unwrappedParams.id)
    )
    .slice(0, 5);

  if (!template)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-gray-400">
        Template not found
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f8f8f8] overflow-x-hidden">
      {/* Magic UI Confetti Canvas */}
      <Confetti
        ref={confettiRef}
        className="fixed inset-0 z-[999] pointer-events-none w-full h-full"
        manualstart
      />


      {/* ── Main Content — Single Column Centered ── */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-8 pb-16">
        
        {/* ═══ CARD PREVIEW SECTION ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.04)] overflow-hidden mb-8"
        >
          {/* Card Content */}
          <div className="flex flex-col items-center px-6 pt-8 pb-6">

            {/* Animated Name — shows "Your Name" by default, updates live */}
            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -6, 0],
              }}
              transition={{
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 },
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
              className="text-3xl sm:text-4xl font-bold mb-1 sname-animated drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
            >
              {name || "Your Name"}
            </motion.h2>

            {/* "Wishing You" Image */}
            <div className="relative w-[180px] h-[40px] mb-4">
              <Image
                src="/image copy.png"
                alt="Wishing You"
                fill
                style={{ objectFit: "contain" }}
                unoptimized
              />
            </div>

            {/* Wish Image Banner (if exists) */}
            {template.wishImage && (
              <div className="relative w-full max-w-[250px] h-[50px] mb-3">
                <Image
                  src={template.wishImage}
                  alt="Wish Banner"
                  fill
                  style={{ objectFit: "contain" }}
                  unoptimized
                />
              </div>
            )}

            {/* Main Card Image */}
            <div className="w-full max-w-[360px] rounded-xl overflow-hidden mb-6">
              <img
                src={template.mainImage}
                alt={template.name}
                className="w-full h-auto rounded-xl"
              />
            </div>

            {/* Under Image (if exists) */}
            {template.underImage && (
              <div className="relative w-full max-w-[280px] h-[120px] mb-4">
                <Image
                  src={template.underImage}
                  alt="Card Decoration"
                  fill
                  style={{ objectFit: "contain" }}
                  unoptimized
                />
              </div>
            )}

            {/* Poetic Greeting Lines */}
            <div className="flex flex-col items-center gap-1 mb-6">
              {fest.lines.map((line, i) => (
                <p
                  key={i}
                  style={{ color: line.color }}
                  className={`text-[15px] leading-[1.8] text-center ${
                    i === 0 ? "text-[17px] font-semibold mb-1" : ""
                  }`}
                >
                  {line.text}
                </p>
              ))}
            </div>
          </div>

          {/* ── Input & CTA Bar ── */}
          <AnimatePresence mode="wait">
            {!isGenerated ? (
              <motion.div
                key="input-bar"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <form onSubmit={handleGenerate}>
                  <div className="border-t border-gray-100 bg-[#faf9f6] px-4 sm:px-6 py-4">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name here..."
                      required
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none hover:border-gray-300 focus:border-[#ff2d55] focus:ring-2 focus:ring-[#ff2d55]/10 transition-all placeholder:text-gray-400"
                    />
                  </div>
                  <div className="px-4 sm:px-6 pb-5 mt-2">
                    <motion.button
                      whileHover={{ scale: 1.02, rotate: -1 }}
                      whileTap={{ scale: 0.95, rotate: 1, x: 2, y: 2, boxShadow: "0px 0px 0px rgba(17,24,39,1)" }}
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                      }}
                      type="submit"
                      className="w-full relative overflow-hidden bg-gradient-to-r from-[#ff2d55] to-[#ff3b61] text-white font-black px-6 py-3.5 rounded-2xl flex justify-center items-center gap-2.5 border-[3px] border-gray-900 shadow-[5px_5px_0px_rgba(17,24,39,1)] text-base uppercase tracking-widest"
                    >
                      <motion.span
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="text-xl"
                      >
                        🪄
                      </motion.span>
                      Create Wish
                      <motion.span
                        animate={{ rotate: [0, -15, 15, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                        className="text-xl"
                      >
                        ✨
                      </motion.span>
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="share-bar"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="border-t border-gray-100 bg-[#faf9f6] px-4 sm:px-6 py-5 flex flex-col gap-3"
              >
                {isReceived ? (
                  <div className="text-center mb-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ff2d55]/10 text-xs mb-3 text-[#ff2d55] font-medium">
                      <PartyPopper className="w-3.5 h-3.5" />
                      Special Wish for You
                    </div>
                    <p className="text-gray-600 text-sm">
                      <strong className="text-gray-900">{name}</strong> has sent
                      you this beautiful greeting! 🎉
                    </p>
                  </div>
                ) : (
                  <div className="text-center mb-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-xs mb-2 text-emerald-600 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Card Ready!
                    </div>
                    <p className="text-gray-500 text-sm">
                      Your card for{" "}
                      <strong className="text-gray-900">{name}</strong> is ready
                      to share!
                    </p>
                  </div>
                )}

                {!isReceived ? (
                  <>
                    {/* WhatsApp */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        const text = `🎉 *${name}* ne aapke liye ek special surprise bheja hai! ✨\n\nIs magical wish ko dekhne ke liye niche link par click karein:\n\n`;
                        window.open(
                          `https://api.whatsapp.com/send?text=${encodeURIComponent(text + shareUrl)}`,
                          "_blank"
                        );
                      }}
                      className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-6 py-3 rounded-xl flex justify-center items-center gap-2.5 text-sm transition-all shadow-[0_4px_14px_rgba(37,211,102,0.25)]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Send via WhatsApp
                    </motion.button>

                    {/* Facebook */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        window.open(
                          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                          "_blank"
                        );
                      }}
                      className="w-full bg-[#1877F2] hover:bg-[#1464d4] text-white font-semibold px-6 py-3 rounded-xl flex justify-center items-center gap-2.5 text-sm transition-all shadow-[0_4px_14px_rgba(24,119,242,0.25)]"
                    >
                      <Share2 className="w-4 h-4" />
                      Share on Facebook
                    </motion.button>

                    {/* Instagram */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        handleCopy(shareUrl, "Link Copied for Instagram!")
                      }
                      className="w-full bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-90 text-white font-semibold px-6 py-3 rounded-xl flex justify-center items-center gap-2.5 text-sm transition-all shadow-[0_4px_14px_rgba(220,39,67,0.25)]"
                    >
                      <Share2 className="w-4 h-4" />
                      Copy for Instagram
                    </motion.button>

                    {/* Copy Link */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCopy(shareUrl)}
                      className="w-full bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-medium px-6 py-3 rounded-xl flex justify-center items-center gap-2.5 text-sm transition-all"
                    >
                      <Copy className="w-4 h-4" />
                      {copied ? "Copied!" : "Copy Direct Link"}
                    </motion.button>

                    <button
                      onClick={() => setIsGenerated(false)}
                      className="text-sm text-gray-400 hover:text-[#ff2d55] transition-colors text-center mt-1"
                    >
                      ← Edit Details
                    </button>
                  </>
                ) : (
                  <Link href="/" className="w-full">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-[#ff2d55] hover:bg-[#e82549] text-white font-semibold px-6 py-3 rounded-xl flex justify-center items-center gap-2 text-sm cursor-pointer transition-all shadow-[0_4px_14px_rgba(255,45,85,0.3)]"
                    >
                      <Heart className="w-4 h-4" />
                      Create Your Own Free Wish
                    </motion.div>
                  </Link>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ═══ SEO ARTICLE SECTION ═══ */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.04)] p-6 sm:p-8 mb-8"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 leading-tight">
            {article.heading}
          </h2>
          <div className="prose prose-sm prose-gray max-w-none">
            {article.paragraphs.map((para, i) => (
              <p
                key={i}
                className="text-gray-600 text-[14px] leading-[1.8] mb-4 last:mb-0"
              >
                {para}
              </p>
            ))}
          </div>
        </motion.article>

        {/* ═══ RECENT WISH CARDS SECTION ═══ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.04)] p-6 sm:p-8"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-5 text-center">
            Recent Wish Cards
          </h3>
          <div className="flex flex-col gap-3">
            {recentCards.map((card) => (
              <Link
                href={`/card/${card.catId}/${card.id}`}
                key={`${card.catId}-${card.id}`}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group border border-transparent hover:border-gray-100"
              >
                {/* Thumbnail */}
                <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 relative border border-gray-100">
                  <Image
                    src={card.thumbnail}
                    alt={card.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-[#ff2d55] transition-colors">
                    {card.catName} — {card.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Make wish card with your name
                  </p>
                </div>
                {/* Arrow */}
                <div className="text-gray-300 group-hover:text-[#ff2d55] transition-colors flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6 12L10 8L6 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>
      </main>

    </div>
  );
}
