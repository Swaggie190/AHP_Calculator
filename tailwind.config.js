module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./public/index.html",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            light: 'rgb(var(--color-primary-light) / <alpha-value>)',
            DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
            dark: 'rgb(var(--color-primary-dark) / <alpha-value>)',
          },
          secondary: {
            light: 'rgb(var(--color-secondary-light) / <alpha-value>)',
            DEFAULT: 'rgb(var(--color-secondary) / <alpha-value>)',
            dark: 'rgb(var(--color-secondary-dark) / <alpha-value>)',
          },
          success: 'rgb(var(--color-success) / <alpha-value>)',
          warning: 'rgb(var(--color-warning) / <alpha-value>)',
          error: 'rgb(var(--color-error) / <alpha-value>)',
        },
        fontFamily: {
          sans: [
            'Inter',
            'system-ui',
            '-apple-system',
            'BlinkMacSystemFont',
            'Segoe UI',
            'Roboto',
            'Helvetica Neue',
            'Arial',
            'sans-serif',
          ],
          mono: ['"Roboto Mono"', 'monospace'],
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
    ],
  }