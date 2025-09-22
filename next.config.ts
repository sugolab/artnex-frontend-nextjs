import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 성능 최적화 설정
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // 압축 최적화
  compress: true,
  
  // Turbopack 설정
  turbopack: {
    root: '/Users/crom/workspace_sugolab/artnex-frontend-nextjs',
  },
  
  // 코드 스플리팅 최적화  
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
    },
  },
};

export default nextConfig;
