'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import BidReportLayout from '@/components/layout/BidReportLayout';
import BidProcessIndicator from '@/components/report/BidProcessIndicator';
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
    <BidReportLayout title="01. Brand Identity" currentStep={currentStep}>
      <BidProcessIndicator currentStep={currentStep} />
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-xxl">
        {/* Brand Vision */}
        <div>
          <label className="block text-lg font-futura-demi text-neutral-900 mb-lg">
            브랜드 비전
          </label>
          <p className="text-sm font-noto-regular text-neutral-600 mb-lg">
            브랜드가 지향하는 미래의 모습과 목표를 작성해주세요.
          </p>
          <textarea
            {...register('brandVision')}
            rows={4}
            className="w-full px-lg py-md border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none font-noto-regular transition-colors duration-200"
            placeholder="예: 우리는 혁신적인 기술로 사람들의 일상을 더욱 편리하고 풍요롭게 만들어가는 브랜드가 되고자 합니다."
          />
          {errors.brandVision && (
            <p className="mt-sm text-sm font-noto-regular text-error-500">{errors.brandVision.message}</p>
          )}
        </div>

        {/* Brand Slogan */}
        <div>
          <label className="block text-lg font-futura-demi text-neutral-900 mb-lg">
            브랜드 슬로건
          </label>
          <p className="text-sm font-noto-regular text-neutral-600 mb-lg">
            브랜드를 대표하는 간결하고 기억하기 쉬운 문구를 작성해주세요.
          </p>
          <input
            {...register('brandSlogan')}
            type="text"
            className="w-full px-lg py-md border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent font-noto-regular transition-colors duration-200"
            placeholder="예: 혁신으로 연결된 삶"
          />
          {errors.brandSlogan && (
            <p className="mt-sm text-sm font-noto-regular text-error-500">{errors.brandSlogan.message}</p>
          )}
        </div>

        {/* Brand Story */}
        <div>
          <label className="block text-lg font-futura-demi text-neutral-900 mb-lg">
            브랜드 스토리
          </label>
          <p className="text-sm font-noto-regular text-neutral-600 mb-lg">
            브랜드의 탄생 배경, 가치, 고객에게 전달하고 싶은 메시지를 이야기 형태로 작성해주세요.
          </p>
          <textarea
            {...register('brandStory')}
            rows={6}
            className="w-full px-lg py-md border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none font-noto-regular transition-colors duration-200"
            placeholder="예: 2020년, 복잡한 기술에 지친 사람들을 위해 시작된 우리의 여정은... (브랜드의 시작, 철학, 고객에게 주는 가치 등을 포함)"
          />
          {errors.brandStory && (
            <p className="mt-sm text-sm font-noto-regular text-error-500">{errors.brandStory.message}</p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end space-x-lg pt-xxl border-t border-neutral-200">
          <button
            type="submit"
            disabled={!isFormValid}
            className={`
              px-xxl py-md rounded-md font-noto-bold transition-all duration-200 shadow-sm
              ${isFormValid 
                ? 'bg-primary-600 text-neutral-0 hover:bg-primary-700 hover:shadow-md' 
                : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
              }
            `}
          >
            다음
          </button>
        </div>
      </form>
    </BidReportLayout>
  );
}