/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url(tw-hero-bg.png)",
        "credit-card-mockup": "url(credit-card-mockup.png)",
        "hand-holding-credit-card-mockup": "url(hand-holding-credit-card.png)",
      },
    },
  },
  plugins: [],
};
