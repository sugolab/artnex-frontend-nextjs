'use client';

import { cn } from '@/lib/utils';
import LinkText from '@/components/common/LinkText';

interface LNBItem {
  id: string;
  label: string;
  href: string;
  active?: boolean;
}

interface LNBProps {
  items: LNBItem[];
  className?: string;
  title?: string;
}

export default function LNB({ items, className, title }: LNBProps) {
  return (
    <aside className={cn('w-[360px] bg-white border-r border-gray-200', className)}>
      <div className="p-6">
        {title && (
          <h2 className="font-noto-bold text-xl text-black mb-6">
            {title}
          </h2>
        )}
        
        <nav className="space-y-2">
          {items.map((item) => (
            <LinkText
              key={item.id}
              href={item.href}
              className={cn(
                'block w-full px-4 py-3 rounded-lg transition-colors duration-200',
                'font-noto-medium text-lg',
                item.active 
                  ? 'bg-black text-white' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-black'
              )}
            >
              {item.label}
            </LinkText>
          ))}
        </nav>
      </div>
    </aside>
  );
}