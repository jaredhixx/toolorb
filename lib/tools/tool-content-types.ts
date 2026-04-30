export type ToolContentSection = {
  title: string;
  body: string;
};

export type ToolFaqItem = {
  question: string;
  answer: string;
};

export type ToolExample = {
  title: string;
  description: string;
};

export type ToolListSection = {
  title: string;
  items: string[];
};

export type ToolExampleSection = {
  title: string;
  items: ToolExample[];
};

export type ToolComparisonRow = {
  label: string;
  value: string;
  helperText?: string;
};

export type ToolDecisionGuideItem = {
  title: string;
  description: string;
};

export type ToolDefinitionItem = {
  term: string;
  definition: string;
};

export type ToolRelatedDecision = {
  eyebrow: string;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
};

export type ToolFaqSection = {
  title: string;
  items: ToolFaqItem[];
};

export type ToolComparisonSection = {
  title: string;
  description: string;
  rows: ToolComparisonRow[];
};

export type ToolResultGuidanceSection = {
  title: string;
  description: string;
  goodResults?: ToolDecisionGuideItem[];
  cautionResults?: ToolDecisionGuideItem[];
  improvementTips?: ToolDecisionGuideItem[];
};

export type ToolDecisionGuideSection = {
  title: string;
  description?: string;
  items: ToolDecisionGuideItem[];
};

export type ToolDefinitionSection = {
  title: string;
  description?: string;
  items: ToolDefinitionItem[];
};

export type ToolContent = {
  overview: ToolContentSection;
  keyTakeaways: ToolListSection;
  faqs: ToolFaqSection;
  commonMistakes: ToolDecisionGuideSection;

  formula?: ToolContentSection;
  examples?: ToolExampleSection;
  comparison?: ToolComparisonSection;
  assumptions?: ToolListSection;
  methodology?: ToolListSection;
  steps?: ToolListSection;
  resultGuidance?: ToolResultGuidanceSection;
  definitions?: ToolDefinitionSection;
  relatedDecision?: ToolRelatedDecision;
};
