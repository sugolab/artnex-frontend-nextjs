export interface BidReportState {
  // Step 1: Brand Identity
  brandVision: string;
  brandSlogan: string;
  brandStory: string;
  
  // Step 2: Brand Management
  brandName: string;
  productNames: string[];
  priceRangeMin: number;
  priceRangeMax: number;
  category: string;
  website: string;
  logo: File | null;
  targetGender: string[];
  targetAgeRange: string[];
  targetOccupation: string[];
  targetIncome: string[];
  buyingStyle: string;
  
  // Step 3: Brand Planning
  differentiationPoint: string;
  marketingChannels: string[];
  brandTone: string;
  marketPosition: string;
  pricingStrategy: string;
  
  // Step 4: Competitor Analysis
  directCompetitors: Array<{
    name: string;
    strengths: string;
    weaknesses: string;
  }>;
  indirectAlternatives: string;
  overlappingCustomers: string;
  competitiveAdvantage: string;
  uniqueValue: string;
  
  // Step 5: Brand Logo
  designStyle: string;
  brandColors: string[];
  logoEmotion: string;
  logoDescription: string;
  referenceStyle: string;
  generatedImages: string[];
  
  // Meta
  currentStep: number;
  isSubmitting: boolean;
}

export interface BrandIdentityData {
  brandVision: string;
  brandSlogan: string;
  brandStory: string;
}

export interface BrandManagementData {
  brandName: string;
  productNames: string[];
  priceRangeMin: number;
  priceRangeMax: number;
  category: string;
  website: string;
  logo: File | null;
  targetGender: string[];
  targetAgeRange: string[];
  targetOccupation: string[];
  targetIncome: string[];
  buyingStyle: string;
}