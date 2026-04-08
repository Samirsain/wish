import { notFound } from "next/navigation";
import Link from "next/link";
import { categories, getCategoryBySlug } from "@/lib/data";
import TemplateCard from "@/components/TemplateCard";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};
  return {
    title: `${cat.name} Cards — WishCraft`,
    description: `Choose from 3 beautiful ${cat.name} greeting card templates.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  return (
    <div className="page-enter min-h-screen px-4 py-12" style={{ background: "#ffffff" }}>
      <div className="max-w-4xl mx-auto">

        {/* Back */}
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.85rem",
            color: "#9ca3af",
            textDecoration: "none",
            marginBottom: "2rem",
            padding: "0.4rem 0.9rem",
            borderRadius: "100px",
            background: "#f5f5f8",
            border: "1px solid rgba(0,0,0,0.06)",
            transition: "all 0.2s ease",
          }}
        >
          ← All occasions
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div style={{ fontSize: "4rem", marginBottom: "1rem", display: "block" }}>{cat.emoji}</div>
          <h1
            className="font-display"
            style={{ fontSize: "2.25rem", fontWeight: 800, color: "#1a1a2e", marginBottom: "0.5rem" }}
          >
            {cat.name}
          </h1>
          <p style={{ color: "#9ca3af", marginBottom: "0.4rem" }}>{cat.description}</p>
          <p style={{ fontSize: "0.85rem", color: "#d1d5db" }}>Pick a template to get started</p>

          {/* Accent bar */}
          <div style={{
            width: "48px",
            height: "3px",
            background: `linear-gradient(90deg, ${cat.accentColor}, ${cat.accentColor}80)`,
            borderRadius: "2px",
            margin: "1.25rem auto 0",
          }} />
        </div>

        {/* Template grid */}
        <div className="grid sm:grid-cols-3 gap-6">
          {cat.templates.map((tpl) => (
            <TemplateCard key={tpl.id} template={tpl} categorySlug={cat.slug} />
          ))}
        </div>

        {/* Footer note */}
        <p style={{ textAlign: "center", marginTop: "3rem", fontSize: "0.8rem", color: "#d1d5db" }}>
          ✦ All cards are free · No account needed · Share instantly
        </p>
      </div>
    </div>
  );
}
