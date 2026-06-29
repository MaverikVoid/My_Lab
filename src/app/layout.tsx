import type { Metadata } from "next";
import { Newsreader, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ConceptLinkOverlay from "@/components/ConceptLinkOverlay";
import CommandPalette from "@/components/CommandPalette";
import { getAllPosts } from "@/lib/mdx";

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
  metadataBase: new URL('https://meetdabgar.com'),
  title: "Meet Dabgar | Research Engineer",
  description: "Research Engineer specializing in Scientific Machine Learning, Adaptive Optimization, Physics-Informed AI, Neural Operators, and Agentic AI. Research Intern at Brown University.",
  keywords: ["Scientific Machine Learning", "Physics-Informed Machine Learning", "Optimization", "PINNs", "Neural Operators", "Agentic AI", "AI Research", "Brown University", "Meet Dabgar"],
  authors: [{ name: "Meet Dabgar" }],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Meet Dabgar | Research Engineer",
    description: "Research Engineer specializing in Scientific Machine Learning, Adaptive Optimization, Physics-Informed AI, Neural Operators, and Agentic AI. Research Intern at Brown University.",
    url: "https://meetdabgar.com",
    siteName: "Meet Dabgar Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Meet Dabgar | Research Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet Dabgar | Research Engineer",
    description: "Research Engineer specializing in Scientific Machine Learning, Adaptive Optimization, Physics-Informed AI, Neural Operators, and Agentic AI. Research Intern at Brown University.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Build dynamic search index at build time
  const categories = ["research", "projects", "experience", "achievements"];
  const searchIndex: any[] = [
    {
      id: "about-me",
      type: "about",
      title: "Meet Dabgar - About / Biography",
      subtitle: "Research Engineer in Scientific ML, Optimization, and Agentic AI",
      keywords: "biography resume about nit surat brown university khemraj shukla meet dabgar profile background",
      url: "/#about"
    }
  ];

  categories.forEach(cat => {
    const posts = getAllPosts(cat);
    posts.forEach(post => {
      const url = `/#${cat}`;
      searchIndex.push({
        id: `${cat}-${post.slug}`,
        type: cat,
        title: post.title || post.question || "",
        subtitle: post.subtitle || post.summary || post.abstract || "",
        keywords: `${post.title || ""} ${post.subtitle || ""} ${post.summary || ""} ${post.abstract || ""} ${post.tags?.join(" ") || ""} ${cat}`,
        url
      });
    });
  });

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
        <CommandPalette searchIndex={searchIndex} />
      </body>
    </html>
  );
}
