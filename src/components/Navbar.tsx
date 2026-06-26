"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sun, Moon, Cpu, MousePointer } from "lucide-react";

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isCursorDisabled, setIsCursorDisabled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Determine theme on mount
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      setTheme("dark");
    } else {
      setTheme("light");
    }

    // Determine cursor toggle state on mount
    setIsCursorDisabled(localStorage.getItem("custom-cursor-disabled") === "true");
  }, []);

  const toggleCursor = () => {
    const newVal = !isCursorDisabled;
    localStorage.setItem("custom-cursor-disabled", newVal ? "true" : "false");
    setIsCursorDisabled(newVal);
    window.dispatchEvent(new Event("cursor-toggle"));
  };

  const toggleTheme = () => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  const handleNavClick = (id: string) => {
    if (pathname === "/about") {
      router.push(`/#${id}`);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleLogoClick = () => {
    if (pathname === "/about") {
      router.push("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePhilosophyClick = () => {
    if (pathname === "/about") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/about");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border-dim bg-background/95 py-4 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="flex h-12 items-center justify-between">
          {/* Logo / Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={handleLogoClick} data-cursor="button">
            <Cpu className="h-5 w-5 text-sci-blue transition-transform duration-500 hover:rotate-180" />
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-tight font-medium hover:text-sci-blue transition-colors">
                Meet Dabgar
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted">
                Computational Lab
              </span>
            </div>
          </div>

          {/* Nav Items */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8 font-mono text-xs uppercase tracking-wider text-text-muted">
            <button
              onClick={() => handleNavClick("questions")}
              data-cursor="button"
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              Questions
            </button>
            <button
              onClick={() => handleNavClick("research")}
              data-cursor="button"
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              Research
            </button>
            <button
              onClick={() => handleNavClick("knowledge-graph")}
              data-cursor="button"
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              Graph
            </button>
            <button
              onClick={() => handleNavClick("thinking")}
              data-cursor="button"
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              Thinking
            </button>
            <button
              onClick={() => handleNavClick("diary")}
              data-cursor="button"
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              Diary
            </button>
            <button
              onClick={handlePhilosophyClick}
              data-cursor="button"
              className={`hover:text-foreground transition-colors cursor-pointer ${
                pathname === "/about" ? "text-sci-blue font-bold border-b border-sci-blue/30" : ""
              }`}
            >
              Philosophy
            </button>
            <button
              onClick={() => handleNavClick("timeline")}
              data-cursor="button"
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              Timeline
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {/* Custom Cursor Toggle */}
            <button
              onClick={toggleCursor}
              data-cursor="button"
              className="rounded-md p-2 text-text-muted hover:bg-badge-bg hover:text-foreground transition-all duration-300 cursor-pointer flex items-center justify-center"
              title={isCursorDisabled ? "Enable Premium Cursor" : "Disable Premium Cursor"}
              aria-label="Toggle custom cursor"
            >
              <MousePointer className={`h-4 w-4 ${isCursorDisabled ? "opacity-30" : "text-sci-blue"}`} />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              data-cursor="button"
              className="rounded-md p-2 text-text-muted hover:bg-badge-bg hover:text-foreground transition-all duration-300 cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-[18px] w-[18px] transition-transform duration-300 hover:rotate-12" />
              ) : (
                <Sun className="h-[18px] w-[18px] transition-transform duration-300 hover:rotate-45" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
