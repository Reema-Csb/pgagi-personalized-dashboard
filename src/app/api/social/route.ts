import { NextResponse } from "next/server";

const socialPosts = [
  {
    id: "social-1",
    title: "AI is changing how people work",
    description:
      "Creators and developers are experimenting with new AI-powered workflows.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    category: "technology",
    source: "social",
    sourceName: "Social Feed",
    publishedAt: "30 minutes ago",
    author: "@techcommunity",
  },
  {
    id: "social-2",
    title: "The latest training techniques",
    description:
      "Athletes are using technology and analytics to improve performance.",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80",
    category: "sports",
    source: "social",
    sourceName: "Social Feed",
    publishedAt: "1 hour ago",
    author: "@sportsdaily",
  },
  {
    id: "social-3",
    title: "Digital finance continues to grow",
    description:
      "Fintech products are changing how consumers save, invest and make payments.",
    image:
      "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=1200&q=80",
    category: "finance",
    source: "social",
    sourceName: "Social Feed",
    publishedAt: "2 hours ago",
    author: "@financenetwork",
  },
  {
    id: "social-4",
    title: "What everyone is watching",
    description:
      "Entertainment communities are discussing the latest releases and streaming trends.",
    image:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1200&q=80",
    category: "entertainment",
    source: "social",
    sourceName: "Social Feed",
    publishedAt: "3 hours ago",
    author: "@culturefeed",
  },
];

export async function GET() {
  return NextResponse.json({
    items: socialPosts,
    source: "mock-social-api",
  });
}
