import type { ToolDefinition } from "../../tool-types";
import { starterRuntime } from "./_starter-runtime";

export const starterCalculator: ToolDefinition = {
  slug: starterRuntime.slug,
  fields: starterRuntime.fields,
  calculate: starterRuntime.calculate,

  name: "Starter Tool",
  shortName: "Starter",
  description: "Template tool.",

  seo: {
    title: "Starter Tool | Toolorb",
    description:
      "Template description for SEO purposes that must be between 120 and 170 characters long for validation.",
    canonicalPath: "/tools/starter-tool",
  },

  meta: {
    category: "Finance",
    cluster: "Starter",
    relatedToolSlugs: [],
    lastUpdated: "2026-04-30",
  },

  contentTokens: {},

  content: {
    overview: {
      title: "Overview",
      body:
        "This is a template overview that meets the minimum word count requirement for validation. It should be replaced with real content when creating a new tool to ensure proper SEO and clarity for users. Use this section to explain what the tool does, who it helps, when to use it, and how the result should be interpreted before making a decision.",
    },
    keyTakeaways: {
      title: "Key takeaways",
      items: [
        "Replace this takeaway with a specific, helpful point about the tool.",
        "Replace this takeaway with a second useful point tied to the result.",
        "Replace this takeaway with a third point that helps users make a better decision.",
      ],
    },

    commonMistakes: {
      title: "Common mistakes to avoid",
      items: [
        {
          title: "Only looking at the headline result",
          description:
            "Replace this with a mistake users commonly make when interpreting this calculator's result.",
        },
        {
          title: "Ignoring the assumptions behind the estimate",
          description:
            "Replace this with a reminder about inputs, assumptions, limits, or edge cases for this tool.",
        },
        {
          title: "Comparing results without using the same inputs",
          description:
            "Replace this with guidance about making fair comparisons across scenarios.",
        },
      ],
    },

    faqs: {
      title: "Frequently asked questions",
      items: [
        {
          question: "What does this tool estimate?",
          answer:
            "Replace this with a clear answer explaining what the tool estimates and how users should interpret the result.",
        },
        {
          question: "Is this result exact?",
          answer:
            "Replace this with a clear answer explaining the limits of the estimate and what users should verify separately.",
        },
      ],
    },
  },
};