import type { Post } from "@/lib/types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getPosts(): Promise<Post[]> {
  if (!apiUrl) {
    throw new Error(
      "NEXT_PUBLIC_URL environment variable is not set. Please configure your API endpoint in the env file."
    );
  }
  try {
    const res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
