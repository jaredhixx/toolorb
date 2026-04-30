import type { ToolDefinition } from "../tools/tool-types";
import type { ToolSchemaApplicationCategory } from "../tools/tool-seo-types";
import { siteConfig } from "../site";

function getToolUrl(tool: ToolDefinition): string {
  return `${siteConfig.url}${tool.seo.canonicalPath}`;
}

function createOrganizationSchema() {
  return {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  };
}

function getToolApplicationCategory(
  tool: ToolDefinition,
): ToolSchemaApplicationCategory {
  if (tool.seo.schema?.applicationCategory) {
    return tool.seo.schema.applicationCategory;
  }

  const normalizedCategory = tool.meta.category.toLowerCase();

  if (normalizedCategory.includes("finance")) {
    return "FinanceApplication";
  }

  if (normalizedCategory.includes("business")) {
    return "BusinessApplication";
  }

  if (normalizedCategory.includes("productivity")) {
    return "ProductivityApplication";
  }

  if (normalizedCategory.includes("education")) {
    return "EducationalApplication";
  }

  if (normalizedCategory.includes("health")) {
    return "HealthApplication";
  }

  if (normalizedCategory.includes("lifestyle")) {
    return "LifestyleApplication";
  }

  return "UtilityApplication";
}

export function createToolFaqSchema(tool: ToolDefinition) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: tool.content.faqs.title,
    mainEntityOfPage: getToolUrl(tool),
    inLanguage: "en-US",
    mainEntity: tool.content.faqs.items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function createToolBreadcrumbSchema(tool: ToolDefinition) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${siteConfig.url}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.name,
        item: getToolUrl(tool),
      },
    ],
  };
}

export function createToolSoftwareSchema(tool: ToolDefinition) {
return {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: tool.name,
  applicationCategory: getToolApplicationCategory(tool),
  applicationSubCategory: tool.meta.category,
    operatingSystem: tool.seo.schema?.operatingSystem ?? "Web",
    url: getToolUrl(tool),
    description: tool.seo.description,
    dateModified: tool.meta.lastUpdated,
    inLanguage: "en-US",
    mainEntityOfPage: getToolUrl(tool),
    publisher: createOrganizationSchema(),
    provider: createOrganizationSchema(),
    isAccessibleForFree: tool.seo.schema?.isAccessibleForFree ?? true,
    offers: {
      "@type": "Offer",
      price: tool.seo.schema?.price ?? "0",
      priceCurrency: tool.seo.schema?.priceCurrency ?? "USD",
    },
  };
}
