'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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

  // 테스트용 기본값 설정
  const defaultBrandVision = brandVision || "우리는 혁신적인 기술과 창의적인 디자인을 통해 사람들의 일상을 더욱 편리하고 풍요롭게 만들어가는 브랜드가 되고자 합니다. 고객의 니즈를 깊이 이해하고, 지속가능한 가치를 창출하며, 모든 이해관계자와 함께 성장하는 미래지향적인 기업으로 발전해 나가겠습니다.";
  const defaultBrandSlogan = brandSlogan || "혁신으로 연결된 삶, 함께 만들어가는 미래";
  const defaultBrandStory = brandStory || "2020년, 복잡한 기술에 지친 사람들을 위해 시작된 우리의 여정은 단순함 속에서 찾는 혁신이었습니다. 창립자들은 기술이 사람을 위해 존재해야 한다는 철학을 바탕으로, 누구나 쉽게 사용할 수 있는 제품과 서비스를 만들고자 했습니다. 우리는 고객의 목소리에 귀 기울이며, 지속적인 혁신을 통해 더 나은 내일을 만들어가고 있습니다.";

  const [visionCount, setVisionCount] = useState(defaultBrandVision.length);
  const [sloganCount, setSloganCount] = useState(defaultBrandSlogan.length);
  const [storyCount, setStoryCount] = useState(defaultBrandStory.length);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<BrandIdentityFormData>({
    resolver: zodResolver(brandIdentitySchema),
    defaultValues: {
      brandVision: defaultBrandVision,
      brandSlogan: defaultBrandSlogan,
      brandStory: defaultBrandStory,
    },
  });

  const watchedValues = watch();

  const onSubmit = (data: BrandIdentityFormData) => {
    updateBrandIdentity(data);
    nextStep();
    router.push('/report/bid/brand-management');
  };

  return (
    <div className="min-h-screen bg-white" style={{ width: '1920px', height: '1633px', margin: '0 auto' }}>
      {/* GNB - 1920×90 */}
      <div style={{ height: '90px' }}>
        <GNB variant="standard" />
      </div>

      {/* Breadcrumb - 1920×70 */}
      <div className="bg-gray-50 border-b" style={{ height: '70px' }}>
        <div className="flex items-center h-full px-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>AI리포트</span>
            <span>&gt;</span>
            <span className="text-blue-600 font-medium">01. Brand Identity</span>
            <span>&gt;</span>
            <span className="text-gray-400">02. Brand&apos;s Management</span>
            <span>&gt;</span>
            <span className="text-gray-400">03. Brand Planning</span>
            <span>&gt;</span>
            <span className="text-gray-400">04. Competitor Analysis</span>
            <span>&gt;</span>
            <span className="text-gray-400">05. Brand Logo</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex" style={{ height: '1473px' }}>
        {/* Left Sidebar - 384×1473 (w-96) */}
        <div className="w-96 h-[1473px] inline-flex flex-col justify-start items-start">
          <div className="self-stretch h-16 px-5 py-5 bg-white border-t border-b border-neutral-200 inline-flex justify-start items-center gap-2.5">
            <div className="justify-center text-black text-xl font-medium font-['Noto_Sans_KR'] uppercase">AI리포트</div>
          </div>
          <div className="self-stretch flex-1 px-5 py-5 bg-white border-r border-t border-neutral-200 flex flex-col justify-start items-center gap-2.5">
            <div className="w-80 flex flex-col justify-center items-center gap-5">
              <div className="w-80 h-10 p-[5px] bg-neutral-100 rounded-[5px] flex flex-col justify-start items-start gap-2.5">
                <div className="self-stretch inline-flex justify-start items-center gap-3.5">
                  <div className="flex justify-start items-center gap-3.5">
                    <div className="w-6 h-6 px-3.5 bg-white rounded-[3px] outline outline-2 outline-offset-[-2px] outline-gray-800 flex justify-center items-center gap-2.5">
                      <div className="text-center justify-center text-gray-800 text-[10px] font-semibold font-['Poppins'] uppercase">BID</div>
                    </div>
                    <div className="w-60 justify-center text-black/20 text-xl font-normal font-['Poppins'] underline">BID Report</div>
                  </div>
                  <div className="w-0 h-6 relative origin-top-left -rotate-90 overflow-hidden">
                    <div className="w-2.5 h-4 left-[7.20px] top-[3.60px] absolute bg-black" />
                  </div>
                </div>
              </div>
              <div className="self-stretch inline-flex justify-start items-center gap-3.5">
                <div className="w-6 h-6 relative">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3V15C3 16.1046 3.89543 17 5 17H19C20.1046 17 21 16.1046 21 15V3" stroke="black" strokeWidth="2"/>
                    <circle cx="8" cy="8" r="2" fill="black"/>
                    <path d="M12 21L14 19L18 23" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="w-60 justify-center text-black/20 text-xl font-normal font-['Poppins']">Visual Report</div>
                <div className="w-0 h-6 relative origin-top-left -rotate-90 overflow-hidden">
                  <div className="w-2.5 h-4 left-[7.20px] top-[3.60px] absolute bg-black" />
                </div>
              </div>
              <div className="self-stretch inline-flex justify-start items-center gap-3.5">
                <div className="w-6 h-6 relative">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="3" width="20" height="18" rx="2" stroke="black" strokeWidth="2"/>
                    <rect x="3" y="8" width="4" height="8" fill="black"/>
                    <rect x="9" y="6" width="4" height="10" fill="black"/>
                    <rect x="15" y="4" width="4" height="12" fill="black"/>
                    <circle cx="20" cy="6" r="2" stroke="black" strokeWidth="1"/>
                    <circle cx="20" cy="12" r="2" stroke="black" strokeWidth="1"/>
                    <circle cx="20" cy="18" r="2" stroke="black" strokeWidth="1"/>
                  </svg>
                </div>
                <div className="w-60 justify-center text-black/20 text-xl font-normal font-['Poppins']">Marketing Report</div>
                <div className="w-0 h-6 relative origin-top-left -rotate-90 overflow-hidden">
                  <div className="w-2.5 h-4 left-[7.20px] top-[3.60px] absolute bg-black" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - 1176×1473 */}
        <div className="bg-white" style={{ width: '1176px', height: '1473px' }}>
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
              {/* Brand Vision */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <h3 className="text-lg font-bold text-gray-900">브랜드 비전</h3>
                    <span className="ml-2 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold">?</span>
                  </div>
                  <span className="text-sm text-gray-500">{visionCount}/500</span>
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-2">Brand Vision</label>
                  <textarea
                    {...register('brandVision')}
                    rows={8}
                    maxLength={500}
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm leading-relaxed"
                    placeholder="브랜드 비전을 입력해주세요"
                    onChange={(e) => {
                      setVisionCount(e.target.value.length);
                    }}
                  />
                </div>
                {errors.brandVision && (
                  <p className="text-sm text-red-600">{errors.brandVision.message}</p>
                )}
              </div>

              {/* Brand Slogan */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <h3 className="text-lg font-bold text-gray-900">브랜드 슬로건</h3>
                    <span className="ml-2 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold">?</span>
                  </div>
                  <span className="text-sm text-gray-500">{sloganCount}/500</span>
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-2">Brand Slogan</label>
                  <textarea
                    {...register('brandSlogan')}
                    rows={8}
                    maxLength={500}
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm leading-relaxed"
                    placeholder="브랜드 슬로건을 입력해주세요"
                    onChange={(e) => {
                      setSloganCount(e.target.value.length);
                    }}
                  />
                </div>
                {errors.brandSlogan && (
                  <p className="text-sm text-red-600">{errors.brandSlogan.message}</p>
                )}
              </div>

              {/* Brand Story */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <h3 className="text-lg font-bold text-gray-900">브랜드 스토리</h3>
                    <span className="ml-2 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold">?</span>
                  </div>
                  <span className="text-sm text-gray-500">{storyCount}/500</span>
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-2">Brand Story</label>
                  <textarea
                    {...register('brandStory')}
                    rows={8}
                    maxLength={500}
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm leading-relaxed"
                    placeholder="브랜드 스토리를 입력해주세요"
                    onChange={(e) => {
                      setStoryCount(e.target.value.length);
                    }}
                  />
                </div>
                {errors.brandStory && (
                  <p className="text-sm text-red-600">{errors.brandStory.message}</p>
                )}
              </div>

              {/* Next Button */}
              <div className="pt-8">
                <button
                  type="submit"
                  className="w-full bg-gray-800 text-white py-4 px-6 rounded-lg font-medium hover:bg-gray-900 transition-colors flex items-center justify-center"
                >
                  다음
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Sidebar - Managing Guide - 360×1473 */}
        <div className="bg-white border-l" style={{ width: '360px', height: '1473px' }}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Managing Guide</h3>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">우리만의 브랜드에게만 관해서</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  브랜드란 사업시를 중심으로 기업 브라우징,
                  어느, 클래스, 임베디, 청취된 또한
                  소바회의 환진직은 정확인 참여라고 보며,<br/>
                  어느 것에 접뗌된 회망처럽 등 상점관 제적의
                  층하속 요은가 어느아다. 그 데돌인 중국사내
                  민캄의 통간이 등영 사를 가자를 아은좋
                  능힘과 급처난 금값시 가지대처 볼명사
                  즈은어 의창르근 겄원간다.
                </p>
              </div>

              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-4">브랜드 아이덴티티 체크리스트</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-2 font-medium">1.</span>
                    <span className="text-gray-700">브랜드가 제공하는 혜택은 무엇이며, 소비자에게 어떤 의미를 주나요?</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-2 font-medium">2.</span>
                    <span className="text-gray-700">소비자에게 어떤 의미를 주나요?</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-2 font-medium">3.</span>
                    <span className="text-gray-700">브랜드의 히스토리 헤즈 어떻게 만들어졌나요?</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-2 font-medium">4.</span>
                    <span className="text-gray-700">차분 촨순히므린 그 메리 민주인인지?</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-2 font-medium">5.</span>
                    <span className="text-gray-700">브랜드의 핵심 품히혁 처한 내법에 어형제 순중이 아영 줄는는 약</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-2 font-medium">6.</span>
                    <span className="text-gray-700">뭐앱에게 찾지 쿠문에 아이들된간 처임업동 진만기법문</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-2 font-medium">7.</span>
                    <span className="text-gray-700">브랜드를 통시 이 소늘장밞 진앙언 숫으 관견돈등</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-2 font-medium">8.</span>
                    <span className="text-gray-700">브랜드 공함나는 정션 약진당 크고리느 오의하냄 차기그자시에한</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-2 font-medium">9.</span>
                    <span className="text-gray-700">브랜드는 상님과 적량밞 좋인 크자켄 그레시안 미량의</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-2 font-medium">10.</span>
                    <span className="text-gray-700">브랜드 훅실의 첫짐되 어 잔조 저엄 혬는금?</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full mx-auto mb-2 flex items-center justify-center">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" stroke="#666" strokeWidth="2"/>
                        <path d="M9 12L11 14L16 9" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="text-xs text-gray-500">Brand Security Check</p>
                  </div>
                </div>
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