import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import type { Post } from "@/lib/types";

export default function PostsList({ posts }: { posts: Post[] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Other featured posts</h3>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id}>
            <Link href={`/blog/${post.id}`}>
              <div className="flex gap-3 group cursor-pointer">
                <div className="relative h-20 w-20 shrink-0 rounded-md overflow-hidden bg-gray-100">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-gray-700">
                    {post.title}
                  </h4>
                </div>
              </div>
            </Link>
              <Separator className="border-gray-200 mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
