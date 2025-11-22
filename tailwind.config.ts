import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius:{
        'radius':'var(--radius)'
      },

      boxShadow: {
        'shadow_first': 'var(--shadow_first)',
      },

      fontFamily: {
        Montserrat: ['Montserrat', 'sans-serif'], 
        Roboto: ['Roboto', 'sans-serif'], 
      },

      container:{
        center:true,
        padding:"0 20",
      },

      colors: {
        white: "var(--white)",
        black: "var(--black_first)",
        bg_modal: "var(--bg_modal)",
        black_second: "var(--black_second)",
        grey_first: "var(--grey_first)",
        grey_second: "var(--grey_second)",
        grey_third: "var(--grey_third)",
        yellow: "var(--yellow)",
        green_first: "var(--green_first)",
        green_second: "var(--green_second)",
      },
    },
  },
  plugins: [],
} satisfies Config;
