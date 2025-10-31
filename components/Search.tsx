"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import type { Post } from "@/lib/types";
import { Search, X } from "lucide-react";

interface SearchPostsProps {
  posts: Post[];
}

export default function SearchBar({ posts }: SearchPostsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.body.toLowerCase().includes(query) ||
        post.tags.toLowerCase().includes(query) ||
        post.name.toLowerCase().includes(query)
    );
  }, [searchQuery, posts]);

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("");
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {isOpen && searchQuery && (
        <div className="absolute top-full left-0 right-0 mt-2  border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {filteredPosts.length > 0 ? (
            <div className="divide-y">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  onClick={() => {
                    setSearchQuery("");
                    setIsOpen(false);
                  }}
                  className="px-4 py-3 hover:bg-gray-50 transition-colors flex gap-3"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-12 h-12 rounded object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-sm text-gray-900 truncate">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">
                      {post.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-gray-500">No posts found</p>
            </div>
          )}
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
