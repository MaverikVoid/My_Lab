import Link from "next/link";
import { ArrowLeft, Calendar, Tag, BookOpen } from "lucide-react";
import { getPostsByTag } from "@/lib/mdx";
import Navbar from "@/components/Navbar";
import MathematicalBackground from "@/components/MathematicalBackground";

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  return (
    <>
      <MathematicalBackground />
      <Navbar />

      <main className="mx-auto max-w-4xl px-6 md:px-8 py-16 sm:py-24 space-y-12 flex-1">
        
        {/* Back Link */}
        <div className="flex items-center">
          <Link
            href="/"
            data-cursor="button"
            className="flex items-center space-x-2 font-mono text-[10px] uppercase tracking-wider text-text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Laboratory Index</span>
          </Link>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 font-mono text-[9px] uppercase tracking-widest text-text-muted">
            <Tag className="h-3.5 w-3.5 text-sci-blue" />
            <span>Tag Index</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-foreground">
            Topic: <span className="text-sci-blue italic font-normal">{decodedTag}</span>
          </h1>
          <div className="h-[1px] bg-border-dim w-full" />
          <p className="font-mono text-[10px] text-text-muted">
            Found {posts.length} entries matching this keyword across laboratory nodes.
          </p>
        </div>

        {/* List of matching posts */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <p className="font-serif text-sm text-text-muted">No posts found with this tag.</p>
          ) : (
            posts.map((post) => (
              <Link
                key={post.slug}
                href={`/${post.category}/${post.slug}`}
                data-cursor="explore"
                className="group block border border-border-dim/50 rounded-lg p-6 bg-card-bg hover:border-text-muted/40 hover:shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-text-muted">
                    <span className="text-sci-blue font-semibold bg-sci-blue/5 border border-sci-blue/15 px-2 py-0.5 rounded">
                      {post.category}
                    </span>
                    {post.date && (
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{post.date}</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-xl font-bold leading-tight text-foreground group-hover:text-sci-blue transition-colors">
                    {post.title || post.week}
                  </h3>

                  {post.subtitle && (
                    <p className="font-serif text-xs italic text-text-muted">
                      {post.subtitle}
                    </p>
                  )}

                  {post.summary || post.experiment ? (
                    <p className="text-xs leading-relaxed text-foreground/80 line-clamp-3">
                      {post.summary || post.experiment}
                    </p>
                  ) : null}

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {post.tags.map((t: string) => (
                        <span
                          key={t}
                          className="inline-flex items-center space-x-1 font-mono text-[8px] uppercase tracking-wider text-text-muted bg-badge-bg/40 px-2 py-0.5 rounded border border-border-dim/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))
          )}
        </div>

      </main>
    </>
  );
}
