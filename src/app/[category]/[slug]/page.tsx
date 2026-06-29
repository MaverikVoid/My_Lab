import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import { mdxComponents } from "@/components/mdx";
import ReadingProgress from "@/components/mdx/ReadingProgress";
import Navbar from "@/components/Navbar";
import MathematicalBackground from "@/components/MathematicalBackground";

// Import KaTeX styles for equations rendering
import "katex/dist/katex.min.css";

interface HeadingItem {
  level: number;
  text: string;
  id: string;
}

// Extract headings from markdown content for TOC
function getHeadings(content: string): HeadingItem[] {
  const lines = content.split("\n");
  const headingLines = lines.filter(line => line.startsWith("##") || line.startsWith("###"));
  
  return headingLines.map(line => {
    const level = line.match(/^#+/)?.[0].length || 2;
    const text = line.replace(/^#+\s+/, "").trim();
    // Generate URL-friendly ID
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    return { level, text, id };
  });
}

// Calculate estimated reading time
function calculateReadingTime(content: string): string {
  const wordsPerMinute = 225;
  const cleanContent = content.replace(/<\/?[^>]+(>|$)/g, ""); // strip HTML
  const wordCount = cleanContent.split(/\s+/).filter(Boolean).length;
  const time = Math.ceil(wordCount / wordsPerMinute);
  return `${time} min read`;
}

// Get related articles sharing tags
function getRelatedPosts(currentPost: any, limit = 3) {
  const currentTags = currentPost.tags || [];
  if (currentTags.length === 0) return [];
  
  const allPosts = getAllPosts(currentPost.category);
  return allPosts
    .filter(post => post.slug !== currentPost.slug)
    .map(post => {
      const matchCount = (post.tags || []).filter((tag: string) => currentTags.includes(tag)).length;
      return { post, matchCount };
    })
    .filter(item => item.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount || new Date(b.post.date || 0).getTime() - new Date(a.post.date || 0).getTime())
    .map(item => item.post)
    .slice(0, limit);
}

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const categories = ["research", "projects", "experience", "achievements"];
  const params: { category: string; slug: string }[] = [];
  
  categories.forEach(category => {
    const posts = getAllPosts(category);
    posts.forEach(post => {
      params.push({
        category,
        slug: post.slug,
      });
    });
  });
  
  return params;
}

export default async function MDXPostPage({ params }: PageProps) {
  const { category, slug } = await params;
  const post = getPostBySlug(category, slug);
  
  if (!post) {
    return notFound();
  }
  
  const headings = getHeadings(post.content);
  const readingTime = calculateReadingTime(post.content);
  
  // Previous / Next Navigation based on category sorting
  const posts = getAllPosts(category);
  const currentIndex = posts.findIndex(p => p.slug === slug);
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const prevPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  
  const relatedPosts = getRelatedPosts(post);
  
  return (
    <>
      <MathematicalBackground />
      <ReadingProgress />
      <Navbar />
      
      <main className="mx-auto max-w-6xl px-6 md:px-8 py-16 sm:py-24 space-y-16 flex-1">
        
        {/* Back Link */}
        <div className="flex items-center">
          <Link
            href={`/#${category}`}
            data-cursor="button"
            className="flex items-center space-x-2 font-mono text-[10px] uppercase tracking-wider text-text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Laboratory Index</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
          
          {/* Main Article Content Column */}
          <div className="lg:col-span-3 space-y-12">
            
            {/* Header Details */}
            <div className="space-y-4 border-b border-border-dim pb-6">
              <div className="flex flex-wrap items-center gap-3 font-mono text-[9px] uppercase tracking-wider text-text-muted">
                <span className="bg-sci-blue/10 border border-sci-blue/20 px-2.5 py-0.5 rounded text-sci-blue font-semibold">
                  {post.category}
                </span>
                {post.date && (
                  <>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{post.date}</span>
                    </span>
                  </>
                )}
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{post.readTime || readingTime}</span>
                </span>
              </div>
              
              <h1 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-foreground">
                {post.title || post.week}
              </h1>
              
              {post.subtitle && (
                <p className="font-serif text-lg italic text-text-muted">
                  {post.subtitle}
                </p>
              )}
              
              {/* Render Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {post.tags.map((tag: string) => (
                    <Link
                      key={tag}
                      href={`/tag/${tag.toLowerCase()}`}
                      data-cursor="button"
                      className="inline-flex items-center space-x-1 font-mono text-[8px] uppercase tracking-wider text-text-muted bg-badge-bg/40 px-2 py-0.5 rounded border border-border-dim/40 hover:border-sci-blue hover:text-sci-blue transition-all"
                    >
                      <Tag className="h-2 w-2" />
                      <span>{tag}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* MDX Compiled Body */}
            <article className="prose dark:prose-invert max-w-none journal-body text-sm md:text-base leading-relaxed text-foreground/90 space-y-6">
              <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkMath],
                    rehypePlugins: [
                      rehypeKatex,
                      [rehypePrettyCode, { theme: "github-dark" }]
                    ]
                  }
                }}
              />
            </article>
            
            {/* Pagination Footer Links */}
            <div className="border-t border-border-dim pt-8 flex flex-col sm:flex-row justify-between items-stretch gap-4 font-mono text-[9px] uppercase tracking-wider text-text-muted">
              {prevPost ? (
                <Link
                  href={`/${category}/${prevPost.slug}`}
                  data-cursor="button"
                  className="flex items-center space-x-2 border border-border-dim/40 hover:border-sci-blue p-4 rounded-lg hover:text-sci-blue transition-colors sm:max-w-[48%] group"
                >
                  <ChevronLeft className="h-4 w-4 shrink-0 group-hover:-translate-x-0.5 transition-transform" />
                  <div className="text-left">
                    <span className="block text-[8px] opacity-60">Older Entry</span>
                    <span className="block font-serif text-xs font-semibold text-foreground group-hover:text-sci-blue truncate mt-0.5">
                      {prevPost.title || prevPost.week}
                    </span>
                  </div>
                </Link>
              ) : (
                <div className="hidden sm:block" />
              )}
              
              {nextPost ? (
                <Link
                  href={`/${category}/${nextPost.slug}`}
                  data-cursor="button"
                  className="flex items-center justify-between space-x-2 border border-border-dim/40 hover:border-sci-blue p-4 rounded-lg hover:text-sci-blue transition-colors sm:max-w-[48%] group text-right ml-auto"
                >
                  <div className="text-right">
                    <span className="block text-[8px] opacity-60">Newer Entry</span>
                    <span className="block font-serif text-xs font-semibold text-foreground group-hover:text-sci-blue truncate mt-0.5">
                      {nextPost.title || nextPost.week}
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ) : (
                <div className="hidden sm:block" />
              )}
            </div>
            
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="border-t border-border-dim pt-10 space-y-6">
                <span className="font-mono text-[8px] uppercase tracking-widest text-text-muted block">
                  RELATED INVESTIGATIONS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedPosts.map((rel: any) => (
                    <Link
                      key={rel.slug}
                      href={`/${rel.category}/${rel.slug}`}
                      data-cursor="explore"
                      className="border border-border-dim/50 rounded-lg p-4 bg-badge-bg/10 hover:border-text-muted/40 transition-colors flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-1">
                        <span className="font-mono text-[8px] uppercase text-sci-blue block font-semibold">{rel.category}</span>
                        <h4 className="font-serif text-xs font-semibold text-foreground line-clamp-2">{rel.title || rel.week}</h4>
                      </div>
                      <span className="font-mono text-[8px] uppercase text-text-muted group-hover:underline">&rarr; Read Note</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
          </div>
          
          {/* Sidebar Navigation (TOC / Metadata) */}
          <div className="hidden lg:block lg:sticky lg:top-24 space-y-8 font-mono text-[10px]">
            
            {/* Table of Contents */}
            {headings.length > 0 && (
              <div className="border border-border-dim/60 rounded-lg p-4 space-y-3 bg-card-bg">
                <span className="font-bold uppercase tracking-wider text-foreground flex items-center space-x-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-sci-blue" />
                  <span>Outlines</span>
                </span>
                <div className="h-[1px] bg-border-dim/40 w-full" />
                <ul className="space-y-2.5">
                  {headings.map((h, i) => (
                    <li key={i} style={{ paddingLeft: `${(h.level - 2) * 8}px` }}>
                      <a
                        href={`#${h.id}`}
                        className="text-text-muted hover:text-sci-blue transition-colors leading-relaxed block hover:underline"
                      >
                        {h.level === 3 ? "└ " : ""}{h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Metadata metrics */}
            <div className="border border-border-dim/60 rounded-lg p-4 space-y-3 bg-card-bg text-text-muted">
              <span className="font-bold uppercase tracking-wider text-foreground">METRICS</span>
              <div className="h-[1px] bg-border-dim/40 w-full" />
              <div className="space-y-1.5">
                <div>
                  <span className="block opacity-60 text-[8px]">CATEGORY</span>
                  <span className="block uppercase text-foreground">{category}</span>
                </div>
                <div>
                  <span className="block opacity-60 text-[8px]">LENGTH</span>
                  <span className="block text-foreground">{readingTime}</span>
                </div>
                {post.status && (
                  <div>
                    <span className="block opacity-60 text-[8px]">STATUS</span>
                    <span className="block text-foreground">{post.status}</span>
                  </div>
                )}
                {post.github && (
                  <div>
                    <span className="block opacity-60 text-[8px]">REPOSITORY</span>
                    <a
                      href={post.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sci-blue hover:underline truncate"
                    >
                      {post.github.replace("https://github.com/", "")}
                    </a>
                  </div>
                )}
              </div>
            </div>
            
          </div>
          
        </div>
        
      </main>
    </>
  );
}
