import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPosts } from "@/lib/api";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.id,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  const allPosts = await getPosts();
  const post = allPosts.find((p) => p.id === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 3);
  const readTime = Math.ceil(post.body.split(" ").length / 200);
  const tags = post.tags?.split(",") || [];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="relative h-96 bg-gray-100">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <article className="px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <Badge className="mb-4 bg-gray-800 text-white hover:bg-gray-700 border-0">
            {tags[0] || "Article"}
          </Badge>

          <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
          <div className="mb-8 pb-8 border-b border-gray-200 flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src={post.avatar || "/placeholder.svg"}
                alt={post.name}
              />
              <AvatarFallback>{post.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.name}</p>
              <p className="text-sm text-gray-600">{readTime} min read</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg text-gray-700 leading-relaxed">{post.body}</p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              This article explores the key concepts and practical applications
              of {post.title.toLowerCase()}. Whether you're a designer,
              developer, or product manager, these insights will help you
              navigate the evolving landscape of digital design and SaaS
              solutions.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              Stay tuned for more in-depth articles on UI/UX design, SaaS
              strategies, and digital transformation.
            </p>
          </div>

          <div className="py-8 border-t border-b border-gray-200 my-12">
            <h3 className="text-xl font-bold mb-4">
              Ready to transform your digital experience?
            </h3>
            <p className="text-gray-600 mb-6">
              Explore our platform and see how we can help you build better
              products.
            </p>
            <Button className="bg-black hover:bg-gray-900 text-white">
              Get Started
            </Button>
          </div>
        </div>
      </article>

      <section className="px-6 py-12 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                <div className="group overflow-hidden rounded-lg bg-white border border-gray-200 hover:border-gray-300 transition-all hover:shadow-md cursor-pointer h-full">
                  <div className="relative h-40 overflow-hidden bg-gray-100">
                    <Image
                      src={relatedPost.image || "/placeholder.svg"}
                      alt={relatedPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold mb-2 line-clamp-2 group-hover:text-gray-700">
                      {relatedPost.title}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {Math.ceil(relatedPost.body.split(" ").length / 200)} min
                      read
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
