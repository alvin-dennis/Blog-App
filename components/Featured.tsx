import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { Post } from "@/lib/types";

export default function FeaturedPost({ post }: { post: Post }) {
  const tag = post.tags?.split(",")[0] || "Featured";

  return (
    <Link href={`/blog/${post.id}`}>
      <div className="relative overflow-hidden rounded-2xl group cursor-pointer h-80">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <Badge className="w-fit mb-4 bg-gray-800/80 hover:bg-gray-800/90 text-white border-0">
            {tag}
          </Badge>
          <h2 className="text-3xl font-bold leading-tight mb-2">
            {post.title}
          </h2>
        </div>
      </div>
    </Link>
  );
}
