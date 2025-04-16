// src/utils/themeConstants.js

export const theme = {
    colors: {
      primary: {
        light: '#60a5fa', // blue-400
        DEFAULT: '#3b82f6', // blue-500
        dark: '#2563eb',   // blue-600
      },
      secondary: {
        light: '#f87171', // red-400
        DEFAULT: '#ef4444', // red-500
        dark: '#dc2626',  // red-600
      },
      neutral: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },
      success: '#10b981', // emerald-500
      warning: '#f59e0b', // amber-500
      error: '#ef4444',   // red-500
    },
    typography: {
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        mono: ['"Roboto Mono"', 'monospace'],
      },
      fontSize: {
        xs: '0.75rem',     // 12px
        sm: '0.875rem',    // 14px
        base: '1rem',      // 16px
        lg: '1.125rem',    // 18px
        xl: '1.25rem',     // 20px
        '2xl': '1.5rem',   // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem',  // 36px
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
    spacing: {
      0: '0',
      px: '1px',
      0.5: '0.125rem',
      1: '0.25rem',
      1.5: '0.375rem',
      2: '0.5rem',
      2.5: '0.625rem',
      3: '0.75rem',
      3.5: '0.875rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
      16: '4rem',
      20: '5rem',
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      full: '9999px',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
    transition: {
      DEFAULT: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
      fast: '100ms cubic-bezier(0.4, 0, 0.2, 1)',
      slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    },
  };
  
  // Common component styling
  export const buttonStyles = {
    base: 'font-medium rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2',
    primary: 'bg-primary-DEFAULT text-white hover:bg-primary-dark focus:ring-primary-DEFAULT',
    secondary: 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300 focus:ring-neutral-400',
    success: 'bg-success text-white hover:bg-green-600 focus:ring-success',
    danger: 'bg-error text-white hover:bg-red-600 focus:ring-error',
    warning: 'bg-warning text-white hover:bg-amber-600 focus:ring-warning',
    sizes: {
      sm: 'py-1 px-3 text-sm',
      md: 'py-2 px-4 text-base',
      lg: 'py-3 px-6 text-lg',
    },
    disabled: 'opacity-50 cursor-not-allowed',
  };
  
  export const inputStyles = {
    base: 'block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-DEFAULT focus:ring focus:ring-primary-light focus:ring-opacity-50',
    sizes: {
      sm: 'py-1 px-3 text-sm',
      md: 'py-2 px-4 text-base',
      lg: 'py-3 px-6 text-lg',
    },
    error: 'border-error focus:border-error focus:ring-error',
    disabled: 'bg-neutral-100 cursor-not-allowed',
  };
  
  export const cardStyles = {
    base: 'bg-white rounded-lg shadow',
    interactive: 'transition-all hover:shadow-md',
    bordered: 'border border-neutral-200',
    paddings: {
      sm: 'p-3',
      md: 'p-5',
      lg: 'p-6',
    },
  };
  
  export const tableStyles = {
    base: 'min-w-full divide-y divide-neutral-200',
    header: 'bg-neutral-50',
    headerCell: 'px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider',
    body: 'bg-white divide-y divide-neutral-200',
    cell: 'px-6 py-4 whitespace-nowrap text-sm text-neutral-500',
    bordered: 'border-collapse border border-neutral-200',
    striped: 'even:bg-neutral-50',
    hoverable: 'hover:bg-neutral-50',
  };