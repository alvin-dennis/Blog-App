import Link from "next/link";
import { getPosts } from "@/lib/api";
import Navbar from "@/components/Navbar";
import FeaturedPost from "@/components/Featured";
import BlogCard from "@/components/BlogCard";
import PostsList from "@/components/PostsList";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const posts = await getPosts();
  const featuredPost = posts[0];
  const recentPosts = posts.slice(0, 3);
  const otherPosts = posts.slice(1, 6);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <FeaturedPost post={featuredPost} />
            </div>
            <div className="lg:col-span-1">
              <PostsList posts={otherPosts} />
            </div>
          </div>
        </div>
      </section>
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold">Recent Posts</h2>
            <Link href="/blog">
              <Button variant="outline" className="text-sm font-medium">
                All Posts
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
