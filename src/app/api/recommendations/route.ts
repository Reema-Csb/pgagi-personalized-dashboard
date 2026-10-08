import { NextResponse } from "next/server";

const fallbackRecommendations = [
  {
    id: "movie-fallback-1",
    title: "Featured Movie Recommendation",
    description: "Discover popular movies and entertainment recommendations.",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
    category: "entertainment",
    source: "recommendation",
    sourceName: "TMDB",
    publishedAt: "Today",
  },
  {
    id: "movie-fallback-2",
    title: "Streaming Stories Worth Watching",
    description:
      "Explore movies and stories that are getting attention from audiences.",
    image:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1200&q=80",
    category: "entertainment",
    source: "recommendation",
    sourceName: "TMDB",
    publishedAt: "Today",
  },
];

export async function GET() {
  const token = process.env.TMDB_ACCESS_TOKEN;

  if (!token) {
    return NextResponse.json({
      items: fallbackRecommendations,
      source: "fallback",
    });
  }

  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/movie/week",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
        next: {
          revalidate: 600,
        },
      },
    );

    if (!response.ok) {
      throw new Error("TMDB request failed");
    }

    const data = await response.json();

    const items = (data.results || [])
      .slice(0, 10)
      .map(
        (movie: {
          id: number;
          title?: string;
          overview?: string;
          poster_path?: string;
          release_date?: string;
        }) => ({
          id: `tmdb-${movie.id}`,
          title: movie.title || "Untitled movie",
          description: movie.overview || "No description available.",
          image: movie.poster_path
            ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
            : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
          category: "entertainment",
          source: "recommendation",
          sourceName: "TMDB",
          publishedAt: movie.release_date || "Recently",
        }),
      );

    return NextResponse.json({
      items,
      source: "tmdb",
    });
  } catch (error) {
    console.error("TMDB error:", error);

    return NextResponse.json({
      items: fallbackRecommendations,
      source: "fallback",
      error: "TMDB unavailable",
    });
  }
}
