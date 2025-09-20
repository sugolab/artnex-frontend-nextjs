'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Plus, X } from 'lucide-react';
import BidReportLayout from '@/components/layout/BidReportLayout';
import BidProcessIndicator from '@/components/report/BidProcessIndicator';
import { useBidReportStore } from '@/store/bid-report';

const brandManagementSchema = z.object({
  brandName: z.string().min(1, '브랜드명을 입력해주세요'),
  productNames: z.array(z.string().min(1, '제품명을 입력해주세요')).min(1, '최소 1개 이상의 제품명을 입력해주세요'),
  priceRangeMin: z.number().min(1, '최소 가격을 입력해주세요'),
  priceRangeMax: z.number().min(1, '최대 가격을 입력해주세요'),
  category: z.string().min(1, '카테고리를 선택해주세요'),
  website: z.string().url('올바른 웹사이트 URL을 입력해주세요').optional().or(z.literal('')),
  targetGender: z.array(z.string()).min(1, '타겟 성별을 선택해주세요'),
  targetAgeRange: z.array(z.string()).min(1, '타겟 연령대를 선택해주세요'),
  targetOccupation: z.array(z.string()).min(1, '타겟 직업을 선택해주세요'),
  targetIncome: z.array(z.string()).min(1, '타겟 소득을 선택해주세요'),
  buyingStyle: z.string().min(1, '구매 성향을 선택해주세요'),
});

type BrandManagementFormData = z.infer<typeof brandManagementSchema>;

export default function BrandManagementPage() {
  const router = useRouter();
  const { 
    brandName,
    productNames,
    priceRangeMin,
    priceRangeMax,
    category,
    website,
    targetGender,
    targetAgeRange,
    targetOccupation,
    targetIncome,
    buyingStyle,
    currentStep,
    updateBrandManagement,
    nextStep,
    prevStep,
  } = useBidReportStore();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<BrandManagementFormData>({
    resolver: zodResolver(brandManagementSchema),
    defaultValues: {
      brandName,
      productNames: productNames.length > 0 ? productNames : [''],
      priceRangeMin,
      priceRangeMax,
      category,
      website,
      targetGender,
      targetAgeRange,
      targetOccupation,
      targetIncome,
      buyingStyle,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'productNames',
  });

  const onSubmit = (data: BrandManagementFormData) => {
    const filteredProductNames = data.productNames.filter(name => name.trim() !== '');
    updateBrandManagement({
      ...data,
      productNames: filteredProductNames,
      logo: null, // File upload will be handled separately
    });
    nextStep();
    router.push('/report/bid/brand-planning');
  };

  const handlePrevious = () => {
    prevStep();
    router.push('/report/bid/brand-identity');
  };

  const handleCheckboxChange = (field: keyof BrandManagementFormData, value: string, isChecked: boolean) => {
    const currentValues = watch(field) as string[];
    if (isChecked) {
      setValue(field, [...currentValues, value]);
    } else {
      setValue(field, currentValues.filter(v => v !== value));
    }
  };

  return (
    <BidReportLayout title="02. Brand's Management" currentStep={currentStep}>
      <BidProcessIndicator currentStep={currentStep} />
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Brand Name */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            브랜드명
          </label>
          <input
            {...register('brandName')}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="브랜드명을 입력해주세요"
          />
          {errors.brandName && (
            <p className="mt-2 text-sm text-red-600">{errors.brandName.message}</p>
          )}
        </div>

        {/* Product Names */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            제품명
          </label>
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-3">
                <input
                  {...register(`productNames.${index}`)}
                  type="text"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={`제품명 ${index + 1}`}
                />
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => append('')}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <Plus size={20} />
              <span>제품 추가</span>
            </button>
          </div>
          {errors.productNames && (
            <p className="mt-2 text-sm text-red-600">{errors.productNames.message}</p>
          )}
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            가격대
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">최소 가격 (원)</label>
              <input
                {...register('priceRangeMin', { valueAsNumber: true })}
                type="number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
              {errors.priceRangeMin && (
                <p className="mt-1 text-sm text-red-600">{errors.priceRangeMin.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">최대 가격 (원)</label>
              <input
                {...register('priceRangeMax', { valueAsNumber: true })}
                type="number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
              {errors.priceRangeMax && (
                <p className="mt-1 text-sm text-red-600">{errors.priceRangeMax.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            카테고리
          </label>
          <select
            {...register('category')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">카테고리를 선택해주세요</option>
            <option value="tech">기술/전자</option>
            <option value="fashion">패션/의류</option>
            <option value="beauty">뷰티/화장품</option>
            <option value="food">식품/음료</option>
            <option value="health">건강/의료</option>
            <option value="education">교육/서비스</option>
            <option value="lifestyle">라이프스타일</option>
            <option value="other">기타</option>
          </select>
          {errors.category && (
            <p className="mt-2 text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>

        {/* Website */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            웹사이트 (선택사항)
          </label>
          <input
            {...register('website')}
            type="url"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com"
          />
          {errors.website && (
            <p className="mt-2 text-sm text-red-600">{errors.website.message}</p>
          )}
        </div>

        {/* Target Gender */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            타겟 성별
          </label>
          <div className="space-y-2">
            {['male', 'female', 'all'].map((gender) => (
              <label key={gender} className="flex items-center">
                <input
                  type="checkbox"
                  checked={watch('targetGender')?.includes(gender) || false}
                  onChange={(e) => handleCheckboxChange('targetGender', gender, e.target.checked)}
                  className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">
                  {gender === 'male' ? '남성' : gender === 'female' ? '여성' : '전체'}
                </span>
              </label>
            ))}
          </div>
          {errors.targetGender && (
            <p className="mt-2 text-sm text-red-600">{errors.targetGender.message}</p>
          )}
        </div>

        {/* Target Age Range */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            타겟 연령대
          </label>
          <div className="grid grid-cols-2 gap-2">
            {['10s', '20s', '30s', '40s', '50s', '60s+'].map((age) => (
              <label key={age} className="flex items-center">
                <input
                  type="checkbox"
                  checked={watch('targetAgeRange')?.includes(age) || false}
                  onChange={(e) => handleCheckboxChange('targetAgeRange', age, e.target.checked)}
                  className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">{age}</span>
              </label>
            ))}
          </div>
          {errors.targetAgeRange && (
            <p className="mt-2 text-sm text-red-600">{errors.targetAgeRange.message}</p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-8 border-t border-gray-200">
          <button
            type="button"
            onClick={handlePrevious}
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
          >
            이전
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            다음
          </button>
        </div>
      </form>
    </BidReportLayout>
  );
}