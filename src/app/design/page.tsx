'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GNB, Footer } from '@/components/layout';

// Import all assets from Figma
const keywordPickerImg = "/dde0bcfd9e15c5415dd92275f684b2c232124c35.png";

interface ProjectInfo {
  name: string;
  product: string;
  schedule: string;
  budget: string;
  purpose: string;
}

interface DesignRequirement {
  files: File[];
}

interface ToneAndManner {
  keywords: string[];
  colors: string[];
}

interface DesignRequirements {
  brandSlogan: string;
}

export default function AIDesignPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);
  
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>({
    name: '',
    product: '',
    schedule: '',
    budget: '',
    purpose: ''
  });

  const [designRequirement, setDesignRequirement] = useState<DesignRequirement>({
    files: []
  });

  const [toneAndManner, setToneAndManner] = useState<ToneAndManner>({
    keywords: [],
    colors: ['#E5B700']
  });

  const [designRequirements, setDesignRequirements] = useState<DesignRequirements>({
    brandSlogan: ''
  });

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      setDesignRequirement(prev => ({
        ...prev,
        files: Array.from(files)
      }));
    }
  };

  const handleGenerateDesign = () => {
    console.log('Generating design with:', {
      projectInfo,
      designRequirement,
      toneAndManner,
      designRequirements
    });
    // Navigate to results or processing page
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col" data-name="AI디자인_1">
      {/* GNB - Use existing component */}
      <GNB variant="standard" />

      {/* Main Content Area */}
      <div className="flex-1 relative">
        {/* LNB */}
        <div className="absolute content-stretch flex flex-col h-[calc(100vh-90px)] items-start left-0 top-0 w-[360px]">
          <div className="bg-white box-border content-stretch flex gap-[10px] h-[70px] items-center px-[20px] py-[22px] relative shrink-0 w-full">
            <div aria-hidden="true" className="absolute border-line-gray border-[1px_0px] border-solid bottom-[-0.5px] left-0 pointer-events-none right-0 top-[-0.5px]" />
            <div className="flex flex-col font-['Noto_Sans_KR:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[21px] text-black text-nowrap uppercase">
              <p className="leading-[normal] whitespace-pre">AI리포트</p>
            </div>
          </div>
          <div className="basis-0 bg-white box-border content-stretch flex flex-col gap-[10px] grow items-center min-h-px min-w-px px-[19px] py-[20px] relative shrink-0 w-full">
            <div aria-hidden="true" className="absolute border-line-gray border-[1px_1px_0px_0px] border-solid bottom-0 left-0 pointer-events-none right-[-0.5px] top-[-0.5px]" />
            <div className="content-stretch flex flex-col gap-[20px] items-center justify-center relative shrink-0 w-[320px]">
              <div className="bg-neutral-100 box-border content-stretch flex flex-col gap-[10px] h-[42px] items-center justify-center p-[5px] relative rounded-[5px] shrink-0 w-[331px]">
                <div className="content-stretch flex gap-[15px] items-center relative shrink-0 w-full">
                  <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
                    <div className="flex flex-col font-['Noto_Sans_KR:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#393939] text-[21px] uppercase w-[243px]">
                      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-[normal] underline">패키지 디자인</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Other menu items */}
              {['캐릭터(모델) 디자인', '시제품 3D모델링', '공간 3D모델링', '비주얼 포토그래피'].map((item, index) => (
                <div key={index} className="content-stretch flex gap-[15px] items-center relative shrink-0 w-full">
                  <div className="flex flex-col font-['Noto_Sans_KR:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-text-title text-[21px] uppercase w-[243px]">
                    <p className="leading-[normal]">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Process indicator */}
        <div className="absolute bg-white box-border content-stretch flex flex-col gap-[10px] h-[70px] items-center justify-center px-[25px] py-[19px] right-0 top-0 w-[1560px]">
          <div aria-hidden="true" className="absolute border-line-gray border-[1px_0px_1px_1px] border-solid bottom-[-0.5px] left-[-0.5px] pointer-events-none right-0 top-[-0.5px]" />
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
            <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
              <div className="content-stretch flex font-['Poppins:Medium',_sans-serif] gap-[5px] items-center leading-[0] not-italic relative shrink-0 text-text-title text-[21px] text-nowrap">
                <div className="flex flex-col justify-center relative shrink-0">
                  <p className="leading-[normal] text-nowrap whitespace-pre">01.</p>
                </div>
                <div className="flex flex-col justify-center relative shrink-0">
                  <p className="leading-[normal] text-nowrap whitespace-pre">Project Information</p>
                </div>
              </div>
              <div className="content-stretch flex font-['Poppins:Medium',_sans-serif] gap-[5px] items-center leading-[0] not-italic relative shrink-0 text-text-extra text-[21px] text-nowrap">
                <div className="flex flex-col justify-center relative shrink-0">
                  <p className="leading-[normal] text-nowrap whitespace-pre">02.</p>
                </div>
                <div className="flex flex-col justify-center relative shrink-0">
                  <p className="leading-[normal] text-nowrap whitespace-pre">AI Design Image</p>
                </div>
              </div>
            </div>
            <div className="bg-icon-gray box-border content-stretch flex gap-[20px] h-[50px] items-center justify-center px-[20px] py-[12px] relative rounded-[5px] shrink-0">
              <div aria-hidden="true" className="absolute border border-line-gray border-solid inset-[-0.5px] pointer-events-none rounded-[5.5px]" />
              <div className="content-stretch flex flex-col gap-[3px] items-start justify-center leading-[0] relative shrink-0 text-[16px] text-center text-nowrap uppercase">
                <div className="flex flex-col font-['Noto_Sans_KR:Medium',_sans-serif] font-medium justify-center relative shrink-0 text-text-title">
                  <p className="leading-[normal] text-nowrap whitespace-pre">견적요청서 불러오기</p>
                </div>
                <div className="flex flex-col font-['Noto_Sans_KR:Regular',_sans-serif] font-normal justify-center relative shrink-0 text-text-body">
                  <p className="leading-[normal] text-nowrap whitespace-pre">임시 저장된 견적요청서를 불러올 수 있습니다.</p>
                </div>
              </div>
              <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
                <div className="bg-icon-black box-border content-stretch flex gap-[7px] h-[35px] items-center justify-center px-[30px] py-[12px] relative rounded-[5px] shrink-0 w-[95px]">
                  <div aria-hidden="true" className="absolute border border-line-gray border-solid inset-[-0.5px] pointer-events-none rounded-[5.5px]" />
                  <div className="flex flex-col font-['Noto_Sans_KR:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-center text-nowrap text-white uppercase">
                    <p className="leading-[normal] whitespace-pre">불러오기</p>
                  </div>
                </div>
                <div className="bg-icon-black box-border content-stretch flex gap-[7px] h-[35px] items-center justify-center px-[30px] py-[12px] relative rounded-[5px] shrink-0 w-[95px]">
                  <div aria-hidden="true" className="absolute border border-line-gray border-solid inset-[-0.5px] pointer-events-none rounded-[5.5px]" />
                  <div className="flex flex-col font-['Noto_Sans_KR:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-center text-nowrap text-white uppercase">
                    <p className="leading-[normal] whitespace-pre">임시저장</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="absolute content-stretch flex flex-col gap-[20px] items-start left-[385px] top-[90px] w-[1510px] pb-8">
          
          {/* Project Information Section */}
          <div className="bg-white box-border content-stretch flex flex-col gap-[20px] items-start p-[30px] relative rounded-[5px] shadow-[4px_4px_10px_0px_rgba(0,0,0,0.05)] shrink-0 w-full">
            <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
              <div className="content-stretch flex gap-[10px] items-start relative shrink-0">
                <div className="content-stretch flex gap-[3px] items-center relative shrink-0">
                  <div className="flex flex-col font-['Noto_Sans_KR:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[21px] text-black text-nowrap">
                    <p className="leading-[normal] whitespace-pre">Project Information</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
              {/* Project Name */}
              <div className="bg-white box-border content-stretch flex flex-col gap-[10px] h-[50px] items-start px-[20px] py-[14px] relative shrink-0 w-full">
                <div aria-hidden="true" className="absolute border border-line-gray border-solid inset-0 pointer-events-none" />
                <div className="content-stretch flex gap-[30px] items-center leading-[0] relative shrink-0 text-[16px] text-nowrap">
                  <div className="flex flex-col font-['Noto_Sans_KR:Medium',_sans-serif] font-medium justify-center relative shrink-0 text-black">
                    <p className="leading-[normal] text-nowrap whitespace-pre">프로젝트 이름</p>
                  </div>
                  <div className="flex flex-col font-['Noto_Sans_KR:Regular',_sans-serif] font-normal justify-center relative shrink-0 text-text-extra">
                    <input
                      type="text"
                      placeholder="프로젝트 이름을 입력해주세요."
                      value={projectInfo.name}
                      onChange={(e) => setProjectInfo(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-transparent border-none outline-none text-[16px] text-text-extra placeholder:text-text-extra"
                    />
                  </div>
                </div>
              </div>
              
              {/* Product and Schedule Row */}
              <div className="content-stretch flex gap-[50px] items-start relative shrink-0 w-full">
                <div className="basis-0 bg-white box-border content-stretch flex flex-col gap-[10px] grow h-[50px] items-start min-h-px min-w-px px-[20px] py-[14px] relative shrink-0">
                  <div aria-hidden="true" className="absolute border border-line-gray border-solid inset-0 pointer-events-none" />
                  <div className="content-stretch flex gap-[30px] items-center leading-[0] relative shrink-0 text-[16px]">
                    <div className="flex flex-col font-['Noto_Sans_KR:Medium',_sans-serif] font-medium justify-center relative shrink-0 text-black w-[65px]">
                      <p className="leading-[normal]">제품</p>
                    </div>
                    <input
                      type="text"
                      value={projectInfo.product}
                      onChange={(e) => setProjectInfo(prev => ({ ...prev, product: e.target.value }))}
                      className="flex-1 bg-transparent border-none outline-none text-[16px] text-text-extra"
                    />
                  </div>
                </div>
                <div className="basis-0 bg-white box-border content-stretch flex flex-col gap-[10px] grow h-[50px] items-start min-h-px min-w-px px-[20px] py-[14px] relative shrink-0">
                  <div aria-hidden="true" className="absolute border border-line-gray border-solid inset-0 pointer-events-none" />
                  <div className="content-stretch flex gap-[30px] items-center leading-[0] relative shrink-0 text-[16px]">
                    <div className="flex flex-col font-['Noto_Sans_KR:Medium',_sans-serif] font-medium justify-center relative shrink-0 text-black w-[65px]">
                      <p className="leading-[normal]">작업일정</p>
                    </div>
                    <input
                      type="text"
                      value={projectInfo.schedule}
                      onChange={(e) => setProjectInfo(prev => ({ ...prev, schedule: e.target.value }))}
                      className="flex-1 bg-transparent border-none outline-none text-[16px] text-text-extra"
                    />
                  </div>
                </div>
              </div>
              
              {/* Budget and Purpose Row */}
              <div className="content-stretch flex gap-[50px] items-start relative shrink-0 w-full">
                <div className="basis-0 bg-white box-border content-stretch flex flex-col gap-[10px] grow h-[50px] items-start min-h-px min-w-px px-[20px] py-[14px] relative shrink-0">
                  <div aria-hidden="true" className="absolute border border-line-gray border-solid inset-0 pointer-events-none" />
                  <div className="content-stretch flex gap-[30px] items-center leading-[0] relative shrink-0 text-[16px]">
                    <div className="flex flex-col font-['Noto_Sans_KR:Medium',_sans-serif] font-medium justify-center relative shrink-0 text-black w-[65px]">
                      <p className="leading-[normal]">예산</p>
                    </div>
                    <input
                      type="text"
                      value={projectInfo.budget}
                      onChange={(e) => setProjectInfo(prev => ({ ...prev, budget: e.target.value }))}
                      className="flex-1 bg-transparent border-none outline-none text-[16px] text-text-extra"
                    />
                  </div>
                </div>
                <div className="basis-0 bg-white box-border content-stretch flex flex-col gap-[10px] grow h-[50px] items-start min-h-px min-w-px px-[20px] py-[14px] relative shrink-0">
                  <div aria-hidden="true" className="absolute border border-line-gray border-solid inset-0 pointer-events-none" />
                  <div className="content-stretch flex gap-[30px] items-center leading-[0] relative shrink-0 text-[16px]">
                    <div className="flex flex-col font-['Noto_Sans_KR:Medium',_sans-serif] font-medium justify-center relative shrink-0 text-black w-[65px]">
                      <p className="leading-[normal]">활용 목적</p>
                    </div>
                    <input
                      type="text"
                      value={projectInfo.purpose}
                      onChange={(e) => setProjectInfo(prev => ({ ...prev, purpose: e.target.value }))}
                      className="flex-1 bg-transparent border-none outline-none text-[16px] text-text-extra"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Design Requirement Section */}
          <div className="bg-white box-border content-stretch flex flex-col gap-[20px] items-start px-[29px] py-[30px] relative rounded-[5px] shadow-[4px_4px_10px_0px_rgba(0,0,0,0.05)] shrink-0 w-full">
            <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
              <div className="content-stretch flex gap-[10px] items-start relative shrink-0">
                <div className="content-stretch flex gap-[3px] items-center relative shrink-0">
                  <div className="flex flex-col font-['Noto_Sans_KR:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[21px] text-black text-nowrap">
                    <p className="leading-[normal] whitespace-pre">Design Requirement</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* File Upload Area */}
            <div 
              className="bg-neutral-100 box-border content-stretch flex flex-col gap-[10px] h-[54px] items-center justify-center px-[328px] py-[15px] relative shrink-0 w-full cursor-pointer"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <input
                id="file-upload"
                type="file"
                multiple
                accept=".png,.jpg,.jpeg"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
              />
              <div className="content-stretch flex gap-[15px] items-center justify-center relative shrink-0 w-full">
                <div className="flex flex-col font-['Noto_Sans_KR:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-text-body text-[16px] text-center text-nowrap tracking-[-0.5px]">
                  <p className="leading-[normal] whitespace-pre">파일 선택 또는 드래그 앤 드롭 PNG, JPG or JPEG (최대 3MB)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tone and Manner Section */}
          <div className="bg-white box-border content-stretch flex flex-col gap-[20px] items-start px-[29px] py-[30px] relative rounded-[5px] shadow-[4px_4px_10px_0px_rgba(0,0,0,0.05)] shrink-0 w-full">
            <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
              <div className="content-stretch flex gap-[10px] items-start relative shrink-0">
                <div className="content-stretch flex gap-[3px] items-center relative shrink-0">
                  <div className="flex flex-col font-['Noto_Sans_KR:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[21px] text-black text-nowrap">
                    <p className="leading-[normal] whitespace-pre">Tone and Manner</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Keyword Picker */}
            <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center overflow-clip px-[182px] py-0 relative shrink-0 w-full">
              <div className="h-[718px] relative shrink-0 w-[728px]">
                <img alt="Keyword Picker" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={keywordPickerImg} />
              </div>
            </div>
            
            {/* Color Picker */}
            <div className="content-stretch flex gap-[17px] items-start relative shrink-0 w-full">
              <div className="basis-0 bg-active-noti box-border content-stretch flex gap-[10px] grow h-[50px] items-center justify-center min-h-px min-w-px px-[90px] py-[13px] relative shrink-0">
                <div aria-hidden="true" className="absolute border border-line-gray border-solid inset-0 pointer-events-none" />
                <div className="flex flex-col font-['Poppins:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-nowrap text-white uppercase">
                  <p className="leading-[normal] whitespace-pre">#E5B700</p>
                </div>
              </div>
              
              {/* Empty color slots */}
              {[...Array(4)].map((_, index) => (
                <div key={index} className="basis-0 bg-white box-border content-stretch flex gap-[10px] grow h-[50px] items-center justify-center min-h-px min-w-px px-[90px] py-[13px] relative shrink-0">
                  <div aria-hidden="true" className="absolute border border-text-body border-solid inset-0 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>

          {/* Design Requirements Section */}
          <div className="bg-white box-border content-stretch flex flex-col gap-[20px] items-start px-[29px] py-[30px] relative rounded-[5px] shadow-[4px_4px_10px_0px_rgba(0,0,0,0.05)] shrink-0 w-full">
            <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
              <div className="content-stretch flex gap-[10px] items-start relative shrink-0">
                <div className="content-stretch flex gap-[3px] items-center relative shrink-0">
                  <div className="flex flex-col font-['Noto_Sans_KR:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[21px] text-black text-nowrap">
                    <p className="leading-[normal] whitespace-pre">디자인 요구사항</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white box-border content-stretch flex gap-[10px] h-[300px] items-start p-[20px] relative shrink-0 w-full">
              <div aria-hidden="true" className="absolute border border-line-gray border-solid inset-0 pointer-events-none" />
              <textarea
                value={designRequirements.brandSlogan}
                onChange={(e) => setDesignRequirements(prev => ({ ...prev, brandSlogan: e.target.value }))}
                placeholder="Brand Slogan"
                className="w-full h-full bg-transparent border-none outline-none font-['Noto_Sans_KR:Regular',_sans-serif] font-normal text-[15px] text-text-extra placeholder:text-text-extra resize-none"
              />
            </div>
          </div>

          {/* Generate Button */}
          <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-full">
            <button
              onClick={handleGenerateDesign}
              className="basis-0 bg-black box-border content-stretch flex gap-[10px] grow h-[68px] items-center justify-center min-h-px min-w-px px-[529px] py-[21px] relative rounded-[100px] shrink-0 hover:bg-gray-800 transition-colors"
            >
              <div aria-hidden="true" className="absolute border border-line-gray border-solid inset-[-0.5px] pointer-events-none rounded-[100.5px]" />
              <div className="flex flex-col font-['Noto_Sans_KR:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[22px] text-center text-nowrap text-white uppercase">
                <p className="leading-[normal] whitespace-pre">디자인 생성하기</p>
              </div>
            </button>
          </div>      
        </div>
      </div>
      
      {/* Footer - Use existing component */}
      <Footer />
    </div>
  );
}