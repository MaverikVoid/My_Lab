import type { Metadata } from "next";
import { Newsreader, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ConceptLinkOverlay from "@/components/ConceptLinkOverlay";

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meet Dabgar | Digital Research Laboratory",
  description: "The digital research laboratory of Meet Dabgar. Exploring the convergence of Scientific Machine Learning, Optimization, Neural Operators, and Dynamical Systems.",
  keywords: ["Scientific Machine Learning", "Optimization", "Neural Operators", "Dynamical Systems", "Meet Dabgar", "AI Research", "Scientific Computing"],
  authors: [{ name: "Meet Dabgar" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300 selection:bg-sci-blue selection:text-white">
        {children}
        <ConceptLinkOverlay />
        <CustomCursor />
      </body>
    </html>
  );
}
