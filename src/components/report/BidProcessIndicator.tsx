'use client';

interface Step {
  number: string;
  title: string;
}

interface BidProcessIndicatorProps {
  currentStep: number;
}

const steps: Step[] = [
  { number: '01.', title: 'Brand Identity' },
  { number: '02.', title: "Brand's Management" },
  { number: '03.', title: 'Brand Planning' },
  { number: '04.', title: 'Competitor Analysis' },
  { number: '05.', title: 'Brand Logo' },
];

export default function BidProcessIndicator({ currentStep }: BidProcessIndicatorProps) {
  return (
    <div className="mb-xxl">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isCompleted = currentStep > stepNumber;
          
          return (
            <div key={stepNumber} className="flex items-center">
              {/* Step */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-sm font-noto-bold transition-colors duration-200
                    ${isActive ? 'bg-primary-600 text-neutral-0' : 
                      isCompleted ? 'bg-success-500 text-neutral-0' : 
                      'bg-neutral-200 text-neutral-600'}
                  `}
                >
                  {isCompleted ? '✓' : step.number}
                </div>
                <span 
                  className={`
                    mt-sm text-sm font-noto-regular transition-colors duration-200
                    ${isActive ? 'text-primary-600' : 
                      isCompleted ? 'text-success-500' : 
                      'text-neutral-500'}
                  `}
                >
                  {step.title}
                </span>
              </div>
              
              {/* Connector */}
              {index < steps.length - 1 && (
                <div 
                  className={`
                    flex-1 h-0.5 mx-lg transition-colors duration-200
                    ${isCompleted ? 'bg-success-500' : 'bg-neutral-200'}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}