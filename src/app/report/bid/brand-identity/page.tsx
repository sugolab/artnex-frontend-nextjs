'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { GNB, Footer } from '@/components/layout';
import { useBidReportStore } from '@/store/bid-report';

const brandIdentitySchema = z.object({
  brandVision: z.string().min(1, '브랜드 비전을 입력해주세요'),
  brandSlogan: z.string().min(1, '브랜드 슬로건을 입력해주세요'),
  brandStory: z.string().min(1, '브랜드 스토리를 입력해주세요'),
});

type BrandIdentityFormData = z.infer<typeof brandIdentitySchema>;

export default function BrandIdentityPage() {
  const router = useRouter();
  const {
    brandVision,
    brandSlogan,
    brandStory,
    currentStep,
    updateBrandIdentity,
    nextStep,
    canProceedToNextStep
  } = useBidReportStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BrandIdentityFormData>({
    resolver: zodResolver(brandIdentitySchema),
    defaultValues: {
      brandVision,
      brandSlogan,
      brandStory,
    },
  });

  const isFormValid = canProceedToNextStep();

  const onSubmit = (data: BrandIdentityFormData) => {
    updateBrandIdentity(data);
    nextStep();
    router.push('/report/bid/brand-management');
  };

  return (
    <div className="min-h-screen bg-white" style={{ height: '1633px' }}>
      {/* GNB - 1920×90 */}
      <GNB />

      {/* Process Indicator - 1560×70 */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-[1560px] mx-auto px-4" style={{ height: '70px' }}>
          <div className="flex items-center justify-center h-full">
            <div className="flex items-center space-x-8">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 5 && (
                    <div className={`w-12 h-0.5 mx-2 ${
                      step < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex max-w-[1920px] mx-auto">
        {/* LNB - Left Navigation - 360×1453 */}
        <div className="bg-white border-r" style={{ width: '360px', height: '1453px' }}>
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">BID Report</h2>
            <nav className="space-y-2">
              <div className={`p-3 rounded-md text-sm font-medium ${
                currentStep === 1 ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700' : 'text-gray-600 hover:bg-gray-50'
              }`}>
                01. Brand Identity
              </div>
              <div className={`p-3 rounded-md text-sm font-medium ${
                currentStep === 2 ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700' : 'text-gray-600 hover:bg-gray-50'
              }`}>
                02. Brand&apos;s Management
              </div>
              <div className={`p-3 rounded-md text-sm font-medium ${
                currentStep === 3 ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700' : 'text-gray-600 hover:bg-gray-50'
              }`}>
                03. Brand Planning
              </div>
              <div className={`p-3 rounded-md text-sm font-medium ${
                currentStep === 4 ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700' : 'text-gray-600 hover:bg-gray-50'
              }`}>
                04. Competitor Analysis
              </div>
              <div className={`p-3 rounded-md text-sm font-medium ${
                currentStep === 5 ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700' : 'text-gray-600 hover:bg-gray-50'
              }`}>
                05. Brand Logo
              </div>
            </nav>
          </div>
        </div>

        {/* Frame 290 - Main Content - 1150×1343 */}
        <div className="bg-white" style={{ width: '1150px', height: '1343px' }}>
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">01. Brand Identity</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Brand Vision */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  브랜드 비전
                </label>
                <p className="text-sm text-gray-600 mb-4">
                  브랜드가 지향하는 미래의 모습과 목표를 작성해주세요.
                </p>
                <textarea
                  {...register('brandVision')}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="예: 우리는 혁신적인 기술로 사람들의 일상을 더욱 편리하고 풍요롭게 만들어가는 브랜드가 되고자 합니다."
                />
                {errors.brandVision && (
                  <p className="mt-2 text-sm text-red-600">{errors.brandVision.message}</p>
                )}
              </div>

              {/* Brand Slogan */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  브랜드 슬로건
                </label>
                <p className="text-sm text-gray-600 mb-4">
                  브랜드를 대표하는 간결하고 기억하기 쉬운 문구를 작성해주세요.
                </p>
                <input
                  {...register('brandSlogan')}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="예: 혁신으로 연결된 삶"
                />
                {errors.brandSlogan && (
                  <p className="mt-2 text-sm text-red-600">{errors.brandSlogan.message}</p>
                )}
              </div>

              {/* Brand Story */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  브랜드 스토리
                </label>
                <p className="text-sm text-gray-600 mb-4">
                  브랜드의 탄생 배경, 가치, 고객에게 전달하고 싶은 메시지를 이야기 형태로 작성해주세요.
                </p>
                <textarea
                  {...register('brandStory')}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="예: 2020년, 복잡한 기술에 지친 사람들을 위해 시작된 우리의 여정은... (브랜드의 시작, 철학, 고객에게 주는 가치 등을 포함)"
                />
                {errors.brandStory && (
                  <p className="mt-2 text-sm text-red-600">{errors.brandStory.message}</p>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-end pt-8 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    isFormValid
                      ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  다음
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Managing Guide - Right Sidebar - 360×1383 */}
        <div className="bg-gray-50 border-l" style={{ width: '360px', height: '1383px' }}>
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">관리 가이드</h3>
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">입력 도움말</h4>
                <p className="text-sm text-gray-600">
                  브랜드 아이덴티티는 브랜드의 핵심이 되는 요소입니다. 명확하고 구체적으로 작성해주세요.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">진행 상황</h4>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / 5) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600">
                  {currentStep}/5 단계 완료 ({Math.round((currentStep / 5) * 100)}%)
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">참고 자료</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 브랜드 비전 작성 가이드</li>
                  <li>• 효과적인 슬로건 예시</li>
                  <li>• 브랜드 스토리 구성법</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - 1920×90 */}
      <Footer />
    </div>
  );
}