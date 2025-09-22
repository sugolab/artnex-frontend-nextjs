'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GNB, Footer } from '@/components/layout';
import { useBidReportStore } from '@/store/bid-report';

export default function BrandManagementPage() {
  const router = useRouter();
  const { currentStep, nextStep, prevStep } = useBidReportStore();

  const [perceivedQuality, setPerceivedQuality] = useState('');
  const [brandLoyalty, setBrandLoyalty] = useState('');
  const [associatedImage, setAssociatedImage] = useState('');

  const handlePrevious = () => {
    prevStep();
    router.push('/report/bid/brand-identity');
  };

  const handleNext = () => {
    nextStep();
    router.push('/report/bid/brand-planning');
  };

  return (
    <div className="bg-neutral-100 min-h-screen" data-name="AI리포트 > BID Report > Brand's Management" data-node-id="2:3483">
      {/* GNB - 1920×90 */}
      <div style={{ height: '90px' }}>
        <GNB variant="standard" />
      </div>

      {/* Main Content Container */}
      <div className="relative">

      {/* Gray background section - LNB area */}
      <div className="absolute bg-neutral-100 h-[42px] left-[15px] rounded-[5px] top-[85px] w-[331px]" />

      {/* Main Content Area - 1150×auto */}
      <div className="absolute flex flex-col gap-[20px] items-start left-[385px] top-[90px] w-[1150px]">

        {/* 지각된 품질 Section */}
        <div className="bg-white box-border flex flex-col gap-[20px] items-start px-[29px] py-[30px] relative rounded-[5px] shadow-[4px_4px_10px_0px_rgba(0,0,0,0.05)] w-full">
          <div className="flex items-start justify-between relative w-[1090px]">
            <div className="flex gap-[10px] items-start">
              <div className="flex font-['Noto_Sans_KR:Medium',_sans-serif] font-medium gap-[3px] items-center text-[21px]">
                <div className="text-black">
                  <p>지각된 품질</p>
                </div>
                <div className="text-[#e50050]">
                  <p>*</p>
                </div>
              </div>
              <div className="overflow-clip relative size-[24px]">
                <div className="absolute inset-[8.333%]">
                  <img alt="" className="block max-w-none size-full" src="/figma-assets/784375fac8b173e795dc865a7d821ff3498b7551.svg" />
                </div>
                <div className="absolute inset-[29.15%_37.83%_45.83%_37.88%]">
                  <img alt="" className="block max-w-none size-full" src="/figma-assets/8d04f0d9ec1683a70284abe90b0d6e4c43c31791.svg" />
                </div>
                <div className="absolute bottom-[31.25%] left-1/2 right-1/2 top-[66.67%]">
                  <img alt="" className="block max-w-none size-full" src="/figma-assets/ba2abe6eb11039e7e5f6113667c7dc30fe89b036.svg" />
                </div>
              </div>
            </div>
            <div className="flex gap-[10px] items-center justify-end w-[596px]">
              <div className="font-['Noto_Sans_KR:Regular',_sans-serif] font-normal text-[#909096] text-[18px] text-right">
                <p>{perceivedQuality.length}/500</p>
              </div>
            </div>
          </div>
          <div className="bg-white box-border border border-[#dddddd] flex gap-[10px] h-[300px] items-start p-[20px] relative rounded-[5px] w-[1090px]">
            <textarea
              value={perceivedQuality}
              onChange={(e) => setPerceivedQuality(e.target.value)}
              maxLength={500}
              placeholder="Perceived Quality"
              className="w-full h-full resize-none border-none outline-none font-['Noto_Sans_KR:Regular',_sans-serif] text-[15px] leading-[22px]"
            />
          </div>
        </div>

        {/* 브랜드 로열티 Section */}
        <div className="bg-white box-border flex flex-col gap-[20px] items-start px-[29px] py-[30px] relative rounded-[5px] shadow-[4px_4px_10px_0px_rgba(0,0,0,0.05)] w-full">
          <div className="flex items-start justify-between relative w-[1090px]">
            <div className="flex gap-[10px] items-start">
              <div className="flex font-['Noto_Sans_KR:Medium',_sans-serif] font-medium gap-[3px] items-center text-[21px]">
                <div className="text-black">
                  <p>브랜드 로열티</p>
                </div>
                <div className="text-[#e50050]">
                  <p>*</p>
                </div>
              </div>
              <div className="overflow-clip relative size-[24px]">
                <div className="absolute inset-[8.333%]">
                  <img alt="" className="block max-w-none size-full" src="/figma-assets/784375fac8b173e795dc865a7d821ff3498b7551.svg" />
                </div>
                <div className="absolute inset-[29.15%_37.83%_45.83%_37.88%]">
                  <img alt="" className="block max-w-none size-full" src="/figma-assets/8d04f0d9ec1683a70284abe90b0d6e4c43c31791.svg" />
                </div>
                <div className="absolute bottom-[31.25%] left-1/2 right-1/2 top-[66.67%]">
                  <img alt="" className="block max-w-none size-full" src="/figma-assets/ba2abe6eb11039e7e5f6113667c7dc30fe89b036.svg" />
                </div>
              </div>
            </div>
            <div className="flex gap-[10px] items-center justify-end w-[596px]">
              <div className="font-['Noto_Sans_KR:Regular',_sans-serif] font-normal text-[#909096] text-[18px] text-right">
                <p>{brandLoyalty.length}/500</p>
              </div>
            </div>
          </div>
          <div className="bg-white box-border border border-[#dddddd] flex gap-[10px] h-[300px] items-start p-[20px] relative rounded-[5px] w-[1090px]">
            <textarea
              value={brandLoyalty}
              onChange={(e) => setBrandLoyalty(e.target.value)}
              maxLength={500}
              placeholder="Brand Loyalty"
              className="w-full h-full resize-none border-none outline-none font-['Noto_Sans_KR:Regular',_sans-serif] text-[15px] leading-[22px]"
            />
          </div>
        </div>

        {/* 연상 이미지 Section */}
        <div className="bg-white box-border flex flex-col gap-[20px] items-start px-[29px] py-[30px] relative rounded-[5px] shadow-[4px_4px_10px_0px_rgba(0,0,0,0.05)] w-full">
          <div className="flex items-start justify-between relative w-[1090px]">
            <div className="flex gap-[10px] items-start">
              <div className="flex font-['Noto_Sans_KR:Medium',_sans-serif] font-medium gap-[3px] items-center text-[21px]">
                <div className="text-black">
                  <p>연상 이미지</p>
                </div>
                <div className="text-[#e50050]">
                  <p>*</p>
                </div>
              </div>
              <div className="overflow-clip relative size-[24px]">
                <div className="absolute inset-[8.333%]">
                  <img alt="" className="block max-w-none size-full" src="/figma-assets/784375fac8b173e795dc865a7d821ff3498b7551.svg" />
                </div>
                <div className="absolute inset-[29.15%_37.83%_45.83%_37.88%]">
                  <img alt="" className="block max-w-none size-full" src="/figma-assets/8d04f0d9ec1683a70284abe90b0d6e4c43c31791.svg" />
                </div>
                <div className="absolute bottom-[31.25%] left-1/2 right-1/2 top-[66.67%]">
                  <img alt="" className="block max-w-none size-full" src="/figma-assets/ba2abe6eb11039e7e5f6113667c7dc30fe89b036.svg" />
                </div>
              </div>
            </div>
            <div className="flex gap-[10px] items-center justify-end w-[596px]">
              <div className="font-['Noto_Sans_KR:Regular',_sans-serif] font-normal text-[#909096] text-[18px] text-right">
                <p>{associatedImage.length}/500</p>
              </div>
            </div>
          </div>
          <div className="bg-white box-border border border-[#dddddd] flex gap-[10px] h-[300px] items-start p-[20px] relative rounded-[5px] w-[1090px]">
            <textarea
              value={associatedImage}
              onChange={(e) => setAssociatedImage(e.target.value)}
              maxLength={500}
              placeholder="Associated Image"
              className="w-full h-full resize-none border-none outline-none font-['Noto_Sans_KR:Regular',_sans-serif] text-[15px] leading-[22px]"
            />
          </div>
        </div>

        {/* Bottom Navigation Buttons */}
        <div className="flex gap-[20px] items-start relative w-[1150px]">
          <button
            onClick={handlePrevious}
            className="basis-0 bg-[#252c32] box-border flex gap-[10px] grow h-[68px] items-center justify-center px-[529px] py-[21px] relative rounded-[5px] text-white"
          >
            <div className="flex items-center justify-center">
              <div className="rotate-[180deg] scale-y-[-100%]">
                <div className="h-[21px] overflow-clip relative w-[24px]">
                  <div className="absolute flex inset-[4.76%_9.11%_7.33%_14.74%] items-center justify-center">
                    <div className="rotate-[314.711deg] size-[12.989px] skew-x-[359.421deg]">
                      <div className="relative size-full">
                        <div className="absolute bottom-[-7.7%] left-0 right-[-7.7%] top-0">
                          <img alt="" className="block max-w-none size-full" src="/figma-assets/aca897316f90bb9ff628f508ef77f268f65ff34a.svg" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bg-white inset-[42.86%_8.33%_47.62%_8.33%]" />
                </div>
              </div>
            </div>
            <div className="font-['Noto_Sans_KR:Medium',_sans-serif] font-medium text-[22px]">
              <p>이전</p>
            </div>
          </button>
          <button
            onClick={handleNext}
            className="basis-0 bg-[#252c32] box-border flex gap-[10px] grow h-[68px] items-center justify-center px-[529px] py-[21px] relative rounded-[5px] text-white"
          >
            <div className="font-['Noto_Sans_KR:Medium',_sans-serif] font-medium text-[22px]">
              <p>다음</p>
            </div>
            <div className="h-[21px] overflow-clip relative w-[24px]">
              <div className="absolute flex inset-[4.76%_9.11%_7.33%_14.74%] items-center justify-center">
                <div className="rotate-[314.711deg] size-[12.989px] skew-x-[359.421deg]">
                  <div className="relative size-full">
                    <div className="absolute bottom-[-7.7%] left-0 right-[-7.7%] top-0">
                      <img alt="" className="block max-w-none size-full" src="/figma-assets/aca897316f90bb9ff628f508ef77f268f65ff34a.svg" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bg-white inset-[42.86%_8.33%_47.62%_8.33%]" />
            </div>
          </button>
        </div>
      </div>

      {/* LNB - Left Navigation - 360×1453 */}
      <div className="absolute flex flex-col h-[1453px] items-start left-0 top-0 w-[360px]">
        <div className="bg-white box-border flex gap-[10px] h-[70px] items-center px-[20px] py-[22px] relative w-full border-[#dddddd] border-[1px_0px]">
          <div className="font-['Noto_Sans_KR:Medium',_sans-serif] font-medium text-[21px] text-black">
            <p>AI리포트</p>
          </div>
        </div>
        <div className="basis-0 bg-white box-border flex flex-col gap-[10px] grow items-center px-[19px] py-[20px] relative w-full border-[#dddddd] border-[1px_1px_0px_0px]">
          <div className="flex flex-col gap-[20px] items-center justify-center relative w-[320px]">
            <div className="bg-neutral-100 box-border flex flex-col gap-[10px] h-[42px] items-start p-[5px] relative rounded-[5px] w-[331px]">
              <div className="flex gap-[15px] items-center relative w-full">
                <div className="flex gap-[15px] items-center">
                  <div className="bg-white box-border flex gap-[10px] items-center justify-center px-[15px] py-0 relative rounded-[3px] size-[24px] border-2 border-[#262d33]">
                    <div className="font-['Poppins:SemiBold',_sans-serif] text-[#262d33] text-[10px]">
                      <p>BID</p>
                    </div>
                  </div>
                  <div className="font-['Poppins:Regular',_sans-serif] text-[21px] text-black w-[243px] underline">
                    <p>BID Report</p>
                  </div>
                </div>
                <div className="flex h-[24px] items-center justify-center w-[24px]">
                  <div className="rotate-[270deg]">
                    <div className="overflow-clip relative size-[24px]">
                      <div className="absolute inset-[30%_15%]">
                        <img alt="" className="block max-w-none size-full" src="/figma-assets/834dc8b9abdc22a6625162397fb4c68010da466b.svg" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-[15px] items-center relative w-full">
              <div className="relative size-[24px]">
                <div className="absolute bottom-0 left-0 right-0 top-[33.33%]">
                  <img alt="" className="block max-w-none size-full" src="/figma-assets/229e90233515063d91402e4323971d364773c476.svg" />
                </div>
                <div className="absolute bottom-[16.67%] left-[33.33%] right-[33.33%] top-1/2">
                  <img alt="" className="block max-w-none size-full" src="/figma-assets/77a31112f0831a05a53adbf7314a9812e0936a99.svg" />
                </div>
                <div className="absolute bottom-[75%] left-[45.83%] right-[45.83%] top-0">
                  <img alt="" className="block max-w-none size-full" src="/figma-assets/d633075eab0e2c526438cbb3b8054759029aa0bb.svg" />
                </div>
                <div className="absolute flex inset-[9.64%_8.38%_67.79%_72.33%] items-center justify-center">
                  <div className="h-[2.001px] rotate-[125.025deg] w-[5.214px]">
                    <img alt="" className="block max-w-none size-full" src="/figma-assets/25627a21fc543a5dd9f34507d2306bf149633b93.svg" />
                  </div>
                </div>
                <div className="absolute flex inset-[9.68%_72.33%_67.74%_8.37%] items-center justify-center">
                  <div className="h-[2.001px] rotate-[54.975deg] w-[5.216px]">
                    <img alt="" className="block max-w-none size-full" src="/figma-assets/99700eab26d0823f1818310cc385d47c8e233a15.svg" />
                  </div>
                </div>
              </div>
              <div className="font-['Poppins:Regular',_sans-serif] text-[21px] text-black w-[243px]">
                <p>Visual Report</p>
              </div>
              <div className="flex h-[24px] items-center justify-center w-[24px]">
                <div className="rotate-[270deg]">
                  <div className="overflow-clip relative size-[24px]">
                    <div className="absolute inset-[30%_15%]">
                      <img alt="" className="block max-w-none size-full" src="/figma-assets/834dc8b9abdc22a6625162397fb4c68010da466b.svg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-[15px] items-center relative w-full">
              <div className="flex items-center justify-center">
                <div className="scale-y-[-100%]">
                  <div className="relative size-[24px]">
                    <div className="absolute inset-[2.93%_65.82%_53.71%_8.79%]">
                      <img alt="" className="block max-w-none size-full" src="/figma-assets/9dc7ce567fc01b7763a7f5e9277de0ccc9dd348b.svg" />
                    </div>
                    <div className="absolute inset-[26.76%_26.76%_2.93%_34.18%]">
                      <img alt="" className="block max-w-none size-full" src="/figma-assets/1a14f938ff6154cb4bccc0df282dbcf75a33b864.svg" />
                    </div>
                    <div className="absolute inset-[46.29%_65.82%_22.46%_14.65%]">
                      <img alt="" className="block max-w-none size-full" src="/figma-assets/800b43a0d1b04e4ca34691472aead66828a8bc2c.svg" />
                    </div>
                    <div className="absolute inset-[52.15%_85.35%_28.32%_2.93%]">
                      <img alt="" className="block max-w-none size-full" src="/figma-assets/af8dfccec32c9860b45c201704f2c4eb53d75d07.svg" />
                    </div>
                    <div className="absolute inset-[61.91%_2.93%_38.09%_89.26%]">
                      <img alt="" className="block max-w-none size-full" src="/figma-assets/627ed736e99049d6145cbb2f178f6f4fcb8540a1.svg" />
                    </div>
                    <div className="absolute inset-[75.27%_5.76%_22.05%_86.9%]">
                      <img alt="" className="block max-w-none size-full" src="/figma-assets/1ecddc8f83ec78b562353ae11c1093699eed7bfb.svg" />
                    </div>
                    <div className="absolute inset-[45.88%_5.76%_51.45%_86.9%]">
                      <img alt="" className="block max-w-none size-full" src="/figma-assets/82e9de23cedffb7e6ecf864985167a02dea602c9.svg" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="font-['Poppins:Regular',_sans-serif] text-[21px] text-black w-[243px]">
                <p>Marketing Report</p>
              </div>
              <div className="flex h-[24px] items-center justify-center w-[24px]">
                <div className="rotate-[270deg]">
                  <div className="overflow-clip relative size-[24px]">
                    <div className="absolute inset-[30%_15%]">
                      <img alt="" className="block max-w-none size-full" src="/figma-assets/834dc8b9abdc22a6625162397fb4c68010da466b.svg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Managing Guide - Right Sidebar - 360×1383 */}
      <div className="absolute bg-white box-border flex gap-[10px] h-[1383px] items-start justify-center px-0 py-[20px] right-0 top-[70px] w-[360px] border-[#dddddd] border-[1px_0px_0px]">
        <div className="flex flex-col gap-[20px] items-center relative w-[360px]">
          <div className="flex gap-[10px] items-center relative w-[320px]">
            <div className="h-[24px] relative w-[18.857px]">
              <img alt="" className="block max-w-none size-full" src="/figma-assets/3c5b10d2393b3c59783443197fc4c87d1c66c91f.svg" />
            </div>
            <div className="font-['Poppins:Medium',_sans-serif] text-[21px] text-black w-[290px]">
              <p>Managing Guide</p>
            </div>
          </div>
          <div className="h-0 relative w-full">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <img alt="" className="block max-w-none size-full" src="/figma-assets/b59a22192d0c9c5c2d8973503e090b8a539754d6.svg" />
            </div>
          </div>
          <div className="flex flex-col gap-[10px] items-start relative w-[320px]">
            <div className="font-['Noto_Sans_KR:Bold',_sans-serif] font-bold text-[16px] text-black w-full">
              <p className="leading-[25px]">브랜드는 매니징은 무엇인가요?</p>
            </div>
            <div className="font-['Noto_Sans_KR:Regular',_sans-serif] font-normal leading-[21px] text-[#262d33] text-[14px] w-full">
              <p className="mb-0">브랜드 매니징은 브랜드의 가치를 창출하고 유지하기</p>
              <p className="mb-0">위한 전략적 활동입니다.</p>
              <p className="mb-0">&nbsp;</p>
              <p className="mb-0">시장에서의 경쟁력을 강화하는 것을 목표로 브랜드의</p>
              <p className="mb-0">인지도, 이미지, 충성도 등 브랜드 자산을 관리하여</p>
              <p className="mb-0">브랜드의 정체성을 명확히 하고 일관된 메시지를</p>
              <p className="mb-0">전달하며, 소비자와의 긍정적인 관계를 관리하는</p>
              <p>일입니다.</p>
            </div>
            <div className="aspect-[489/295] bg-center bg-contain bg-no-repeat w-full" style={{ backgroundImage: `url('/figma-assets/54176c173f6e532d3cb4ebfdff08ddef17915449.png')` }} />
          </div>
          <div className="h-0 relative w-full">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <img alt="" className="block max-w-none size-full" src="/figma-assets/b59a22192d0c9c5c2d8973503e090b8a539754d6.svg" />
            </div>
          </div>
        </div>
      </div>

      {/* Process Indicator - 1560×70 */}
      <div className="absolute bg-white box-border flex flex-col gap-[10px] h-[70px] items-start px-[25px] py-[19px] right-0 top-0 w-[1560px] border-[#dddddd] border-[1px_0px_1px_1px]">
        <div className="flex gap-[10px] items-center relative">
          {/* 01. Brand Identity */}
          <div className="flex font-['Poppins:Medium',_sans-serif] font-medium gap-[5px] items-center text-[#909096] text-[21px] leading-[32px] h-[32px]">
            <div className="w-[31px] h-[32px] flex items-center">
              <p>01.</p>
            </div>
            <div className="w-[163px] h-[32px] flex items-center">
              <p>Brand Identity</p>
            </div>
          </div>

          {/* Arrow Icon */}
          <div className="flex h-[24px] items-center justify-center w-[24px] rotate-[-90deg]">
            <div className="h-[24px] w-[24px]">
              <div className="absolute left-[30%] right-0 top-[15%] bottom-[45%] bg-[#909096]" style={{ transform: 'rotate(-90deg)' }}>
                <img alt="" className="block max-w-none size-full" src="/figma-assets/2357da0c49ce157b9c82b9dc32b2b0804c785bef.svg" />
              </div>
            </div>
          </div>

          {/* 02. Brand's Management - ACTIVE */}
          <div className="flex font-['Poppins:Medium',_sans-serif] font-medium gap-[5px] items-center text-[#262d33] text-[21px] leading-[32px] h-[32px]">
            <div className="w-[31px] h-[32px] flex items-center">
              <p>02.</p>
            </div>
            <div className="w-[230px] h-[32px] flex items-center">
              <p>Brand&apos;s Management</p>
            </div>
          </div>

          {/* Arrow Icon */}
          <div className="flex h-[24px] items-center justify-center w-[24px] rotate-[-90deg]">
            <div className="h-[24px] w-[24px]">
              <div className="absolute left-[30%] right-0 top-[15%] bottom-[45%] bg-[#909096]" style={{ transform: 'rotate(-90deg)' }}>
                <img alt="" className="block max-w-none size-full" src="/figma-assets/2357da0c49ce157b9c82b9dc32b2b0804c785bef.svg" />
              </div>
            </div>
          </div>

          {/* 03. Brand Planning */}
          <div className="flex font-['Poppins:Medium',_sans-serif] font-medium gap-[5px] items-center text-[#909096] text-[21px] leading-[32px] h-[32px] w-[198px]">
            <div className="w-[31px] h-[32px] flex items-center">
              <p>03.</p>
            </div>
            <div className="flex items-center">
              <p>Brand Planning</p>
            </div>
          </div>

          {/* Arrow Icon */}
          <div className="flex h-[24px] items-center justify-center w-[24px] rotate-[-90deg]">
            <div className="h-[24px] w-[24px]">
              <div className="absolute left-[30%] right-0 top-[15%] bottom-[45%] bg-[#909096]" style={{ transform: 'rotate(-90deg)' }}>
                <img alt="" className="block max-w-none size-full" src="/figma-assets/2357da0c49ce157b9c82b9dc32b2b0804c785bef.svg" />
              </div>
            </div>
          </div>

          {/* 04. Competitor Analysis */}
          <div className="flex font-['Poppins:Medium',_sans-serif] font-medium gap-[5px] items-center text-[#909096] text-[21px] leading-[32px] h-[32px]">
            <div className="w-[31px] h-[32px] flex items-center">
              <p>04.</p>
            </div>
            <div className="flex items-center">
              <p>Competitor Analysis</p>
            </div>
          </div>

          {/* Arrow Icon */}
          <div className="flex h-[24px] items-center justify-center w-[24px] rotate-[-90deg]">
            <div className="h-[24px] w-[24px]">
              <div className="absolute left-[30%] right-0 top-[15%] bottom-[45%] bg-[#909096]" style={{ transform: 'rotate(-90deg)' }}>
                <img alt="" className="block max-w-none size-full" src="/figma-assets/2357da0c49ce157b9c82b9dc32b2b0804c785bef.svg" />
              </div>
            </div>
          </div>

          {/* 05. Brand Logo */}
          <div className="flex font-['Poppins:Medium',_sans-serif] font-medium gap-[5px] items-center text-[#909096] text-[21px] leading-[32px] h-[32px]">
            <div className="w-[31px] h-[32px] flex items-center">
              <p>05.</p>
            </div>
            <div className="flex items-center">
              <p>Brand Logo</p>
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