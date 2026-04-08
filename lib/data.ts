export type AnimationType = "particles" | "confetti" | "fireworks" | "candles" | "sparkles";

export interface ColorTheme {
  bg: string;          // full background gradient (CSS)
  accent: string;      // primary accent hex
  accent2: string;     // secondary accent hex
  text: string;        // main text color
  card: string;        // card bg rgba
}

export interface Template {
  id: string;
  name: string;
  animationType: AnimationType;
  colorTheme: ColorTheme;
  message: string;
  emoji: string;
  backgroundClass: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  emoji: string;
  accentColor: string;
  templates: Template[];
}

export const categories: Category[] = [
  {
    id: "diwali",
    name: "Diwali",
    slug: "diwali",
    description: "Light up the festival of lights",
    emoji: "🪔",
    accentColor: "#f59e0b",
    templates: [
      {
        id: "diwali-1",
        name: "Diya Flame",
        animationType: "particles",
        colorTheme: {
          bg: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fffbeb 100%)",
          accent: "#f59e0b",
          accent2: "#ef4444",
          text: "#78350f",
          card: "rgba(245,158,11,0.08)",
        },
        message: "Wishing you a Diwali as bright as the diyas that light up the night. May prosperity and joy fill every corner of your home. Happy Diwali! 🪔\n— {senderName}",
        emoji: "🪔",
        backgroundClass: "bg-diwali-1",
      },
      {
        id: "diwali-2",
        name: "Rangoli Dream",
        animationType: "sparkles",
        colorTheme: {
          bg: "linear-gradient(135deg, #fdf4ff 0%, #f3e8ff 50%, #fdf4ff 100%)",
          accent: "#a855f7",
          accent2: "#f59e0b",
          text: "#581c87",
          card: "rgba(168,85,247,0.08)",
        },
        message: "May the colours of Rangoli paint your life with happiness and your days with success. Wishing you a blessed Diwali! ✨\n— {senderName}",
        emoji: "🎨",
        backgroundClass: "bg-diwali-2",
      },
      {
        id: "diwali-3",
        name: "Golden Cracker",
        animationType: "fireworks",
        colorTheme: {
          bg: "linear-gradient(135deg, #fffbeb 0%, #fef9c3 50%, #fffbeb 100%)",
          accent: "#eab308",
          accent2: "#f97316",
          text: "#713f12",
          card: "rgba(234,179,8,0.08)",
        },
        message: "May this Diwali burst open the doors of joy and bring golden moments that last forever. Have a spectacular celebration! 🎆\n— {senderName}",
        emoji: "🎆",
        backgroundClass: "bg-diwali-3",
      },
    ],
  },

  {
    id: "eid",
    name: "Eid Mubarak",
    slug: "eid",
    description: "Blessed Eid greetings for everyone",
    emoji: "🌙",
    accentColor: "#10b981",
    templates: [
      {
        id: "eid-1",
        name: "Crescent Moon",
        animationType: "sparkles",
        colorTheme: {
          bg: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #ecfdf5 100%)",
          accent: "#10b981",
          accent2: "#f59e0b",
          text: "#064e3b",
          card: "rgba(16,185,129,0.08)",
        },
        message: "Eid Mubarak! May the crescent moon bring you peace, happiness and countless blessings. Wishing you and your family a joyful celebration! 🌙\n— {senderName}",
        emoji: "🌙",
        backgroundClass: "bg-eid-1",
      },
      {
        id: "eid-2",
        name: "Golden Lantern",
        animationType: "particles",
        colorTheme: {
          bg: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fffbeb 100%)",
          accent: "#f59e0b",
          accent2: "#10b981",
          text: "#78350f",
          card: "rgba(245,158,11,0.08)",
        },
        message: "May the light of a thousand lanterns guide your path to happiness and success. Wishing you a truly blessed Eid! ✨\n— {senderName}",
        emoji: "🏮",
        backgroundClass: "bg-eid-2",
      },
      {
        id: "eid-3",
        name: "Star & Moon",
        animationType: "confetti",
        colorTheme: {
          bg: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #eff6ff 100%)",
          accent: "#3b82f6",
          accent2: "#f59e0b",
          text: "#1e3a5f",
          card: "rgba(59,130,246,0.08)",
        },
        message: "As the stars and moon light up the sky, may Eid fill your heart with warmth and your home with love. Eid Mubarak! ⭐\n— {senderName}",
        emoji: "⭐",
        backgroundClass: "bg-eid-3",
      },
    ],
  },

  {
    id: "birthday",
    name: "Birthday",
    slug: "birthday",
    description: "Make their day extra special",
    emoji: "🎂",
    accentColor: "#ec4899",
    templates: [
      {
        id: "birthday-1",
        name: "Confetti Blast",
        animationType: "confetti",
        colorTheme: {
          bg: "linear-gradient(135deg, #fff1f2 0%, #ffe4e6 50%, #fff1f2 100%)",
          accent: "#f43f5e",
          accent2: "#f59e0b",
          text: "#881337",
          card: "rgba(244,63,94,0.08)",
        },
        message: "Happy Birthday! 🎉 Today is all about YOU! May every wish come true and every moment be filled with laughter, love and pure joy!\n— {senderName}",
        emoji: "🎉",
        backgroundClass: "bg-birthday-1",
      },
      {
        id: "birthday-2",
        name: "Balloon Fiesta",
        animationType: "particles",
        colorTheme: {
          bg: "linear-gradient(135deg, #eff6ff 0%, #e0f2fe 50%, #eff6ff 100%)",
          accent: "#3b82f6",
          accent2: "#ec4899",
          text: "#1e3a5f",
          card: "rgba(59,130,246,0.08)",
        },
        message: "Wishing you a birthday that floats as high as balloons! May your day be colourful, your heart be light, and your smile never fade. 🎈\n— {senderName}",
        emoji: "🎈",
        backgroundClass: "bg-birthday-2",
      },
      {
        id: "birthday-3",
        name: "Golden Candles",
        animationType: "candles",
        colorTheme: {
          bg: "linear-gradient(135deg, #fffbeb 0%, #fef9c3 50%, #fffbeb 100%)",
          accent: "#eab308",
          accent2: "#f97316",
          text: "#713f12",
          card: "rgba(234,179,8,0.08)",
        },
        message: "Make a wish! 🎂 Each candle on your cake represents a year of wonderful memories. May this year bring you more adventures than ever before!\n— {senderName}",
        emoji: "🎂",
        backgroundClass: "bg-birthday-3",
      },
    ],
  },

  {
    id: "christmas",
    name: "Christmas",
    slug: "christmas",
    description: "Warm and cosy festive greetings",
    emoji: "🎄",
    accentColor: "#ef4444",
    templates: [
      {
        id: "christmas-1",
        name: "Classic Pine",
        animationType: "particles",
        colorTheme: {
          bg: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%)",
          accent: "#16a34a",
          accent2: "#ef4444",
          text: "#14532d",
          card: "rgba(22,163,74,0.08)",
        },
        message: "Merry Christmas! 🎄 May your home be filled with warmth, your heart with love, and your holidays with the magic that only this season brings!\n— {senderName}",
        emoji: "🎄",
        backgroundClass: "bg-christmas-1",
      },
      {
        id: "christmas-2",
        name: "Snowy Wishes",
        animationType: "sparkles",
        colorTheme: {
          bg: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0f9ff 100%)",
          accent: "#0ea5e9",
          accent2: "#ffffff",
          text: "#0c4a6e",
          card: "rgba(14,165,233,0.08)",
        },
        message: "Like snowflakes, every Christmas moment is unique and beautiful. Wishing you a season sparkling with joy and a New Year full of promise! ❄️\n— {senderName}",
        emoji: "❄️",
        backgroundClass: "bg-christmas-2",
      },
      {
        id: "christmas-3",
        name: "Fireside Glow",
        animationType: "candles",
        colorTheme: {
          bg: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 50%, #fff7ed 100%)",
          accent: "#ea580c",
          accent2: "#eab308",
          text: "#7c2d12",
          card: "rgba(234,88,12,0.08)",
        },
        message: "May the warmth of the fireplace and the joy of the season surround you with comfort and cheer. Have a wonderfully cosy Christmas! 🔥\n— {senderName}",
        emoji: "🔥",
        backgroundClass: "bg-christmas-3",
      },
    ],
  },

  {
    id: "newyear",
    name: "New Year",
    slug: "newyear",
    description: "Ring in the new year with glittering wishes",
    emoji: "🎆",
    accentColor: "#6366f1",
    templates: [
      {
        id: "newyear-1",
        name: "Midnight Toast",
        animationType: "fireworks",
        colorTheme: {
          bg: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 50%, #eef2ff 100%)",
          accent: "#6366f1",
          accent2: "#f59e0b",
          text: "#312e81",
          card: "rgba(99,102,241,0.08)",
        },
        message: "As the clock strikes midnight, here's to new beginnings, fresh starts, and all the beautiful possibilities waiting ahead. Happy New Year! 🥂\n— {senderName}",
        emoji: "🥂",
        backgroundClass: "bg-newyear-1",
      },
      {
        id: "newyear-2",
        name: "Sparkling Dreams",
        animationType: "sparkles",
        colorTheme: {
          bg: "linear-gradient(135deg, #fdf4ff 0%, #f3e8ff 50%, #fdf4ff 100%)",
          accent: "#a855f7",
          accent2: "#f59e0b",
          text: "#581c87",
          card: "rgba(168,85,247,0.08)",
        },
        message: "May the New Year sparkle with moments of love, laughter, and unexpected magic. Wishing you a year that exceeds every dream! ✨\n— {senderName}",
        emoji: "✨",
        backgroundClass: "bg-newyear-2",
      },
      {
        id: "newyear-3",
        name: "City Lights",
        animationType: "confetti",
        colorTheme: {
          bg: "linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 50%, #f0fdfa 100%)",
          accent: "#0d9488",
          accent2: "#f59e0b",
          text: "#134e4a",
          card: "rgba(13,148,136,0.08)",
        },
        message: "From the glow of city lights to the warmth of shared moments — may your New Year be as bright and vibrant as the world around you! 🌆\n— {senderName}",
        emoji: "🌆",
        backgroundClass: "bg-newyear-3",
      },
    ],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getTemplateById(categorySlug: string, templateId: string): Template | undefined {
  const cat = getCategoryBySlug(categorySlug);
  return cat?.templates.find((t) => t.id === templateId);
}
