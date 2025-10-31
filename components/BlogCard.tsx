import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { Post } from "@/lib/types";

export default function BlogCard({ post }: { post: Post }) {
  const readTime = Math.ceil(post.body.split(" ").length / 200);
  
  return (
    <Link href={`/blog/${post.id}`}>
      <div className="group overflow-hidden transition-all rounded-xl hover:shadow-md cursor-pointer">
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 rounded-xl transition-transform duration-300"
          />
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-gray-700">
            {post.title}
          </h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {post.body.substring(0, 100)}...
          </p>

          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={post.avatar || "/placeholder.svg"}
                alt={post.name}
              />
              <AvatarFallback>{post.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span>{post.name}</span>
              <span>•</span>
              <span>{readTime} min read</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}