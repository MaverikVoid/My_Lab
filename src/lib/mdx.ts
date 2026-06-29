import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_PATH = path.join(process.cwd(), "content");

export interface PostData {
  slug: string;
  category: string;
  content: string;
  title?: string;
  subtitle?: string;
  date?: string;
  tags?: string[];
  [key: string]: any;
}

/**
 * Fetch a single MDX post by category and slug.
 */
export function getPostBySlug(category: string, slug: string): PostData | null {
  try {
    const fullPath = path.join(CONTENT_PATH, category, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) return null;
    
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      category,
      content,
      ...data,
    };
  } catch (e) {
    console.error(`Error loading MDX post in ${category}/${slug}:`, e);
    return null;
  }
}

/**
 * Fetch all posts in a specific category, sorted by date (newest first).
 */
export function getAllPosts(category: string): PostData[] {
  try {
    const dirPath = path.join(CONTENT_PATH, category);
    if (!fs.existsSync(dirPath)) return [];
    
    const files = fs.readdirSync(dirPath).filter(file => file.endsWith(".mdx"));
    
    const posts = files
      .map(file => {
        const slug = file.replace(/\.mdx$/, "");
        return getPostBySlug(category, slug);
      })
      .filter((post): post is PostData => post !== null);
    
    // Sort posts by date descending
    return posts.sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });
  } catch (e) {
    console.error(`Error listing posts in category ${category}:`, e);
    return [];
  }
}

/**
 * Aggregate all unique tags across all content posts.
 */
export function getAllTags(): string[] {
  const categories = ["research", "projects", "experience", "achievements"];
  const tagsSet = new Set<string>();
  
  categories.forEach(cat => {
    const posts = getAllPosts(cat);
    posts.forEach(post => {
      if (Array.isArray(post.tags)) {
        post.tags.forEach((tag: string) => tagsSet.add(tag));
      }
    });
  });
  
  return Array.from(tagsSet);
}

/**
 * Get all posts containing a specific tag, sorted by date.
 */
export function getPostsByTag(tag: string): PostData[] {
  const categories = ["research", "projects", "experience", "achievements"];
  let results: PostData[] = [];
  
  categories.forEach(cat => {
    const posts = getAllPosts(cat);
    const filtered = posts.filter(post => {
      if (Array.isArray(post.tags)) {
        return post.tags.map((t: string) => t.toLowerCase()).includes(tag.toLowerCase());
      }
      return false;
    });
    results = [...results, ...filtered];
  });
  
  return results.sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });
}
