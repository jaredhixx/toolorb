export type ToolSchemaApplicationCategory =
  | "FinanceApplication"
  | "BusinessApplication"
  | "ProductivityApplication"
  | "EducationalApplication"
  | "HealthApplication"
  | "LifestyleApplication"
  | "UtilityApplication"
  | "WebApplication";

export type ToolSeoSchema = {
  applicationCategory?: ToolSchemaApplicationCategory;
  operatingSystem?: string;
  price?: string;
  priceCurrency?: string;
  isAccessibleForFree?: boolean;
};

export type ToolSeo = {
  title: string;
  description: string;
  canonicalPath: string;
  schema?: ToolSeoSchema;
};

export type ToolMeta = {
  category: string;
  cluster: string;
  relatedToolSlugs: string[];
  lastUpdated: string;
};