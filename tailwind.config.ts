import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['var(--font-muli)', 'system-ui', 'sans-serif'],
        'bodoni': ['var(--font-bodoni-moda)', 'serif'],
        'muli': ['var(--font-muli)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config; 