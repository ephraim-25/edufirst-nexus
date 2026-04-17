// EduFirst — Tailwind CDN config (Purple Academic)
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#9156FF",
          glow: "#B084FF",
          dark: "#7A3FE8",
          soft: "#F5EDFF",
        },
        bg: "#F8FAFC",
        muted: { DEFAULT: "#64748B", soft: "#94A3B8" },
        border: "rgba(145, 86, 255, 0.1)",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        surface:
          "0 0 0 1px rgba(145, 86, 255, 0.05), 0 1px 3px rgba(0,0,0,0.05), 0 10px 15px -3px rgba(0,0,0,0.03)",
      },
      borderRadius: { xl: "0.75rem", "2xl": "1rem" },
    },
  },
};
