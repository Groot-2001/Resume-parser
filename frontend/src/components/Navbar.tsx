import React, { useEffect, useState } from 'react';

function Navbar() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
      document.documentElement.classList.toggle(
        "dark",
        darkMode
      );
    }, [darkMode]);
  return (
        <nav className="relative z-10 flex items-center justify-between p-8">
        <div className="flex flex-col">
          <span className="text-[13px] font-bold uppercase tracking-wide text-black/70 dark:text-white [text-shadow:0_0_10px_rgba(255,255,255,0.8)]">
            Shiva
          </span>

          <span className="text-[20px] font-semibold uppercase leading-none bg-linear-to-r from-fuchsia-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Silmawala
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="rounded-full border border-black/50 dark:border-white px-5 py-2 text-sm text-black dark:text-white cursor-pointer"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>
      </nav>
  );
}

export default Navbar;
