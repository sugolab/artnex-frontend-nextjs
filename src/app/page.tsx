'use client';

import React from 'react';
import GNB from '@/components/layout/GNB';

const img = "/assets/fcb113690bc1e9a5524e50ae05556f9e79e79bd3.png";
const imgGroup280 = "/assets/main-bg.svg";

export default function Main() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden" data-name="MAIN" data-node-id="2:4576">
      <div className="absolute bg-black bottom-0 h-[90px] left-0 overflow-clip w-full z-10" data-name="Footer" data-node-id="2:4577">
        <div className="absolute h-[30px] left-[20px] top-[30px] w-[192px]" data-name="Logo" data-node-id="I2:4577;9:807">
          <div className="absolute bg-center bg-cover bg-no-repeat inset-0" data-name="logo-white-horizontal" data-node-id="I2:4577;9:807;5:1635" style={{ backgroundImage: `url('${img}')` }} />
        </div>
        <div className="absolute content-stretch flex font-['Noto_Sans_KR:Medium',_sans-serif] font-medium gap-[24px] items-center justify-start leading-[0] right-[20px] text-[20px] text-nowrap text-white top-[30px]" data-node-id="I2:4577;9:820">
          <div className="relative shrink-0" data-node-id="I2:4577;9:811">
            <p className="leading-[30px] text-nowrap whitespace-pre">T. 02-6417-3714</p>
          </div>
          <div className="relative shrink-0" data-node-id="I2:4577;9:818">
            <p className="leading-[30px] text-nowrap whitespace-pre">|</p>
          </div>
          <div className="relative shrink-0" data-node-id="I2:4577;9:817">
            <p className="leading-[30px] text-nowrap whitespace-pre">F. 070-4024-0271</p>
          </div>
          <div className="relative shrink-0" data-node-id="I2:4577;9:819">
            <p className="leading-[30px] text-nowrap whitespace-pre">|</p>
          </div>
          <div className="relative shrink-0" data-node-id="I2:4577;9:816">
            <p className="leading-[30px] text-nowrap whitespace-pre">E. edu@sugolab.kr</p>
          </div>
        </div>
      </div>
      {/* Background container */}
      <div className="absolute inset-0 w-full h-full z-0" data-node-id="2:4578">
        <div className="absolute inset-0 w-full h-full" data-node-id="2:4579">
          <div className="absolute inset-0 w-full h-full" data-node-id="2:4580">
            <div className="absolute inset-0 w-full h-full">
              <img alt="" className="block w-full h-full object-cover" src={imgGroup280} />
            </div>
          </div>
        </div>
      </div>
      <GNB variant="main" />
      <div className="absolute font-['Poppins:Medium',_sans-serif] leading-[0] left-[50px] not-italic text-[50px] text-nowrap text-white top-[140px] z-10" data-node-id="2:4591">
        <p className="leading-[57px] whitespace-pre">
          Build your
          <br aria-hidden="true" className="" />
          brand&apos;s world.
        </p>
      </div>
      <div className="absolute font-['Noto_Sans_KR:Regular',_sans-serif] font-normal leading-[25px] left-[50px] text-[16px] text-nowrap text-white top-[285px] uppercase whitespace-pre z-10" data-node-id="2:4592">
        <p className="mb-0">아트넥스는 AI 기반 데이터 분석과</p>
        <p className="mb-0">전략적 브랜딩의 결합을 통해 기업의 성공을 위한</p>
        <p className="">최적화된 브랜딩 솔루션을 제공합니다.</p>
      </div>
    </div>
  );
}