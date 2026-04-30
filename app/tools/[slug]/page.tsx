import { notFound } from "next/navigation";
import { ToolCalculator } from "../../../components/tools/ToolCalculator";
import { ToolContent } from "../../../components/tools/ToolContent";
import { ToolTrustPanel } from "../../../components/tools/ToolTrustPanel";
import { RelatedTools } from "../../../components/tools/RelatedTools";
import {
  getToolDefinitionBySlug,
  toolDefinitions,
} from "../../../lib/tools/tool-registry";
import {
  createToolBreadcrumbSchema,
  createToolFaqSchema,
  createToolSoftwareSchema,
} from "../../../lib/seo/schema";
import { siteConfig } from "../../../lib/site";

type ToolPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return toolDefinitions.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolDefinitionBySlug(slug);

  if (!tool) {
    return {
      title: "Tool Not Found",
    };
  }

  const canonicalUrl = `${siteConfig.url}${tool.seo.canonicalPath}`;

  return {
    title: tool.seo.title,
    description: tool.seo.description,
    alternates: {
      canonical: tool.seo.canonicalPath,
    },
    openGraph: {
      title: tool.seo.title,
      description: tool.seo.description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: tool.seo.title,
      description: tool.seo.description,
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolDefinitionBySlug(slug);

  if (!tool) {
    notFound();
  }

  const schemas = [
    createToolFaqSchema(tool),
    createToolBreadcrumbSchema(tool),
    createToolSoftwareSchema(tool),
  ];

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas),
        }}
      />

      <section className="mb-10">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-amber-300">
          {tool.shortName} calculator
        </p>

        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-stone-50">
          {tool.name}
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-300">
          {tool.description}
        </p>
      </section>

      <ToolCalculator toolSlug={tool.slug} />

      <ToolTrustPanel tool={tool} />

      <ToolContent tool={tool} />

      <RelatedTools tool={tool} />
    </main>
  );
}