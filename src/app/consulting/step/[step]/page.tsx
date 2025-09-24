'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, TextBox, Logo } from '@/components/common';
import { GNB, Footer } from '@/components/layout';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ConsultingData {
  // Step 1: 기업 기본 정보
  companyName?: string;
  industry?: string;
  companySize?: string;
  establishedYear?: string;
  annualRevenue?: string;
  
  // Step 2: 브랜드 현황
  currentBrandPosition?: string;
  brandChallenges?: string;
  brandGoals?: string;
  competitorAnalysis?: string;
  
  // Step 3: 타겟 고객
  targetAudience?: string;
  customerNeeds?: string;
  customerJourney?: string;
  marketSegment?: string;
  
  // Step 4: 마케팅 현황
  currentMarketingChannels?: string[];
  marketingBudget?: string;
  marketingGoals?: string;
  campaignPerformance?: string;
  
  // Step 5: 기대 성과
  expectedOutcomes?: string[];
  successMetrics?: string;
  timeframe?: string;
  budgetRange?: string;
}

const industryOptions = [
  '기술/IT', '제조업', '서비스업', '유통/소매', '금융', 
  '의료/헬스케어', '교육', '엔터테인먼트', '식품/음료', 
  '패션/뷰티', '부동산', '컨설팅', '기타'
];

const companySizeOptions = [
  '1-10명 (스타트업)', '11-50명 (소기업)', '51-200명 (중소기업)', 
  '201-1000명 (중견기업)', '1000명 이상 (대기업)'
];

const marketingChannelOptions = [
  '소셜미디어', '검색엔진마케팅', '콘텐츠마케팅', '이메일마케팅', 
  '디스플레이광고', '영향력자마케팅', '오프라인광고', '이벤트/세미나'
];

const expectedOutcomeOptions = [
  '브랜드 인지도 향상', '매출 증대', '고객 확보', '시장 점유율 확대',
  '브랜드 이미지 개선', '고객 충성도 향상', '새로운 시장 진출', '경쟁 우위 확보'
];

export default function ConsultingStepPage() {
  const params = useParams();
  const router = useRouter();
  const currentStep = parseInt(params.step as string);
  const totalSteps = 5;
  
  const [isLoading, setIsLoading] = useState(false);
  const [consultingData, setConsultingData] = useState<ConsultingData>({});

  useEffect(() => {
    if (currentStep < 1 || currentStep > totalSteps) {
      router.replace('/consulting/step/1');
    }
  }, [currentStep, router]);

  const handleInputChange = (field: keyof ConsultingData, value: string | string[]) => {
    setConsultingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayToggle = (field: keyof ConsultingData, value: string) => {
    const currentArray = (consultingData[field] as string[]) || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    handleInputChange(field, newArray);
  };

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!(consultingData.companyName && consultingData.industry && consultingData.companySize);
      case 2:
        return !!(consultingData.currentBrandPosition && consultingData.brandChallenges);
      case 3:
        return !!(consultingData.targetAudience && consultingData.customerNeeds);
      case 4:
        return !!(consultingData.currentMarketingChannels?.length && consultingData.marketingGoals);
      case 5:
        return !!(consultingData.expectedOutcomes?.length && consultingData.timeframe);
      default:
        return true;
    }
  };

  const handleNext = async () => {
    if (!validateCurrentStep()) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (currentStep < totalSteps) {
        router.push(`/consulting/step/${currentStep + 1}`);
      } else {
        // 마지막 단계 완료 - 결과 페이지로 이동
        console.log('Consulting Data:', consultingData);
        router.push('/consulting/result');
      }
    } catch (error) {
      console.error('Step navigation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      router.push(`/consulting/step/${currentStep - 1}`);
    } else {
      router.push('/consulting');
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-noto-bold text-black mb-2">기업 기본 정보</h2>
        <p className="text-gray-600 font-noto-medium">귀하의 기업에 대한 기본 정보를 입력해주세요</p>
      </div>

      <TextBox
        placeholder="회사명을 입력하세요"
        value={consultingData.companyName || ''}
        onChange={(e) => handleInputChange('companyName', e.target.value)}
      />

      <div>
        <label className="block text-sm font-noto-medium text-gray-700 mb-2">업종 *</label>
        <select
          value={consultingData.industry || ''}
          onChange={(e) => handleInputChange('industry', e.target.value)}
          className="w-full h-[50px] px-4 border border-gray-300 rounded-lg font-noto-medium focus:outline-none focus:border-black"
        >
          <option value="">업종을 선택하세요</option>
          {industryOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-noto-medium text-gray-700 mb-2">기업 규모 *</label>
        <select
          value={consultingData.companySize || ''}
          onChange={(e) => handleInputChange('companySize', e.target.value)}
          className="w-full h-[50px] px-4 border border-gray-300 rounded-lg font-noto-medium focus:outline-none focus:border-black"
        >
          <option value="">기업 규모를 선택하세요</option>
          {companySizeOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <TextBox
        placeholder="설립년도 (예: 2020)"
        value={consultingData.establishedYear || ''}
        onChange={(e) => handleInputChange('establishedYear', e.target.value)}
      />

      <TextBox
        placeholder="연간 매출 (선택사항, 예: 10억원)"
        value={consultingData.annualRevenue || ''}
        onChange={(e) => handleInputChange('annualRevenue', e.target.value)}
      />
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-noto-bold text-black mb-2">브랜드 현황 분석</h2>
        <p className="text-gray-600 font-noto-medium">현재 브랜드 상태와 과제를 분석해주세요</p>
      </div>

      <div>
        <label className="block text-sm font-noto-medium text-gray-700 mb-2">현재 브랜드 포지션 *</label>
        <textarea
          placeholder="시장에서 귀하의 브랜드가 어떻게 인식되고 있는지 설명해주세요"
          value={consultingData.currentBrandPosition || ''}
          onChange={(e) => handleInputChange('currentBrandPosition', e.target.value)}
          className="w-full h-[120px] p-4 border border-gray-300 rounded-lg font-noto-medium resize-none focus:outline-none focus:border-black"
        />
      </div>

      <div>
        <label className="block text-sm font-noto-medium text-gray-700 mb-2">브랜드 과제 및 문제점 *</label>
        <textarea
          placeholder="현재 직면하고 있는 브랜딩 관련 과제나 문제점을 설명해주세요"
          value={consultingData.brandChallenges || ''}
          onChange={(e) => handleInputChange('brandChallenges', e.target.value)}
          className="w-full h-[120px] p-4 border border-gray-300 rounded-lg font-noto-medium resize-none focus:outline-none focus:border-black"
        />
      </div>

      <div>
        <label className="block text-sm font-noto-medium text-gray-700 mb-2">브랜딩 목표</label>
        <textarea
          placeholder="브랜딩을 통해 달성하고자 하는 목표를 설명해주세요"
          value={consultingData.brandGoals || ''}
          onChange={(e) => handleInputChange('brandGoals', e.target.value)}
          className="w-full h-[120px] p-4 border border-gray-300 rounded-lg font-noto-medium resize-none focus:outline-none focus:border-black"
        />
      </div>

      <div>
        <label className="block text-sm font-noto-medium text-gray-700 mb-2">경쟁사 분석</label>
        <textarea
          placeholder="주요 경쟁사와 그들 대비 귀하의 차별점을 설명해주세요"
          value={consultingData.competitorAnalysis || ''}
          onChange={(e) => handleInputChange('competitorAnalysis', e.target.value)}
          className="w-full h-[120px] p-4 border border-gray-300 rounded-lg font-noto-medium resize-none focus:outline-none focus:border-black"
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-noto-bold text-black mb-2">타겟 고객 분석</h2>
        <p className="text-gray-600 font-noto-medium">목표 고객에 대해 자세히 분석해주세요</p>
      </div>

      <div>
        <label className="block text-sm font-noto-medium text-gray-700 mb-2">주요 타겟 고객 *</label>
        <textarea
          placeholder="주요 고객층의 특성을 구체적으로 설명해주세요 (연령, 성별, 직업, 관심사 등)"
          value={consultingData.targetAudience || ''}
          onChange={(e) => handleInputChange('targetAudience', e.target.value)}
          className="w-full h-[120px] p-4 border border-gray-300 rounded-lg font-noto-medium resize-none focus:outline-none focus:border-black"
        />
      </div>

      <div>
        <label className="block text-sm font-noto-medium text-gray-700 mb-2">고객 니즈 및 페인포인트 *</label>
        <textarea
          placeholder="고객들이 가지고 있는 주요 니즈와 해결하고 싶어하는 문제점을 설명해주세요"
          value={consultingData.customerNeeds || ''}
          onChange={(e) => handleInputChange('customerNeeds', e.target.value)}
          className="w-full h-[120px] p-4 border border-gray-300 rounded-lg font-noto-medium resize-none focus:outline-none focus:border-black"
        />
      </div>

      <div>
        <label className="block text-sm font-noto-medium text-gray-700 mb-2">고객 구매 여정</label>
        <textarea
          placeholder="고객이 인지부터 구매까지 거치는 과정을 설명해주세요"
          value={consultingData.customerJourney || ''}
          onChange={(e) => handleInputChange('customerJourney', e.target.value)}
          className="w-full h-[120px] p-4 border border-gray-300 rounded-lg font-noto-medium resize-none focus:outline-none focus:border-black"
        />
      </div>

      <div>
        <label className="block text-sm font-noto-medium text-gray-700 mb-2">시장 세분화</label>
        <textarea
          placeholder="타겟 시장을 어떻게 세분화하고 있는지 설명해주세요"
          value={consultingData.marketSegment || ''}
          onChange={(e) => handleInputChange('marketSegment', e.target.value)}
          className="w-full h-[120px] p-4 border border-gray-300 rounded-lg font-noto-medium resize-none focus:outline-none focus:border-black"
        />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-noto-bold text-black mb-2">마케팅 현황</h2>
        <p className="text-gray-600 font-noto-medium">현재 마케팅 활동과 성과를 분석해주세요</p>
      </div>

      <div>
        <label className="block text-sm font-noto-medium text-gray-700 mb-4">현재 활용 중인 마케팅 채널 * (복수 선택 가능)</label>
        <div className="grid grid-cols-2 gap-3">
          {marketingChannelOptions.map(channel => (
            <button
              key={channel}
              onClick={() => handleArrayToggle('currentMarketingChannels', channel)}
              className={`p-3 rounded-lg border-2 font-noto-medium transition-all ${
                (consultingData.currentMarketingChannels || []).includes(channel)
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              {channel}
            </button>
          ))}
        </div>
      </div>

      <TextBox
        placeholder="월간 마케팅 예산 (예: 500만원)"
        value={consultingData.marketingBudget || ''}
        onChange={(e) => handleInputChange('marketingBudget', e.target.value)}
      />

      <div>
        <label className="block text-sm font-noto-medium text-gray-700 mb-2">마케팅 목표 *</label>
        <textarea
          placeholder="마케팅을 통해 달성하고자 하는 구체적인 목표를 설명해주세요"
          value={consultingData.marketingGoals || ''}
          onChange={(e) => handleInputChange('marketingGoals', e.target.value)}
          className="w-full h-[120px] p-4 border border-gray-300 rounded-lg font-noto-medium resize-none focus:outline-none focus:border-black"
        />
      </div>

      <div>
        <label className="block text-sm font-noto-medium text-gray-700 mb-2">캠페인 성과 분석</label>
        <textarea
          placeholder="최근 마케팅 캠페인의 성과와 인사이트를 공유해주세요"
          value={consultingData.campaignPerformance || ''}
          onChange={(e) => handleInputChange('campaignPerformance', e.target.value)}
          className="w-full h-[120px] p-4 border border-gray-300 rounded-lg font-noto-medium resize-none focus:outline-none focus:border-black"
        />
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-noto-bold text-black mb-2">기대 성과 및 계획</h2>
        <p className="text-gray-600 font-noto-medium">컨설팅을 통해 기대하는 성과와 실행 계획을 설정해주세요</p>
      </div>

      <div>
        <label className="block text-sm font-noto-medium text-gray-700 mb-4">기대하는 성과 * (복수 선택 가능)</label>
        <div className="grid grid-cols-2 gap-3">
          {expectedOutcomeOptions.map(outcome => (
            <button
              key={outcome}
              onClick={() => handleArrayToggle('expectedOutcomes', outcome)}
              className={`p-3 rounded-lg border-2 font-noto-medium transition-all ${
                (consultingData.expectedOutcomes || []).includes(outcome)
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              {outcome}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-noto-medium text-gray-700 mb-2">성공 지표</label>
        <textarea
          placeholder="성과를 측정할 수 있는 구체적인 지표들을 설명해주세요 (예: 브랜드 인지도 20% 향상, 매출 30% 증가 등)"
          value={consultingData.successMetrics || ''}
          onChange={(e) => handleInputChange('successMetrics', e.target.value)}
          className="w-full h-[120px] p-4 border border-gray-300 rounded-lg font-noto-medium resize-none focus:outline-none focus:border-black"
        />
      </div>

      <div>
        <label className="block text-sm font-noto-medium text-gray-700 mb-2">실행 기간 *</label>
        <select
          value={consultingData.timeframe || ''}
          onChange={(e) => handleInputChange('timeframe', e.target.value)}
          className="w-full h-[50px] px-4 border border-gray-300 rounded-lg font-noto-medium focus:outline-none focus:border-black"
        >
          <option value="">실행 기간을 선택하세요</option>
          <option value="3개월">3개월</option>
          <option value="6개월">6개월</option>
          <option value="1년">1년</option>
          <option value="1년 이상">1년 이상</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-noto-medium text-gray-700 mb-2">투자 예산 범위</label>
        <select
          value={consultingData.budgetRange || ''}
          onChange={(e) => handleInputChange('budgetRange', e.target.value)}
          className="w-full h-[50px] px-4 border border-gray-300 rounded-lg font-noto-medium focus:outline-none focus:border-black"
        >
          <option value="">예산 범위를 선택하세요</option>
          <option value="1000만원 미만">1000만원 미만</option>
          <option value="1000만원 - 5000만원">1000만원 - 5000만원</option>
          <option value="5000만원 - 1억원">5000만원 - 1억원</option>
          <option value="1억원 이상">1억원 이상</option>
        </select>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      default: return renderStep1();
    }
  };

  if (currentStep < 1 || currentStep > totalSteps) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <GNB />

      {/* Progress Bar */}
      <div className="bg-gray-50 py-6">
        <div className="max-w-4xl mx-auto px-5">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-noto-bold text-black">브랜드 컨설팅</h1>
            <span className="text-sm font-noto-medium text-gray-600">
              {currentStep}/{totalSteps}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-5 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-12">
            <Logo size="large" />
          </div>

          {/* Step Content */}
          {renderCurrentStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12">
            <Button
              variant="outlined"
              onClick={handlePrevious}
              className="w-[200px] flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              이전
            </Button>
            
            <Button
              onClick={handleNext}
              loading={isLoading}
              className="w-[200px] flex items-center justify-center gap-2"
            >
              {currentStep === totalSteps ? '분석 완료' : '다음'}
              {currentStep < totalSteps && <ChevronRight className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}