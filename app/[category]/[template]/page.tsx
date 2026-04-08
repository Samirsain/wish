import { notFound } from "next/navigation";
import Link from "next/link";
import { categories, getCategoryBySlug, getTemplateById } from "@/lib/data";
import NameInputForm from "@/components/NameInputForm";

interface Props {
  params: Promise<{ category: string; template: string }>;
}

export async function generateStaticParams() {
  const paths: { category: string; template: string }[] = [];
  categories.forEach((cat) =>
    cat.templates.forEach((tpl) =>
      paths.push({ category: cat.slug, template: tpl.id })
    )
  );
  return paths;
}

export async function generateMetadata({ params }: Props) {
  const { category, template } = await params;
  const tpl = getTemplateById(category, template);
  if (!tpl) return {};
  return {
    title: `${tpl.name} — WishCraft`,
    description: `Personalise the ${tpl.name} greeting card and share it instantly.`,
  };
}

export default async function TemplatePage({ params }: Props) {
  const { category, template } = await params;
  const cat = getCategoryBySlug(category);
  const tpl = getTemplateById(category, template);
  if (!cat || !tpl) notFound();

  return (
    <div className="page-enter min-h-screen px-4 py-12" style={{ background: "#f8f8fc" }}>
      <div className="max-w-lg mx-auto">

        {/* Back */}
        <Link
          href={`/${category}`}
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
            background: "#ffffff",
            border: "1px solid rgba(0,0,0,0.07)",
            transition: "all 0.2s ease",
          }}
        >
          ← {cat.name} templates
        </Link>

        {/* Template preview header */}
        <div
          style={{
            borderRadius: "20px",
            padding: "2rem",
            textAlign: "center",
            marginBottom: "1.75rem",
            background: tpl.colorTheme.bg,
            border: `1.5px solid ${tpl.colorTheme.accent}25`,
            boxShadow: `0 4px 24px ${tpl.colorTheme.accent}15`,
          }}
        >
          <span style={{ fontSize: "3.5rem", display: "block", marginBottom: "0.75rem" }}>{tpl.emoji}</span>
          <h1
            className="font-display"
            style={{ fontSize: "1.5rem", fontWeight: 700, color: tpl.colorTheme.text, marginBottom: "0.3rem" }}
          >
            {tpl.name}
          </h1>
          <p style={{ fontSize: "0.82rem", color: tpl.colorTheme.accent, fontWeight: 500 }}>
            {cat.name} · {tpl.animationType} animation
          </p>
        </div>

        {/* Name form */}
        <NameInputForm template={tpl} categorySlug={cat.slug} />
      </div>
    </div>
  );
}
