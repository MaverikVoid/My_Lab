"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { HelpCircle } from "lucide-react";

interface QuestionCard {
  text: string;
  weightX: number;
  weightY: number;
}

const questions: QuestionCard[] = [
  { text: "Can optimization become intelligent?", weightX: 15, weightY: 15 },
  { text: "Can AI discover governing scientific laws?", weightX: -12, weightY: 18 },
  { text: "Can scientific discovery itself become fully autonomous?", weightX: 18, weightY: -10 },
  { text: "Can continuous operator learning replace discrete grid solvers?", weightX: -15, weightY: -12 },
  { text: "Can global financial flows be modeled as open-system thermodynamics?", weightX: 10, weightY: -18 },
  { text: "Can intelligence emerge solely from high-dimensional parameter updates?", weightX: -18, weightY: 10 },
];

export default function FloatingQuestions() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for physical drag inertia
  const springX = useSpring(mouseX, { stiffness: 40, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 18 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse positions between -0.5 and 0.5
      const normX = (e.clientX / window.innerWidth) - 0.5;
      const normY = (e.clientY / window.innerHeight) - 0.5;
      
      mouseX.set(normX);
      mouseY.set(normY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
      {questions.map((q, idx) => {
        // Multiply normalized spring values by each card's unique directional weight
        const xTranslate = useSpring(
          useSpring(mouseX, { stiffness: 50, damping: 20 })
        );
        const yTranslate = useSpring(
          useSpring(mouseY, { stiffness: 50, damping: 20 })
        );

        return (
          <motion.div
            key={idx}
            style={{
              x: useSpring(springX, { stiffness: 45, damping: 22 }).get() * q.weightX,
              y: useSpring(springY, { stiffness: 45, damping: 22 }).get() * q.weightY,
            }}
            whileHover={{ scale: 1.02 }}
            className="border border-border-dim rounded-lg bg-card-bg p-6 flex flex-col justify-between min-h-[140px] hover:border-text-muted/40 transition-colors duration-300"
          >
            <div className="flex items-center justify-between border-b border-border-dim/40 pb-2">
              <span className="font-mono text-[8px] uppercase tracking-wider text-text-muted flex items-center space-x-1">
                <HelpCircle className="h-3 w-3 text-sci-blue" />
                <span>INQUIRY VECTOR // {idx + 1}</span>
              </span>
              <span className="font-mono text-[7px] border border-border-dim px-1.5 py-0.2 rounded text-text-muted">
                DYNAMICAL
              </span>
            </div>

            <p className="font-serif text-base font-semibold leading-snug text-foreground/90 mt-4">
              &ldquo;{q.text}&rdquo;
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
