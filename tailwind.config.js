const designTokens = require('./src/tokens/design-tokens.json');

// Helper function to extract values from design tokens
function extractTokenValues(tokens, type) {
  const result = {};
  
  function traverse(obj, prefix = '') {
    for (const [key, value] of Object.entries(obj)) {
      if (value.type === type) {
        result[prefix + key] = value.value;
      } else if (typeof value === 'object' && value !== null && !value.type) {
        traverse(value, prefix + key + '-');
      }
    }
  }
  
  traverse(tokens);
  return result;
}

// Extract color values
const colors = {};
Object.entries(designTokens.colors).forEach(([category, shades]) => {
  colors[category] = {};
  Object.entries(shades).forEach(([shade, token]) => {
    colors[category][shade] = token.value;
  });
});

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        // Keep Tailwind defaults and add our custom colors
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'futura-book': ['Futura Book', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'futura-bold': ['Futura Bold', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'futura-demi': ['Futura Demi', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'noto-regular': ['Nota Regular', 'Noto Sans KR', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'noto-bold': ['Nota Bold', 'Noto Sans KR', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'noto-light': ['Nota Light', 'Noto Sans KR', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'poppins': ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        'xs': ['12px', '1.4'],
        'sm': ['14px', '1.4'],
        'base': ['16px', '1.4'],
        'lg': ['18px', '1.4'],
        'xl': ['20px', '1.4'],
        '2xl': ['24px', '1.2'],
        '3xl': ['30px', '1.2'],
        '4xl': ['36px', '1.2'],
        '5xl': ['48px', '1.2'],
        '6xl': ['64px', '1.2'],
      },
      fontWeight: {
        'light': '300',
        'regular': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        'xxl': '48px',
        'xxxl': '64px',
      },
      borderRadius: {
        'none': '0px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        'round': '50%',
        'full': '9999px',
      },
      boxShadow: {
        'none': 'none',
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      lineHeight: {
        'tight': '1.2',
        'normal': '1.4',
        'relaxed': '1.6',
        'loose': '1.8',
      },
      screens: {
        'xs': '0px',
        'sm': '600px',
        'md': '960px',
        'lg': '1264px',
        'xl': '1904px',
      },
    },
  },
  plugins: [],
};