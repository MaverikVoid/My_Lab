import HomeClient from "@/components/HomeClient";
import { getAllPosts } from "@/lib/mdx";

// Tell Next.js to pre-render this page statically
export const dynamic = "force-static";

export default function Home() {
  const research = getAllPosts("research");
  const projects = getAllPosts("projects");
  const experience = getAllPosts("experience");
  const achievements = getAllPosts("achievements");

  return (
    <HomeClient
      research={research}
      projects={projects}
      experience={experience}
      achievements={achievements}
    />
  );
}
