/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-mulish)"],
        mulish: ["var(--font-mulish)"],
        merriweather: ["var(--font-merriweather)"],
        robotoslab: ["var(--font-roboto-slab)"],
        inter: ["var(--font-inter)"],
        playfairdisplay: ["var(--font-playfair-display)"],
        kanit: ["var(--font-kanit)"],
      },
      animation: {
        "fade-in": "fade-in 0.5s linear forwards",
        marquee: "marquee var(--marquee-duration) linear infinite",
        "spin-slow": "spin 4s linear infinite",
        "spin-slower": "spin 6s linear infinite",
        "spin-reverse": "spin-reverse 1s linear infinite",
        "spin-reverse-slow": "spin-reverse 4s linear infinite",
        "spin-reverse-slower": "spin-reverse 6s linear infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
}
