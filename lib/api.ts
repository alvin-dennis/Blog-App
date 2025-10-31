import type { Post } from "@/lib/types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getPosts(): Promise<Post[]> {
  "use cache";

  if (!apiUrl) {
    throw new Error(
      "NEXT_PUBLIC_URL environment variable is not set. Please configure your API endpoint in the Vars section."
    );
  }

  try {
    const res = await fetch(apiUrl, {
      next: { revalidate: 21600 },
    });

    if (!res.ok) {
      console.error("[v0] API response not ok:", res.status, res.statusText);
      throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}
