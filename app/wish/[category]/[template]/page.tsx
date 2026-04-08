import { notFound } from "next/navigation";
import { categories, getCategoryBySlug, getTemplateById } from "@/lib/data";
import WishClient from "@/components/WishClient";

interface Props {
  params: Promise<{ category: string; template: string }>;
  searchParams: Promise<{ name?: string; from?: string }>;
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

export async function generateMetadata({ params, searchParams }: Props) {
  const { category, template } = await params;
  const { name, from } = await searchParams;
  const tpl = getTemplateById(category, template);
  if (!tpl) return {};
  const sender = name ? decodeURIComponent(name) : from ? decodeURIComponent(from) : "Someone";
  return {
    title: `${sender} sent you a ${tpl.name} wish — WishCraft`,
    description: tpl.message.replace("{senderName}", sender).split("\n")[0],
  };
}

export default async function WishPage({ params, searchParams }: Props) {
  const { category, template } = await params;
  const { name, from } = await searchParams;

  const cat = getCategoryBySlug(category);
  const tpl = getTemplateById(category, template);
  if (!cat || !tpl) notFound();

  const senderName = name
    ? decodeURIComponent(name)
    : from
    ? decodeURIComponent(from)
    : "Someone Special";

  return <WishClient template={tpl} categorySlug={cat.slug} senderName={senderName} />;
}
