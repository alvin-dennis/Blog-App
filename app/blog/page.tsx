import Navbar from "@/components/Navbar";
import BlogCard from "@/components/BlogCard";
import { getPosts } from "@/lib/api";

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <h1 className="text-4xl font-bold mb-2">All Blog Posts</h1>
          <p className="text-gray-600">
            Explore our latest articles on SaaS, UI/UX design, and digital
            innovation.
          </p>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
