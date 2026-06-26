"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Terminal as TerminalIcon, X, CornerDownLeft, FileText, HelpCircle, BookOpen, Clock, Activity, AlertTriangle } from "lucide-react";
import { currentQuestions } from "@/content/questions";
import { researchProjects } from "@/content/research";
import { diaryEntries } from "@/content/diary";
import { useRouter, usePathname } from "next/navigation";

interface IndexItem {
  id: string;
  type: "question" | "project" | "diary" | "failure" | "about";
  title: string;
  subtitle: string;
  keywords: string;
  url: string;
  sectionId?: string;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"search" | "terminal">("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "Meet Dabgar // Scientific Laboratory Terminal OS v1.0.4",
    "Type 'help' to view the list of laboratory execution routines.",
    ""
  ]);

  const router = useRouter();
  const pathname = usePathname();
  
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const terminalInputRef = useRef<HTMLInputElement | null>(null);
  const terminalBottomRef = useRef<HTMLDivElement | null>(null);

  // Setup search index
  const [searchIndex, setSearchIndex] = useState<IndexItem[]>([]);

  useEffect(() => {
    const index: IndexItem[] = [
      {
        id: "about-me",
        type: "about",
        title: "Meet Dabgar - Biography",
        subtitle: "Integrated B.Tech-M.Tech student in AI at NIT Surat & Research Intern at Brown University",
        keywords: "biography resume about nit surat brown university khemraj shukla meet dabgar profile background",
        url: "/about",
        sectionId: "manifesto"
      },
      ...researchProjects.map(p => ({
        id: p.id,
        type: "project" as const,
        title: p.title,
        subtitle: p.subtitle,
        keywords: `${p.title} ${p.subtitle} ${p.problem} ${p.idea} ${p.method} scio stiffness pinns jax pdes`,
        url: "/",
        sectionId: "research"
      })),
      ...currentQuestions.map(q => ({
        id: q.id,
        type: "question" as const,
        title: `Question: ${q.question}`,
        subtitle: q.context,
        keywords: `${q.question} ${q.context} PDE residual stiffness foundation models inverse sciml agents`,
        url: "/",
        sectionId: "questions"
      })),
      ...diaryEntries.map(d => ({
        id: d.week.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase(),
        type: "diary" as const,
        title: d.week,
        subtitle: d.observation,
        keywords: `${d.week} ${d.experiment} ${d.observation} ${d.mistakes} ${d.deadEnds} ${d.newHypothesis} deeponet operators inverse`,
        url: "/",
        sectionId: "diary"
      })),
      {
        id: "failure-helmholtz",
        type: "failure",
        title: "Failure 01: Soft PINN boundary loss",
        subtitle: "Loss space ill-conditioning on high-frequency Helmholtz solver",
        keywords: "helmholtz soft boundary failure pde residual gradient penalty boundary condition loss weights stiffness",
        url: "/about",
        sectionId: "failures"
      },
      {
        id: "failure-chaotic",
        type: "failure",
        title: "Failure 02: BPTT on chaotic variables",
        subtitle: "Exploding adjoint gradients (10^14) on chaotic Lorenz-63 integration",
        keywords: "lorenz backpropagation BPTT chaotic variables gradient explosion ad automatic differentiation jax adjoint",
        url: "/about",
        sectionId: "failures"
      }
    ];
    setSearchIndex(index);
  }, []);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Global listener for navbar clicks to open
    const handleOpenSearch = () => {
      setIsOpen(true);
      setActiveTab("search");
    };
    const handleOpenTerminal = () => {
      setIsOpen(true);
      setActiveTab("terminal");
    };

    window.addEventListener("open-command-search", handleOpenSearch);
    window.addEventListener("open-command-terminal", handleOpenTerminal);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-search", handleOpenSearch);
      window.removeEventListener("open-command-terminal", handleOpenTerminal);
    };
  }, [isOpen]);

  // Focus inputs on modal show
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (activeTab === "search") {
          searchInputRef.current?.focus();
        } else {
          terminalInputRef.current?.focus();
        }
      }, 80);
    }
  }, [isOpen, activeTab]);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalLogs]);

  // Command executor
  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    const newLogs = [...terminalLogs, `meet@lab > ${cmdStr}`];
    
    if (trimmed === "help") {
      newLogs.push(
        "Available shell routines:",
        "  help         Display this context list.",
        "  papers       Show SCIO publication metadata and citation format.",
        "  failures     Display stdout logs of failed numerical runs.",
        "  diary        Show latest unpolished laboratory diary entries.",
        "  philosophy   Display core essays of Meet's research Operating System.",
        "  clear        Flush stdout logs from this session.",
        "  close        Terminate command palette interface."
      );
    } else if (trimmed === "clear") {
      setTerminalLogs([]);
      setTerminalInput("");
      return;
    } else if (trimmed === "close" || trimmed === "exit") {
      setIsOpen(false);
      setTerminalInput("");
      return;
    } else if (trimmed === "papers" || trimmed === "scio") {
      newLogs.push(
        "SCIO: Stiffness-Conditioned Interpolated Optimizer",
        "Status: Manuscript in preparation.",
        "Target: IEEE Transactions on Emerging Topics in Computational Intelligence (IEEE TETCI)",
        "",
        "BIBTEX REFERENCE TEMPLATE:",
        "@article{dabgar2026scio,",
        "  author  = {Dabgar, Meet and Shukla, Khemraj},",
        "  title   = {SCIO: Stiffness-Conditioned Interpolated Optimizer for stiff PDEs in PINNs},",
        "  journal = {IEEE Transactions on Emerging Topics in Computational Intelligence (Submitted)},",
        "  year    = {2026}",
        "}"
      );
    } else if (trimmed === "failures" || trimmed === "errors") {
      newLogs.push(
        "STDOUT EXTRACT [Lorenz-63 Gradient Check, Step 182]:",
        "  [Epoch 000] loss_val: 18.2435",
        "  [Epoch 050] loss_val: 4.8219",
        "  [Epoch 100] loss_val: 78.4410  (Adjoint instability detected)",
        "  [Epoch 150] loss_val: 1.042e+09 (Explosion path)",
        "  [Epoch 182] loss_val: NaN       (sys.overflow - adjoint eigenvalues exceeded 10^14)",
        "  >> CRITICAL SYSTEM ADJOINT TRAJECTORY CONVERGENCE FAILURE. EXIT CODE: -9",
        "",
        "STDOUT EXTRACT [Helmholtz Collocation weight scale check]:",
        "  Max L2 boundary error: 0.2482 (Limit is 0.01)",
        "  Warning: residual gradients on collocation bounds are near orthogonal to PDE boundary constraints.",
        "  Convergence stalling: Soft loss weights cannot balance residual manifolds."
      );
    } else if (trimmed === "diary") {
      newLogs.push(
        "LAB DIARY EXTRACTS:",
        "  Week 1 (Neural Operators): Studied mapping functions direct across spaces. Grid resolution bounds are bypassed.",
        "  Week 2 (DeepONet): Bottleneck found in high-frequency detail mapping. Fourier scaling is needed.",
        "  Week 3 (SCIO test): Tested Allen-Cahn stiffness optimization. Local Hessian eigenvalue updates show promise but are unstable."
      );
    } else if (trimmed === "philosophy") {
      newLogs.push(
        "MEET'S OPERATING SYSTEM - RESEARCH PILLARS:",
        "  Pillar 1: Why I chose optimization instead of LLMs. (LLMs focus on language structure, whereas optimization maps continuous physical manifolds directly).",
        "  Pillar 2: Why I care about stiff PDEs. (Stiffness represents the continuous, multi-scale limits of space-time interactions. Navigating them is the ultimate optimizer trial).",
        "  Pillar 3: Why mathematics still matters in AI. (Analytical bounds are the only mathematical insurance policy for safety-critical scientific deployments)."
      );
    } else {
      newLogs.push(`Command '${trimmed}' not found. Type 'help' to review available routines.`);
    }

    newLogs.push("");
    setTerminalLogs(newLogs);
    setTerminalInput("");
  };

  // Live filter search
  const filteredIndex = searchQuery.trim() === ""
    ? []
    : searchIndex.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.keywords.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleSearchSelect = (item: IndexItem) => {
    setIsOpen(false);
    setSearchQuery("");
    
    if (pathname === item.url) {
      if (item.sectionId) {
        const el = document.getElementById(item.sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      router.push(item.url + (item.sectionId ? `#${item.sectionId}` : ""));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-[10vh] px-4">
          
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-md cursor-zoom-out"
          />

          {/* Core Panel Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-card-bg border border-border-dim rounded-lg overflow-hidden shadow-[0_24px_50px_-12px_rgba(0,0,0,0.4)] flex flex-col max-h-[75vh]"
          >
            
            {/* Header Tabs Navigation */}
            <div className="flex items-center justify-between border-b border-border-dim bg-background/50 px-4 py-2 font-mono text-[9px] uppercase tracking-wider text-text-muted">
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab("search")}
                  className={`hover:text-foreground transition-colors py-1 cursor-pointer flex items-center space-x-1.5 ${
                    activeTab === "search" ? "text-sci-blue font-bold border-b border-sci-blue/70" : ""
                  }`}
                >
                  <Search className="h-3 w-3" />
                  <span>Interactive Search</span>
                </button>
                <button
                  onClick={() => setActiveTab("terminal")}
                  className={`hover:text-foreground transition-colors py-1 cursor-pointer flex items-center space-x-1.5 ${
                    activeTab === "terminal" ? "text-sci-blue font-bold border-b border-sci-blue/70" : ""
                  }`}
                >
                  <TerminalIcon className="h-3 w-3" />
                  <span>Lab Terminal</span>
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <span className="hidden sm:inline text-[8px] opacity-60">ESC to Close</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:text-foreground rounded transition-colors cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* TAB 1: QUICK SEARCH */}
            {activeTab === "search" && (
              <div className="flex flex-col flex-1 overflow-hidden">
                <div className="relative border-b border-border-dim/40 flex items-center">
                  <Search className="absolute left-4 h-4.5 w-4.5 text-text-muted" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search SCIO, PINNs, diary, failures, timeline, about..."
                    className="w-full bg-transparent pl-12 pr-6 py-4 font-serif text-base text-foreground placeholder:text-text-muted/60 focus:outline-none focus:ring-0 border-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 p-1 text-text-muted hover:text-foreground text-[10px] uppercase font-mono tracking-wider"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Search Results list */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2 max-h-[45vh]">
                  {searchQuery === "" ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center space-y-2">
                      <Search className="h-8 w-8 text-text-muted/30" />
                      <p className="font-serif text-sm text-text-muted">Type key terms to search the laboratory index.</p>
                      <p className="font-mono text-[9px] text-text-muted/50 uppercase tracking-wider">Try typing: scio, brown, failures, pde</p>
                    </div>
                  ) : filteredIndex.length === 0 ? (
                    <div className="text-center py-10 font-serif text-sm text-text-muted">
                      No matching records found in database.
                    </div>
                  ) : (
                    filteredIndex.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleSearchSelect(item)}
                        className="group flex items-start justify-between p-3 rounded-lg border border-border-dim/50 hover:border-text-muted/30 hover:bg-badge-bg/40 cursor-pointer transition-all duration-200"
                      >
                        <div className="space-y-1 pr-4">
                          <div className="flex items-center space-x-2">
                            <span className="font-mono text-[8px] uppercase tracking-wider text-sci-blue bg-sci-blue/5 border border-sci-blue/15 px-1.5 py-0.5 rounded shrink-0">
                              {item.type}
                            </span>
                            <h4 className="font-serif text-sm font-semibold text-foreground group-hover:text-sci-blue transition-colors">
                              {item.title}
                            </h4>
                          </div>
                          <p className="text-[11px] text-text-muted leading-normal">
                            {item.subtitle}
                          </p>
                        </div>
                        <CornerDownLeft className="h-3.5 w-3.5 text-text-muted/40 opacity-0 group-hover:opacity-100 transition-opacity self-center shrink-0" />
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: TERMINAL CONSOLE */}
            {activeTab === "terminal" && (
              <div className="flex flex-col flex-1 overflow-hidden bg-[#0a0a0c]">
                {/* Output area */}
                <div className="flex-1 overflow-y-auto p-4 font-mono text-[11px] leading-relaxed text-[#ececed] space-y-1.5 max-h-[42vh]">
                  {terminalLogs.map((log, i) => (
                    <div key={i} className="whitespace-pre-wrap min-h-[1rem]">
                      {log.startsWith("meet@lab >") ? (
                        <span className="text-sci-blue">{log}</span>
                      ) : log.includes("CRITICAL") || log.includes("FAILURE") || log.includes("NaN") ? (
                        <span className="text-red-400 font-semibold">{log}</span>
                      ) : log.includes("BIBTEX REFERENCE") || log.includes("@article") ? (
                        <span className="text-text-muted">{log}</span>
                      ) : (
                        log
                      )}
                    </div>
                  ))}
                  <div ref={terminalBottomRef} />
                </div>

                {/* Input prompt area */}
                <div className="border-t border-border-dim/40 bg-black/40 flex items-center p-3">
                  <span className="font-mono text-[11px] text-sci-blue mr-2 shrink-0">
                    meet@lab &gt;
                  </span>
                  <input
                    ref={terminalInputRef}
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        executeCommand(terminalInput);
                      }
                    }}
                    placeholder="help, papers, failures, diary, philosophy, clear..."
                    className="w-full bg-transparent font-mono text-[11px] text-white focus:outline-none border-none p-0 focus:ring-0 placeholder:text-text-muted/30"
                  />
                  <button
                    onClick={() => executeCommand(terminalInput)}
                    className="p-1 hover:text-sci-blue rounded font-mono text-[9px] text-text-muted uppercase tracking-wider shrink-0 ml-2"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
