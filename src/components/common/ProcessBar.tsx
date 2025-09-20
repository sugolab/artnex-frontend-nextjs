'use client';

import { cn } from '@/lib/utils';

interface Step {
  number: string;
  title: string;
  label?: string;
}

interface ProcessBarProps {
  steps: Step[];
  currentStep: number;
  className?: string;
  variant?: 'horizontal' | 'compact';
}

export default function ProcessBar({ 
  steps, 
  currentStep, 
  className,
  variant = 'horizontal' 
}: ProcessBarProps) {
  
  // 피그마 분석 기준: process 인스턴스는 1560×70 크기
  const containerStyles = variant === 'compact' 
    ? 'w-full h-[50px]' 
    : 'w-[1560px] h-[70px]';

  return (
    <div className={cn(containerStyles, 'bg-white', className)}>
      <div className="flex items-center justify-between h-full px-6">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isCompleted = currentStep > stepNumber;
          
          return (
            <div key={stepNumber} className="flex items-center">
              {/* Step */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-noto-bold transition-colors duration-200',
                    isActive && 'bg-black text-white',
                    isCompleted && 'bg-green-500 text-white', 
                    !isActive && !isCompleted && 'bg-gray-200 text-gray-600'
                  )}
                >
                  {isCompleted ? '✓' : step.number}
                </div>
                <span 
                  className={cn(
                    'mt-1 text-xs font-noto-medium transition-colors duration-200 text-center',
                    isActive && 'text-black',
                    isCompleted && 'text-green-500',
                    !isActive && !isCompleted && 'text-gray-500'
                  )}
                >
                  {step.label || step.title}
                </span>
              </div>
              
              {/* Connector */}
              {index < steps.length - 1 && (
                <div 
                  className={cn(
                    'flex-1 h-0.5 mx-4 transition-colors duration-200 min-w-[40px]',
                    isCompleted ? 'bg-green-500' : 'bg-gray-200'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}