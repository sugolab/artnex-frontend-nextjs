import { create } from 'zustand';
import { BidReportState, BrandIdentityData, BrandManagementData } from '@/types/bid-report';

interface BidReportActions {
  updateBrandIdentity: (data: BrandIdentityData) => void;
  updateBrandManagement: (data: BrandManagementData) => void;
  updateBrandPlanning: (data: any) => void;
  updateCompetitorAnalysis: (data: any) => void;
  updateBrandLogo: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  resetStore: () => void;
  canProceedToNextStep: () => boolean;
  getReportData: () => any;
}

const initialState: BidReportState = {
  // Step 1: Brand Identity
  brandVision: '',
  brandSlogan: '',
  brandStory: '',
  
  // Step 2: Brand Management
  brandName: '',
  productNames: [],
  priceRangeMin: 0,
  priceRangeMax: 0,
  category: '',
  website: '',
  logo: null,
  targetGender: [],
  targetAgeRange: [],
  targetOccupation: [],
  targetIncome: [],
  buyingStyle: '',
  
  // Step 3: Brand Planning
  differentiationPoint: '',
  marketingChannels: [],
  brandTone: '',
  marketPosition: '',
  pricingStrategy: '',
  
  // Step 4: Competitor Analysis
  directCompetitors: [],
  indirectAlternatives: '',
  overlappingCustomers: '',
  competitiveAdvantage: '',
  uniqueValue: '',
  
  // Step 5: Brand Logo
  designStyle: '',
  brandColors: [],
  logoEmotion: '',
  logoDescription: '',
  referenceStyle: '',
  generatedImages: [],
  
  // Meta
  currentStep: 1,
  isSubmitting: false,
};

export const useBidReportStore = create<BidReportState & BidReportActions>((set, get) => ({
  ...initialState,

  updateBrandIdentity: (data: BrandIdentityData) => {
    set((state) => ({
      ...state,
      brandVision: data.brandVision,
      brandSlogan: data.brandSlogan,
      brandStory: data.brandStory,
    }));
  },

  updateBrandManagement: (data: BrandManagementData) => {
    set((state) => ({ ...state, ...data }));
  },

  updateBrandPlanning: (data: any) => {
    set((state) => ({ ...state, ...data }));
  },

  updateCompetitorAnalysis: (data: any) => {
    set((state) => ({ ...state, ...data }));
  },

  updateBrandLogo: (data: any) => {
    set((state) => ({ ...state, ...data }));
  },

  nextStep: () => {
    set((state) => ({
      currentStep: state.currentStep < 5 ? state.currentStep + 1 : state.currentStep,
    }));
  },

  prevStep: () => {
    set((state) => ({
      currentStep: state.currentStep > 1 ? state.currentStep - 1 : state.currentStep,
    }));
  },

  setIsSubmitting: (isSubmitting: boolean) => {
    set({ isSubmitting });
  },

  resetStore: () => {
    set(initialState);
  },

  canProceedToNextStep: () => {
    const state = get();
    switch (state.currentStep) {
      case 1:
        return !!(state.brandVision && state.brandSlogan && state.brandStory);
      case 2:
        return !!(
          state.brandName && 
          state.productNames.length > 0 && 
          state.priceRangeMin > 0 && 
          state.priceRangeMax > state.priceRangeMin &&
          state.category && 
          state.targetGender.length > 0 && 
          state.targetAgeRange.length > 0 && 
          state.buyingStyle
        );
      case 3:
        return !!(
          state.differentiationPoint && 
          state.marketingChannels.length > 0 &&
          state.brandTone && 
          state.marketPosition && 
          state.pricingStrategy
        );
      case 4:
        return !!(
          state.directCompetitors.length > 0 && 
          state.indirectAlternatives && 
          state.overlappingCustomers &&
          state.competitiveAdvantage && 
          state.uniqueValue
        );
      case 5:
        return !!(
          state.designStyle && 
          state.brandColors.length > 0 &&
          state.logoEmotion && 
          state.logoDescription
        );
      default:
        return false;
    }
  },

  getReportData: () => {
    const state = get();
    return {
      // Brand Identity
      brandVision: state.brandVision,
      brandSlogan: state.brandSlogan,
      brandStory: state.brandStory,
      
      // Brand Management
      brandName: state.brandName,
      productNames: state.productNames,
      priceRange: {
        min: state.priceRangeMin,
        max: state.priceRangeMax
      },
      category: state.category,
      website: state.website,
      targetAudience: {
        gender: state.targetGender,
        ageRange: state.targetAgeRange,
        occupation: state.targetOccupation,
        income: state.targetIncome,
        buyingStyle: state.buyingStyle
      },
      
      // Brand Planning
      differentiationPoint: state.differentiationPoint,
      marketingChannels: state.marketingChannels,
      brandTone: state.brandTone,
      marketPosition: state.marketPosition,
      pricingStrategy: state.pricingStrategy,
      
      // Competitor Analysis
      competitorAnalysis: {
        directCompetitors: state.directCompetitors,
        indirectAlternatives: state.indirectAlternatives,
        overlappingCustomers: state.overlappingCustomers,
        competitiveAdvantage: state.competitiveAdvantage,
        uniqueValue: state.uniqueValue
      },
      
      // Brand Logo
      logoDesign: {
        designStyle: state.designStyle,
        brandColors: state.brandColors,
        logoEmotion: state.logoEmotion,
        logoDescription: state.logoDescription,
        referenceStyle: state.referenceStyle,
        generatedImages: state.generatedImages
      }
    };
  },
}));