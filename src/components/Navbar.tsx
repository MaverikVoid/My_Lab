"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sun, Moon, Cpu, MousePointer, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isCursorDisabled, setIsCursorDisabled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
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

  // Section Observer on homepage
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sections = ["about", "research", "projects", "experience", "achievements", "skills", "contact"];
    
    // Set first section active if at top of page
    const handleScroll = () => {
      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };
    window.addEventListener("scroll", handleScroll);

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // triggers when section is in upper-middle viewport
      threshold: 0.05
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [pathname]);

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
    if (pathname !== "/") {
      router.push(`/#${id}`);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleLogoClick = () => {
    if (pathname !== "/") {
      router.push("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "about", label: "About" },
    { id: "research", label: "Research" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "achievements", label: "Achievements" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border-dim bg-background/95 py-4 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="flex h-12 items-center justify-between">
          {/* Logo / Title */}
          <div className="flex items-center space-x-3 cursor-pointer select-none animate-fade-in" onClick={handleLogoClick} data-cursor="button">
            <Cpu className="h-5 w-5 text-sci-blue transition-transform duration-500 hover:rotate-180" />
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-tight font-medium hover:text-sci-blue transition-colors">
                Meet Dabgar
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted">
                Research Portfolio
              </span>
            </div>
          </div>

          {/* Nav Items */}
          <div className="hidden lg:flex items-center space-x-5 xl:space-x-6 font-mono text-[11px] uppercase tracking-wider text-text-muted">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  data-cursor="button"
                  className={`relative py-1 cursor-pointer transition-colors ${
                    isActive ? "text-sci-blue font-bold" : "hover:text-foreground"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-sci-blue"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center space-x-1.5">
            {/* Search Trigger */}
            <button
              onClick={() => window.dispatchEvent(new Event("open-command-search"))}
              data-cursor="button"
              className="rounded-md p-2 text-text-muted hover:bg-badge-bg hover:text-foreground transition-all duration-300 cursor-pointer flex items-center justify-center"
              title="Search Database (Ctrl+K)"
              aria-label="Open database search"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>

            {/* Custom Cursor Toggle */}
            <button
              onClick={toggleCursor}
              data-cursor="button"
              className="rounded-md p-2 text-text-muted hover:bg-badge-bg hover:text-foreground transition-all duration-300 cursor-pointer flex items-center justify-center"
              title={isCursorDisabled ? "Enable Premium Cursor" : "Disable Premium Cursor"}
              aria-label="Toggle custom cursor"
            >
              <MousePointer className={`h-[18px] w-[18px] ${isCursorDisabled ? "opacity-35" : "text-sci-blue"}`} />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              data-cursor="button"
              className="rounded-md p-2 text-text-muted hover:bg-badge-bg hover:text-foreground transition-all duration-300 cursor-pointer flex items-center justify-center"
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
