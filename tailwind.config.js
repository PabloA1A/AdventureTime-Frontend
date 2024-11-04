/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
      extend: {
        backgroundImage: {
          'background-primary': "url('/src/assets/img/background.webp')",
          'background-eventuser': "url('/src/assets/img/backgroundeventuser.jpg')"
        },
        
        variants: {},
  
        fontFamily: {
          gloria: ["Gloria Hallelujah", "cursive"],
          nunito: ["Nunito", "sans-serif"],
          poppins: ["Poppins", "sans-serif"]
        },
  
        colors: {
          dark: "#32292f",
          secondary: "#99e1d9",
          light: "#f0f7f4",
          primary: "#70abaf",
          terciary: "#705d56",
          navy: "#303972"
        },
      },
      plugins: [],
    },
  };
  